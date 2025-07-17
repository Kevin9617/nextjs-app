import pool from '../../../lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Use env variable in production

export async function POST(req) {
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

    const { firstName, lastName, position, license, taxNumber, phone, faxNumber, mobile, language, companyName, address, aboutMe, profileImage } = await req.json();
    
    // Get user by ID from token
    const rows = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [payload.id]);
    if (!rows || rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user profile
    await pool.query(
      `UPDATE users SET 
        first_name = ?, 
        last_name = ?, 
        position = ?, 
        license = ?, 
        tax_number = ?, 
        phone = ?, 
        fax_number = ?, 
        mobile = ?, 
        language = ?, 
        company_name = ?, 
        address = ?, 
        about_me = ?,
        profile_image = ?
      WHERE id = ?`,
      [
        firstName || null,
        lastName || null,
        position || null,
        license || null,
        taxNumber || null,
        phone || null,
        faxNumber || null,
        mobile || null,
        language || null,
        companyName || null,
        address || null,
        aboutMe || null,
        profileImage || null,
        payload.id
      ]
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error('Update profile error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
} 