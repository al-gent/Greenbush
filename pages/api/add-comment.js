import { sql } from '@vercel/postgres';

export default async function createNote(req, res) {
  const { comment, name, email } = req.body;

  await sql`
    INSERT INTO new_comments (text, name, email)
    VALUES (${comment}, ${name}, ${email});
  `;

  res.status(200).json({ noteAdded: true, comment: comment });
}
