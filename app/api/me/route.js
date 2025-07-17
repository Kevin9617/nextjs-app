import pool from '../../../lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Use env variable in production

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }
    const rows = await pool.query('SELECT id, username, email, role, first_name, last_name, position, license, tax_number, phone, fax_number, mobile, language, company_name, address, about_me, profile_image FROM users WHERE id = ? LIMIT 1', [payload.id]);
    if (!rows || rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    const user = rows[0];
    return Response.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.position,
      license: user.license,
      tax_number: user.tax_number,
      phone: user.phone,
      fax_number: user.fax_number,
      mobile: user.mobile,
      language: user.language,
      company_name: user.company_name,
      address: user.address,
      about_me: user.about_me,
      profile_image: user.profile_image,
    });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
