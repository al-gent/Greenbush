import { sql } from '@vercel/postgres';

export async function fetchProducts() {
    try {
      const data = await sql`SELECT * FROM products`;
  
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products data.');
    }
  }