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
    const rows = await pool.query('SELECT * FROM social_media WHERE user_id = ? LIMIT 1', [payload.id]);
    if (!rows || rows.length === 0) {
      return Response.json({}); // No social media yet
    }
    return Response.json(rows[0]);
  } catch (err) {
    console.error('Social media GET error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

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
    const user_id = payload.id;
    const {
      skype, website, facebook, twitter, linkedin, instagram, google_plus, youtube, pinterest, vimeo
    } = await req.json();
    // Upsert logic: try update, if not found then insert
    const result = await pool.query('UPDATE social_media SET skype=?, website=?, facebook=?, twitter=?, linkedin=?, instagram=?, google_plus=?, youtube=?, pinterest=?, vimeo=? WHERE user_id=?', [
      skype || null, website || null, facebook || null, twitter || null, linkedin || null, instagram || null, google_plus || null, youtube || null, pinterest || null, vimeo || null, user_id
    ]);
    if (result.affectedRows === 0) {
      // Insert if not exists
      await pool.query('INSERT INTO social_media (user_id, skype, website, facebook, twitter, linkedin, instagram, google_plus, youtube, pinterest, vimeo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        user_id, skype || null, website || null, facebook || null, twitter || null, linkedin || null, instagram || null, google_plus || null, youtube || null, pinterest || null, vimeo || null
      ]);
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error('Social media POST error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
} 