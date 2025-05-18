// app/test-connection/route.ts
import {query} from '../app/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT 1 + 1 AS result');
    return new Response(JSON.stringify({ 
      success: true, 
      result: result.rows[0].result 
    }), {
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