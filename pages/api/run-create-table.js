import populateProducts from './populate-products.js'
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    populateProducts().then(result => {
      setProducts(result);
    });
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.quantity}</p>
          <p>{product.unit}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
