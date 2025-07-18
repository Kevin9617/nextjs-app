import pool from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing property ID' }), { status: 400 });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    // Ensure id is a number for the query
    const numericId = Number(id);
    console.log(numericId);
    console.log(numericId);
    if (isNaN(numericId)) {
      return new Response(JSON.stringify({ error: 'Invalid property ID' }), { status: 400 });
    }
    const rows = await conn.query('SELECT * FROM houseproperty WHERE id = ?', [numericId]);
    console.log(rows);
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
    }
    const property = rows[0];

    // Fetch floor plans for this property
    const floorPlansRows = await conn.query('SELECT * FROM floorPlans WHERE house_id = ?', [numericId]);
    property.floorPlans = floorPlansRows;

    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    console.log(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    if (conn) conn.release();
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing property ID' }), { status: 400 });
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return new Response(JSON.stringify({ error: 'Invalid property ID' }), { status: 400 });
    }
    const body = await request.json();
    const {
      propertyTitle, propertyDescription, type, status, price, area, rooms,
      address, state, city, neighborhood, zip, country,
      propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
      bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
      media_image1, media_image2, media_image3, media_image4, media_image5,
      attachment1, attachment2,
      floorPlans,
      email // optional
    } = body;
    // Update property
    await conn.query(
      `UPDATE houseProperty SET
        propertyTitle=?, propertyDescription=?, type=?, status=?, price=?, area=?, rooms=?,
        address=?, state=?, city=?, neighborhood=?, zip=?, country=?,
        propertyId=?, areaSize=?, sizePrefix=?, landArea=?, landAreaSizePostfix=?,
        bedrooms=?, bathrooms=?, garages=?, garagesSize=?, yearBuilt=?, videoUrl=?, virtualTour=?,
        media_image1=?, media_image2=?, media_image3=?, media_image4=?, media_image5=?,
        attachment1=?, attachment2=?
      WHERE id=?`,
      [
        propertyTitle, propertyDescription, type, status, price, area, rooms,
        address, state, city, neighborhood, zip, country,
        propertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
        bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
        media_image1, media_image2, media_image3, media_image4, media_image5,
        attachment1, attachment2,
        numericId
      ]
    );
    // Update floor plans: delete old, insert new
    await conn.query('DELETE FROM floorPlans WHERE house_id = ?', [numericId]);
    if (Array.isArray(floorPlans)) {
      for (const plan of floorPlans) {
        await conn.query(
          `INSERT INTO floorPlans (
            house_id, planTitle, planBedrooms, planBathrooms, planPrice, pricePostfix, planSize, planImage, planDescription
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            numericId,
            plan.planTitle || null,
            plan.planBedrooms || null,
            plan.planBathrooms || null,
            plan.planPrice || null,
            plan.pricePostfix || null,
            plan.planSize || null,
            plan.planImage || null,
            plan.planDescription || null
          ]
        );
      }
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error updating property:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    if (conn) conn.release();
  }
} 