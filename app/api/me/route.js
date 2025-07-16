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
    const rows = await pool.query('SELECT id, username, email, role FROM users WHERE id = ? LIMIT 1', [payload.id]);
    if (!rows || rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    const user = rows[0];
    return Response.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
