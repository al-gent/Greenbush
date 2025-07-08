import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const products = req.body;
  const results = [];
  const errors = [];

  try {
    // Start a transaction
    await sql`BEGIN`;

    for (const product of products) {
      // Get current quantity
      const result = await sql`
        SELECT quantity 
        FROM Products 
        WHERE id = ${product.id}
      `;
      
      if (!result.rows[0]) {
        errors.push({ 
          productId: product.id, 
          error: 'Product not found' 
        });
        continue;
      }

      const realTimeQuantity = parseFloat(result.rows[0].quantity);
      const cartQuantity = parseFloat(product.cart);
      const newQuantity = realTimeQuantity - cartQuantity;

      console.log(`Product ${product.id}: ${product.quantity} = ${newQuantity}`);

      // Validate sufficient quantity
      if (newQuantity < 0) {
        errors.push({ 
          productId: product.id, 
          name: product.name,
          error: 'Insufficient stock',
          available: realTimeQuantity,
          requested: cartQuantity
        });
        continue;
      }

      // Update with optimistic locking
      const updateResult = await sql`
        UPDATE Products 
        SET quantity = ${newQuantity}
        WHERE id = ${product.id} 
        AND quantity = ${realTimeQuantity}
      `;

      if (updateResult.rowCount === 0) {
        errors.push({ 
          productId: product.id, 
          error: 'Quantity changed during update' 
        });
        continue;
      }

      results.push({
        productId: product.id,
        name: product.name,
        previousQuantity: realTimeQuantity,
        ordered: cartQuantity,
        newQuantity: newQuantity
      });
    }

    // If any errors, rollback entire transaction
    if (errors.length > 0) {
      await sql`ROLLBACK`;
      return res.status(400).json({ 
        success: false, 
        errors,
        message: 'Order failed due to insufficient stock'
      });
    }

    // Commit transaction
    await sql`COMMIT`;
    
    res.status(200).json({
      success: true,
      updates: results
    });

  } catch (error) {
    await sql`ROLLBACK`;
    console.error('Update error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database error' 
    });
  }
}