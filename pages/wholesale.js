import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
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
    <form className={styles.smallerForm.textarea}>
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

function CartTable({ products, handleClick, onSubmit }) {
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
        onClick={e => {onSubmit(); e.preventDefault();}
        }>Submit Order</button>
      </form>
    </div>
  );
}





export default function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  function submitOrder() {
    console.log('submitting order');
    fetch('/api/update-table', {
      method: 'POST', // or 'PUT' depending on how you've set up your server
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(products)
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
    // window.location.href ='wholesale-confirmation'
    }
    
  

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
      <CartTable className={styles.centerText} products={products} handleClick={removeFromCart} onSubmit={submitOrder}/>
    </div>
    </div>
  </Layout>
  </>
}

