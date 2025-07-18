import pool from '../../../lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    // Homepage mode: just return 12 most recent
    if (searchParams.get('homepage') === '1') {
      const rows = await pool.query(
        'SELECT * FROM houseProperty ORDER BY created_at DESC LIMIT 12'
      );
      return new Response(JSON.stringify({ properties: rows, total: rows.length }), { status: 200 });
    }
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'recent';
    console.log(sort);

    let where = 'WHERE 1=1';
    let params = [];
    if (search) {
      where += ' AND (propertyTitle LIKE ? OR address LIKE ? OR city LIKE ? OR state LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    const order = sort === 'old' ? 'ASC' : 'DESC';
    // Get total count
    const countRow = await pool.query(`SELECT COUNT(*) as count FROM houseProperty ${where}`, params);
    const total = countRow[0]?.count ? Number(countRow[0].count) : 0;
    console.log(total);
    // Get paginated data
    const offset = (page - 1) * pageSize;
    console.log(offset, pageSize, params);
    const rows = await pool.query(
      `SELECT * FROM houseProperty ${where} ORDER BY created_at ${order} LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );
    return new Response(JSON.stringify({ properties: rows, total }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ properties: [], error: 'Database error' }), { status: 500 });
  }
} 