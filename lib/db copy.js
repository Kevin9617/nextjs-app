import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'moss',
  password: process.env.DB_PASSWORD || 'abcABC123!@#',
  database: process.env.DB_NAME || 'listings_meetpine',
  connectionLimit: 5,
});

export default pool;