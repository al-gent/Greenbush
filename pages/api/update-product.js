import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const {
    product,
    productName,
    quantity,
    unit,
    unit2,
    price,
    price2,
    unitRatio,
  } = req.body;

  if (unit2) {
    await sql`
    UPDATE Products
    SET name = ${
      productName || product.name
    }, unit = ARRAY[${unit}, ${unit2}], price = ARRAY[${price}, ${price2}], quantity = ${
      quantity || product.quantity
    }, unitratio = ${unitRatio}
    WHERE id = ${product.id};
  `;
  } else {
    await sql`
    UPDATE Products
    SET name = ${productName || product.name}, unit = ARRAY[${
      unit || product.unit
    }], price = ARRAY[${price || product.price}], quantity = ${
      quantity || product.quantity
    }
    WHERE id = ${product.id};
  `;
  }
  res.status(200).json({
    productUpdated: true,
    product: product,
    unit: unit,
    unit2: unit2,
    price: price,
    price2: price2,
    unitRatio: unitRatio,
  });
}
