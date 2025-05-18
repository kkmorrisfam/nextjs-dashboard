import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false }, // Safer SSL for testing
});

export async function GET() {
  try {
    const result = await sql`SELECT 1 + 1 AS result`;
    return new Response(JSON.stringify({ success: true, result: result[0].result }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Database Connection Test Error:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Database connection failed",
      error: error.stack || error.message || error.toString(),
    }), {
      status: 500,
    });
  }
}
