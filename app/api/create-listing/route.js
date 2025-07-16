import mysql from 'mysql2/promise';
import pool from '../../../lib/db';

function emptyToNull(val) {
  return val === "" ? null : val;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      propertyTitle, propertyDescription, type, status, price, area, rooms,
      address, state, city, neighborhood, zip, country,
      propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
      bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
      media_image1, media_image2, media_image3, media_image4, media_image5,
      attachment1, attachment2,
      floorPlans // <-- array of floor plan objects
    } = body;

    // Insert property (no floor plan fields)
    const result = await pool.query(
      `INSERT INTO houseProperty (
        propertyTitle, propertyDescription, type, status, price, area, rooms,
        address, state, city, neighborhood, zip, country,
        propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
        bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
        media_image1, media_image2, media_image3, media_image4, media_image5, attachment1, attachment2
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        emptyToNull(propertyTitle), emptyToNull(propertyDescription), emptyToNull(type), emptyToNull(status), emptyToNull(price), emptyToNull(area), emptyToNull(rooms),
        emptyToNull(address), emptyToNull(state), emptyToNull(city), emptyToNull(neighborhood), emptyToNull(zip), emptyToNull(country),
        emptyToNull(propertyId), emptyToNull(areaSize), emptyToNull(sizePrefix), emptyToNull(landArea), emptyToNull(landAreaSizePostfix),
        emptyToNull(bedrooms), emptyToNull(bathrooms), emptyToNull(garages), emptyToNull(garagesSize), emptyToNull(yearBuilt), emptyToNull(videoUrl), emptyToNull(virtualTour),
        emptyToNull(media_image1), emptyToNull(media_image2), emptyToNull(media_image3), emptyToNull(media_image4), emptyToNull(media_image5), emptyToNull(attachment1), emptyToNull(attachment2)
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
    return new Response(JSON.stringify({ success: true, id: Number(houseId) }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: 'Database error' }), { status: 500 });
  }
} 