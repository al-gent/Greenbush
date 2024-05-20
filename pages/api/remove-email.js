import { sql } from '@vercel/postgres';

export default async function deleteEmail(req, res) {
  const { email } = req.body;
  const { client } = req.query;
  console.log(email, client);
  await sql`
  DELETE FROM buyers WHERE email = ${email} AND farmcode = ${client}
`;

  res
    .status(200)
    .json({ emailDeleted: true, email: { email }, farmcode: { client } });
}
