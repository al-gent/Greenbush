import { sql } from '@vercel/postgres';

export default async function addProduct(req, res) {
    const {productName, quantity, unit, unit2, price, price2} = req.body;

    if (unit2) {
        await sql`
        INSERT INTO Products2 (name, unit, price, quantity)
        VALUES (${productName}, ARRAY[${unit}, ${unit2}], ARRAY[${price}, ${price2}], ${quantity});
        `;  
    }
    else
    {
        await sql`
        INSERT INTO Products2 (name, unit, price, quantity)
        VALUES (${productName}, ARRAY[${unit}], ARRAY[${price}], ${quantity});
        `;
    }

    res.status(200).json({productAdded: true, product: productName, unit: unit, unit2: unit2, price: price, price2: price2});
}