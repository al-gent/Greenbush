import { sql } from '@vercel/postgres';

export default async function addFarmer(req, res) {
  const { farmName, farmCode, pin, firstName, email, phone, favVeg } = req.body;
  console.log(farmName, farmCode, pin, firstName, email, phone, favVeg);
  try {
    await sql`
        INSERT INTO farmers (farmName, farmCode, pin, farmerFirstName, email, phone, favVeg)
        VALUES (${farmName}, ${farmCode}, ${pin}, ${firstName}, ${email}, ${phone}, ${favVeg});
        `;
    res.status(200).json({
      farmerAdded: true,
      props: { farmName, farmCode, pin, firstName, email, phone, favVeg },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add farmer' });
  }
}
