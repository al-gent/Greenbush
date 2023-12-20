import { sql } from '@vercel/postgres';

export default async function populateProduct(req, res) {
  try {
    const name = 'poop';
    const quantity = 5.50;
    const unit = 'lbs';
    const price = 5;

    await sql`
      INSERT into products ( name, quantity, unit, price, cart)
      VALUES(${name}, ${quantity}, ${unit}, ${price}, 0)
    `;

    res.status(200).json({ message: 'Status updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}