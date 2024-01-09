import { sql } from '@vercel/postgres';
export default async function populateProducts(req, res) {
  try {
    const product_list = require('/home/adam/react/nextjs-blog/components/transformedData2.json');
    for (const product of product_list) {
      await sql`
          INSERT into products2 (name, quantity, unit, price)
          VALUES( ${product.Description}, 3, ${product.Unit}, ${product['Price per Unit']})
        `;
    }

    res.status(200).json({ message: 'Status updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}
