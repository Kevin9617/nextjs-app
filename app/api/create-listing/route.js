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
      planTitle, planDescription, planBedrooms, planBathrooms, planPrice, planSize, planImage, pricePostfix
    } = body;

    const result = await pool.query(
      `INSERT INTO houseProperty (
        propertyTitle, propertyDescription, type, status, price, area, rooms,
        address, state, city, neighborhood, zip, country,
        propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
        bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
        media_image1, media_image2, media_image3, media_image4, media_image5, attachment1, attachment2,
        planTitle, planDescription, planBedrooms, planBathrooms, planPrice, planSize, planImage, pricePostfix
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        emptyToNull(propertyTitle), emptyToNull(propertyDescription), emptyToNull(type), emptyToNull(status), emptyToNull(price), emptyToNull(area), emptyToNull(rooms),
        emptyToNull(address), emptyToNull(state), emptyToNull(city), emptyToNull(neighborhood), emptyToNull(zip), emptyToNull(country),
        emptyToNull(propertyId), emptyToNull(areaSize), emptyToNull(sizePrefix), emptyToNull(landArea), emptyToNull(landAreaSizePostfix),
        emptyToNull(bedrooms), emptyToNull(bathrooms), emptyToNull(garages), emptyToNull(garagesSize), emptyToNull(yearBuilt), emptyToNull(videoUrl), emptyToNull(virtualTour),
        emptyToNull(media_image1), emptyToNull(media_image2), emptyToNull(media_image3), emptyToNull(media_image4), emptyToNull(media_image5), emptyToNull(attachment1), emptyToNull(attachment2),
        emptyToNull(planTitle), emptyToNull(planDescription), emptyToNull(planBedrooms), emptyToNull(planBathrooms), emptyToNull(planPrice), emptyToNull(planSize), emptyToNull(planImage), emptyToNull(pricePostfix)
      ]
    );
    return new Response(JSON.stringify({ success: true, id: Number(result.insertId) }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: 'Database error' }), { status: 500 });
  }
} 