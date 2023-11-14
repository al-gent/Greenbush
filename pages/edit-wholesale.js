import React, { useState } from 'react'
import Layout from '../components/layout'
import styles from '/components/layout.module.css'

const PRODUCTS = [{'id': 0, 'name': 'Rainbow Chard', 'quantity': '20', 'unit': 'lbs', 'price': '4.50', 'cart': 0} ,
{'id': 1, 'name': 'Endive, Escarole', 'quantity': '30', 'unit': 'heads', 'price': '2', 'cart': 0} ,
{'id': 2, 'name': 'Parsley', 'quantity': '10', 'unit': 'lbs', 'price': '8.50', 'cart': 0} ,
{'id': 3, 'name': 'Beets, Chioggia', 'quantity': '100', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 4, 'name': 'Beets, Golden', 'quantity': '100', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 5, 'name': 'Beets, Cylindra', 'quantity': '100', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 6, 'name': 'Beets, red round', 'quantity': '50', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 7, 'name': 'Garlic (cured)', 'quantity': '50', 'unit': 'lbs', 'price': '12', 'cart': 0} ,
{'id': 8, 'name': 'Eggplant, Rosa Bianca', 'quantity': '5', 'unit': 'ct', 'price': '3', 'cart': 0} ,
{'id': 9, 'name': 'tomatoes, heirloom slicing', 'quantity': '10', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 10, 'name': 'Tomatoes, heirloom paste', 'quantity': '60', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 11, 'name': 'ground cherries', 'quantity': '50', 'unit': 'pints', 'price': '3.25', 'cart': 0} ,
{'id': 12, 'name': 'tomatillo', 'quantity': '5', 'unit': 'lbs', 'price': '4', 'cart': 0} ,
{'id': 13, 'name': 'pepper, poblano', 'quantity': '5', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 14, 'name': 'pepper, orange and red bell', 'quantity': '20', 'unit': 'lbs', 'price': '3.50', 'cart': 0} ,
{'id': 15, 'name': 'Cantaloupe (about 4 lbs ea.)', 'quantity': '10', 'unit': 'ct', 'price': '1.50', 'cart': 0} ,
{'id': 16, 'name': 'watermelon', 'quantity': '10', 'unit': 'ct', 'price': '1.50', 'cart': 0} ,
{'id': 17, 'name': 'Broccoli (Small)', 'quantity': '5', 'unit': 'lbs', 'price': '3', 'cart': 0} ,
{'id': 18, 'name': 'Kohlrabi, Pruple', 'quantity': '20', 'unit': 'lbs', 'price': '2', 'cart': 0} ,
{'id': 19, 'name': 'Kale, Red Russian', 'quantity': '20', 'unit': 'lbs', 'price': '4.25', 'cart': 0} ,
{'id': 20, 'name': 'Cabbage, Green', 'quantity': '10', 'unit': 'heads', 'price': '2', 'cart': 0} ,
{'id': 21, 'name': 'Kale, Curly', 'quantity': '20', 'unit': 'lbs', 'price': '4.25', 'cart': 0} ,
{'id': 22, 'name': 'Kale, Lacinato', 'quantity': '20', 'unit': 'lbs', 'price': '4.25', 'cart': 0} ,
{'id': 23, 'name': 'Arikara Squash', 'quantity': '10', 'unit': 'ct', 'price': '2', 'cart': 0} ,
{'id': 24, 'name': 'Spaghetti Squash', 'quantity': '10', 'unit': 'ct', 'price': '2', 'cart': 0} 
]

function ProductRow({product, handleClick }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [unit, setUnit] = useState(product.unit);
  const [name, setName] = useState(product.name);

  return(
  <tr >
    <td>{product.name}</td>
    <td> {quantity} {product.unit}</td>
    <td>{'$'+product.price+'/'+product.unit}</td>
    <td>
    <button
      onClick={e => {
      e.preventDefault();
      
      handleClick({product, quantityDesired});
      setQuantityDesired('');
      setQuantity(product.quantity-quantityDesired)
      }}>Edit Product</button>
      </td>
  </tr>
  )
}



function ListTable({products, handleClick }) {
  const rows = products.map((product) => (
  <ProductRow key={product.id} product={product} handleClick={handleClick} />
  ));
  function handleEdit({})
  return (
    <table>
      <thead>
        <tr>
          <th colSpan ="5">Veggies Available</th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}





function App() {
  const [products, setProducts] = useState(PRODUCTS)

  return <>
  <Layout>
    <div className={styles.imageTextContainer}>
    <div>
      <ListTable className={styles.centerText} products={products} />
    </div>
    </div>
  </Layout>
  </>
}

