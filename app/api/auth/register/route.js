import pool from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, email, password } = await req.json();
  console.log('Register API called with:', { username, email, password });
  if (!username || !email || !password) {
    console.log('Missing fields:', { username, email, password });
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashed]
    );
    console.log('User registered:', username, email);
    return new Response(JSON.stringify({ message: 'User registered' }), { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return new Response(JSON.stringify({ error: 'User already exists or error' }), { status: 400 });
  }
}