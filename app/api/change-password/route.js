import pool from '../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { oldPassword, newPassword, email } = await req.json();
    if (!oldPassword || !newPassword || !email) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }
    // Fetch user by email
    const rows = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    if (!rows || rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    const user = rows[0];
    // Compare old password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return Response.json({ error: 'Old password is incorrect.' }, { status: 400 });
    }
    // Hash new password and update
    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashed, email]);
    return Response.json({ success: true });
  } catch (err) {
    console.error('Change password error:', err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
} 