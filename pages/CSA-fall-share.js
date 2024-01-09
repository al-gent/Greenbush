import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function CSAFallShare() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <Layout>
      <h1>CSA Fall Share</h1>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
        </tr>
      ))}
    </Layout>
  );
}
