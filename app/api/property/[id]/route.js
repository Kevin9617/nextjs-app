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
    if (isNaN(numericId)) {
      return new Response(JSON.stringify({ error: 'Invalid property ID' }), { status: 400 });
    }
    const rows = await conn.query('SELECT * FROM houseproperty WHERE id = ?', [numericId]);
    console.log(rows);
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
    }
    const property = rows[0];
    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    if (conn) conn.release();
  }
} 