import postgres from 'postgres';

// Initialize the PostgreSQL connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  // const data = await sql`SELECT 1 + 1 AS result;`;

  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  console.log("Query result:", data);
  return data;
}

// Export the GET method explicitly for Next.js API Route
export async function GET() {
  console.log("Received GET request to /query");

  try {
    const data = await listInvoices();
    console.log("Query successful:", data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error("Database Query Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}


