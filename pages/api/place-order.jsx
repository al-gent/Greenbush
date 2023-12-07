import { sql } from '@vercel/postgres';


let currentDateTime= new Date();

export default async function placeOrder(req, res) {
  const order = req.body;
  await sql`
    INSERT INTO orders (name, email, notes, date, status, items)
    VALUES (${order.name}, ${order.email}, ${order.notes}, ${currentDateTime},'pending', ${order.products});
  `;
  res.status(200).json( {message: 'Order placed!'});
}