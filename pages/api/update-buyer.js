import { sql } from '@vercel/postgres';

export default async function updateBuyer(req, res) {
  const { buyer, email } = req.body;
  console.log(buyer, email);
  await sql`
UPDATE buyers
SET address = ${buyer.address}, attn = ${buyer.attn}, city = ${buyer.city}, compref = ${buyer.compref}, distancefromfarm = ${buyer.distancefromfarm}, farmcode = ${buyer.farmcode}, firstname = ${buyer.firstname}, lastname = ${buyer.lastname}, organization = ${buyer.organization}, phone = ${buyer.phone}, state = ${buyer.state}, zip = ${buyer.zip}
WHERE email = ${email};
  `;
  res.status(200).json({ buyerUpdated: true, buyer: buyer });
}
