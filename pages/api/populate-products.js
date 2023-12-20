import { sql } from '@vercel/postgres';

export default async function populateProducts(req, res) {
  try {
    const product_list = require('/home/adam/react/nextjs-blog/pages/product_list.json');
    for (const product of product_list) {
      let price = product['Price per Unit']
      if (typeof price === 'string' && price.includes('$')) {
        price = price.replace('$', '');
      }
      if (price === '') {
        price = 0;
      }
      await sql`
        INSERT into products (name, quantity, unit, price, cart)
        VALUES( ${product.Description}, 5, ${product.Unit}, ${price}, 0)
      `;
    }

    res.status(200).json({ message: 'Status updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}