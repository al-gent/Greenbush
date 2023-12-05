import { sql } from '@vercel/postgres';
 
export default async function createTable(products) {
  try {
    const result = 
    await sql`CREATE TABLE new_products (id SERIAL PRIMARY KEY, name VARCHAR(255), price DECIMAL(10, 2), quantity INTEGER, cart INTEGER);`;

  // Insert the products data into the table
  for (const product of products) {
    await sql`
      INSERT INTO new_products (name, price, quantity, cart)
      VALUES ('${product.name}', ${product.price}, ${product.quantity}, ${product.cart});
    `;}
    return response.status(200).json({ result });

  } catch (error) {
    return response.status(500).json({ error });
  }
}