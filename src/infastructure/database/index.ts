import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

pool.connect((err): void => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connect DB successfully');
});

export default pool;
