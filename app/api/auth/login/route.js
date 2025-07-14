import pool from '../../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Use env variable in production

export async function POST(req) {
  const { username, email, password } = await req.json();
  console.log('Login API called with:', { username, email, password });
  if ((!username && !email) || !password) {
    console.log('Missing fields:', { username, email, password });
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }
  try {
    const rows = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username || '', email || '']);
    if (rows.length === 0) {
      console.log('User not found:', { username, email });
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 400 });
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Invalid password for:', { username, email });
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 400 });
    }
    console.log(user.username);
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for:', { username, email });
    return Response.json({ token }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
} 