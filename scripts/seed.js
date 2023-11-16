const { db } = require('@vercel/postgres');
const { products } = require('../lib/products.js');
const bcrypt = require('bcrypt');

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        name VARCHAR(255) NOT NULL,
        quantity TEXT NOT NULL ,
        unit TEXT NOT NULL,
        price TEXT NOT NULL,
        cart TEXT NOT NULL
      );
    `;

    console.log(`Created "products" table`);

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
        INSERT INTO products (name, quantity, unit, price, cart)
        VALUES (${product.name}, ${product.quantity}, ${product.unit}, ${product.price}, ${product.cart})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedProducts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
