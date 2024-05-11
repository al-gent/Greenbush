import { sql } from '@vercel/postgres';

export default async function isFarmCodeTaken(req, res) {
  const farmCode = String(req.body);
  const result = await sql`
    SELECT 1 FROM farmers
    WHERE farmcode = ${farmCode};
  `;
  if (result.rowCount > 0) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
}
