import pool from '@/lib/db';

export async function GET(request, { params }) {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing property slug' }), { status: 400 });
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM houseProperty WHERE slug = ?', [slug]);
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
    }
    const property = rows[0];
    // Fetch floor plans for this property
    const floorPlansRows = await conn.query('SELECT * FROM floorPlans WHERE house_id = ?', [property.id]);
    property.floorPlans = floorPlansRows;
    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    if (conn) conn.release();
  }
}

export async function PUT(request, { params }) {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing property slug' }), { status: 400 });
  }
  let conn;
  try {
    conn = await pool.getConnection();
    // Find property by slug to get its id
    const rows = await conn.query('SELECT * FROM houseProperty WHERE slug = ?', [slug]);
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
    }
    const property = rows[0];
    const propertyId = property.id;
    const body = await request.json();
    const {
      propertyTitle, propertyDescription, type, status, price, area, rooms,
      address, state, city, neighborhood, zip, country,
      propertyId: formPropertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
      bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
      media_image1, media_image2, media_image3, media_image4, media_image5,
      attachment1, attachment2,
      floorPlans,
      email, // optional
      slug: newSlug
    } = body;
    // Update property
    await conn.query(
      `UPDATE houseProperty SET
        propertyTitle=?, propertyDescription=?, type=?, status=?, price=?, area=?, rooms=?,
        address=?, state=?, city=?, neighborhood=?, zip=?, country=?,
        propertyId=?, areaSize=?, sizePrefix=?, landArea=?, landAreaSizePostfix=?,
        bedrooms=?, bathrooms=?, garages=?, garagesSize=?, yearBuilt=?, videoUrl=?, virtualTour=?,
        media_image1=?, media_image2=?, media_image3=?, media_image4=?, media_image5=?,
        attachment1=?, attachment2=?, slug=?
      WHERE id=?`,
      [
        propertyTitle, propertyDescription, type, status, price, area, rooms,
        address, state, city, neighborhood, zip, country,
        formPropertyId, areaSize, sizePrefix, landArea, landAreaSizePostfix,
        bedrooms, bathrooms, garages, garagesSize, yearBuilt, videoUrl, virtualTour,
        media_image1, media_image2, media_image3, media_image4, media_image5,
        attachment1, attachment2, newSlug,
        propertyId
      ]
    );
    // Update floor plans: delete old, insert new
    await conn.query('DELETE FROM floorPlans WHERE house_id = ?', [propertyId]);
    if (Array.isArray(floorPlans)) {
      for (const plan of floorPlans) {
        await conn.query(
          `INSERT INTO floorPlans (
            house_id, planTitle, planBedrooms, planBathrooms, planPrice, pricePostfix, planSize, planImage, planDescription
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            propertyId,
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
    console.error('Error updating property by slug:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    if (conn) conn.release();
  }
} 