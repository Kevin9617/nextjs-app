import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // TODO: Change this to your actual MariaDB password
  database: 'findhouse',
  connectionLimit: 5,
});

export default pool; 