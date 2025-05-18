// lib/db.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
//   ssl: {
//     rejectUnauthorized: false, // Allow SSL without strict verification (for Supabase)
//   },
//   max: 10,               // Maximum number of connections
//   idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
//   connectionTimeoutMillis: 15000, // Timeout after 15 seconds
// });
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


// Function to query the database
export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export default pool;
