/*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*/

import React, { useState } from 'react'
import Layout from '../components/layout'
import styles from '/components/layout.module.css'

function ProductRow({product, handleClick }) {
  const [quantityDesired, setQuantityDesired] = useState('');
  const parsedQuantityDesired = parseInt(quantityDesired)

  const [quantity, setQuantity] = useState(product.quantity);
  const parsedQuantityAvail = parseInt(quantity)

  return(
  <tr >
    <td>{product.name}</td>
    <td> {quantity} {product.unit}</td>
    <td>{'$'+product.price+'/'+product.unit}</td>
    <td>
    <form classname={styles.smallerForm.textarea}>
      <input type="integer"
      value= {quantityDesired}
      placeholder="Desired Quantity"
      onChange={e=> setQuantityDesired(e.target.value)}/>
    <button
      onClick={e => {
      e.preventDefault();
      console.log(quantityDesired, quantity)
      if (isNaN(parsedQuantityDesired) || parsedQuantityDesired < 0 || parsedQuantityAvail  < parsedQuantityDesired) {
        console.log('invalid quant');
        return;
      }
      console.log(quantityDesired)
      handleClick({product, quantityDesired});
      setQuantityDesired('');
      setQuantity(product.quantity-quantityDesired)
      }}>Add</button>
    </form>
    </td>
  </tr>
  )
}

function CartRow({ product, handleClick }) {
  const total_price = (product.cart * product.price)
  return(
  <tr>
    <td>{product.name}</td>
    <td>{product.cart +' ' + product.unit}</td>
    <td>{'$'+product.price}</td>
    <td>{'$'+total_price}</td>
    <button onClick={() => handleClick({product})}>Remove</button>
    {/* this part was kind of confusing to me because your passing a prop
    to handleClick, which is a prop itself
    like handle click isn't ever a function, but you can still pass it a prop
    as if it was a function?*/}
  </tr>
  )}

function ListTable({products, handleClick }) {
  const rows = products.map((product) => (
  <ProductRow key={product.id} product={product} handleClick={handleClick} />
  ));
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

function CartTable({ products, handleClick }) {
  const rows = products
  .filter((product) => product.cart > 0)
  .map((product) => (
  <CartRow key={product.id} product={product} handleClick={handleClick}/>
  ));
  return (
    <div>
    <table>
      <thead>
        <tr>
        <th colSpan="5">
            CART
          </th>
        </tr>
        <tr>
          <th>Name</th>
          <th>Quantity Selected</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      </table>
      <hr></hr>
      <h1>Checkout total: ${products.reduce((total, product) => total + (product.cart * product.price), 0)}</h1>
      <form>
        <input type="text"
        required
        placeholder="Name / Organization"
        onChange={e=> e.target.value}/>
        <input type="textarea"
        placeholder="Notes"
        onChange={e=> e.target.value}/>
      <button
        onClick={e => {
        e.preventDefault();
        }}>Submit Order</button>
      </form>
    </div>
  );
}

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



export default function App() {
  const [products, setProducts] = useState(PRODUCTS)

  function addToCart({product, quantityDesired}){
    console.log(typeof(Number(quantityDesired)))
    console.log('Before:', products)
    const nextProducts = products.map((p) => {
      if (p.id === product.id) {
        var newQuantity = parseInt(p.quantity)-parseInt(quantityDesired)
        var newCart = parseInt(p.cart)+parseInt(quantityDesired)
        return {...p, quantity: newQuantity, cart: newCart};
      } else {
        return p;
      }
    });
    console.log('After:', nextProducts)
    setProducts(nextProducts)
  }

  function removeFromCart({product}) {
    console.log('Before:', products)
    const nextProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: parseInt(p.quantity) + parseInt(p.cart), cart: parseInt(p.cart) - parseInt(p.cart)};
      } else{
        return p;
      }
    });
    console.log('After:',nextProducts)
    setProducts(nextProducts)
  }
  return <>
  <Layout>
    <div className={styles.imageTextContainer}>
    <div>
      <ListTable className={styles.centerText} products={products} handleClick={addToCart} />
    </div>
    <div>
      <CartTable className={styles.centerText} products={products} handleClick={removeFromCart}/>
    </div>
    </div>
  </Layout>
  </>
}

