import { sql } from '@vercel/postgres';

export default async function checkCredentials(req, res) {
  const farmCode = String(req.body.farmCode);
  const pin = String(req.body.pin);
  console.log(farmCode, pin);
  const result = await sql`
    SELECT 1 FROM farmers
    WHERE farmcode = ${farmCode} AND pin = ${pin};
  `;
  if (result.rowCount > 0) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
}
