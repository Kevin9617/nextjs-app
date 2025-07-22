import mysql from 'mysql2/promise';
import pool from '../../../lib/db';
import nodemailer from 'nodemailer';

function emptyToNull(val) {
  return val === "" ? null : val;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      propertyTitle, propertyDescription, status, price, area, rooms,
      address, state, city, neighborhood, zip, country,
      propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
      bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
      media_image1, media_image2, media_image3, media_image4, media_image5,
      attachment1, attachment2,
      floorPlans,
      email, // <-- user email
      slug
    } = body;

    // Insert property (now includes email and slug)
    const result = await pool.query(
      `INSERT INTO houseProperty (
        propertyTitle, propertyDescription, status, price, area, rooms,
        address, state, city, neighborhood, zip, country,
        propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
        bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
        media_image1, media_image2, media_image3, media_image4, media_image5, attachment1, attachment2, email, slug
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        emptyToNull(propertyTitle), emptyToNull(propertyDescription), emptyToNull(status), emptyToNull(price), emptyToNull(area), emptyToNull(rooms),
        emptyToNull(address), emptyToNull(state), emptyToNull(city), emptyToNull(neighborhood), emptyToNull(zip), emptyToNull(country),
        emptyToNull(propertyId), emptyToNull(areaSize), emptyToNull(sizePrefix), emptyToNull(landArea), emptyToNull(landAreaSizePostfix),
        emptyToNull(bedrooms), emptyToNull(bathrooms), emptyToNull(garages), emptyToNull(garagesSize), emptyToNull(yearBuilt), emptyToNull(videoUrl), emptyToNull(virtualTour),
        emptyToNull(media_image1), emptyToNull(media_image2), emptyToNull(media_image3), emptyToNull(media_image4), emptyToNull(media_image5), emptyToNull(attachment1), emptyToNull(attachment2), emptyToNull(email), emptyToNull(slug)
      ]
    );
    const houseId = Number(result.insertId);

    // Insert floor plans
    if (Array.isArray(floorPlans)) {
      for (const plan of floorPlans) {
        await pool.query(
          `INSERT INTO floorPlans (
            house_id, planTitle, planBedrooms, planBathrooms, planPrice, pricePostfix, planSize, planImage, planDescription
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            houseId,
            emptyToNull(plan.planTitle),
            emptyToNull(plan.planBedrooms),
            emptyToNull(plan.planBathrooms),
            emptyToNull(plan.planPrice),
            emptyToNull(plan.pricePostfix),
            emptyToNull(plan.planSize),
            emptyToNull(plan.planImage),
            emptyToNull(plan.planDescription)
          ]
        );
      }
    }

    // Send email with listing data
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Replace with your SMTP server
        port: 587,
        secure: false,
        auth: {
          user: 'your@email.com', // Replace with your SMTP user
          pass: 'yourpassword',   // Replace with your SMTP password
        },
      });
      await transporter.sendMail({
        from: 'no-reply@findhouse.com',
        to: email,
        subject: 'Your property listing was created',
        text: `Thank you for creating a property listing!\n\nTitle: ${propertyTitle}\nDescription: ${propertyDescription}\nPrice: ${price}\nLocation: ${address}, ${city}, ${state}, ${zip}`,
        html: `<h2>Thank you for creating a property listing!</h2><p><b>Title:</b> ${propertyTitle}</p><p><b>Description:</b> ${propertyDescription}</p><p><b>Price:</b> ${price}</p><p><b>Location:</b> ${address}, ${city}, ${state}, ${zip}</p>`
      });
    } catch (emailErr) {
      console.error('Failed to send email:', emailErr);
      // Do not fail the request if email fails
    }

    return new Response(JSON.stringify({ success: true, id: Number(houseId) }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: 'Database error' }), { status: 500 });
  }
} 