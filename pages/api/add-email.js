import { sql } from '@vercel/postgres';

export default async function addEmail(req, res) {
  const { email } = req.body;
  const { client } = req.query;
  console.log(email, client);
  await sql`
    INSERT INTO buyers (email, farmcode)
    VALUES (${email}, ${client});
  `;

  res
    .status(200)
    .json({ emailAdded: true, email: { email }, farmcode: { client } });
}
