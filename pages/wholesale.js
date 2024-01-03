import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/wholesale.module.css'
import EmailGB from '../components/mailer'
import OrderSummary from '../lib/order-summary';
import Image from 'next/image';

function QuantityUnit({product, unitSelected, setUnitSelected, setInvalidQuant, setQuantityDesired}) {
  const productMultiplier = (product.price[0] / product.price[1]).toFixed(2)
  if (product.unit.length > 1) {
    return (
      <td> 
      <select onChange={(e)=> {
        setInvalidQuant(false)
        setUnitSelected(e.target.selectedIndex)
        setQuantityDesired('')
        }}>
        {product.unit.map((unit, index) => {
          const value = index ? Math.round(productMultiplier * product.quantity * 2)/2: (Math.round(product.quantity*2)/2);
          return (
          <option key = {unit+index} value={value}> {value} {unit}</option>)
        }
        )}
      </select>
      </td>
    );
  } else {
    return <td>{product.quantity} {product.unit}</td>;
  }
}

function ProductRow({product, addToCart }) {
  const productMultiplier = (product.price[0] / product.price[1]).toFixed(2)
  const [unitSelected, setUnitSelected] = useState(0);
  const [invalidQuant, setInvalidQuant] = useState(false);
  const [quantityDesired, setQuantityDesired] = useState('');
  const qAvailable = unitSelected ? Math.round(productMultiplier * product.quantity * 2)/2: (product.quantity);
  const [quantity, setQuantity] = useState(product.quantity);
    

  let perUnit = product.unit[unitSelected];
  if (perUnit.endsWith('es')) {
    perUnit = perUnit.slice(0, -2);
  } else if (perUnit.endsWith('s')) {
    perUnit = perUnit.slice(0, -1);
  }
    

  return(
  <tr >
    <td>{product.name}</td>
    <QuantityUnit product={product} unitSelected = {unitSelected} setUnitSelected={setUnitSelected} setInvalidQuant={setInvalidQuant} setQuantityDesired={setQuantityDesired} />
    <td>{'$'+product.price[unitSelected]+'/'+perUnit}</td>
    {invalidQuant ? (<td>Sorry, only {qAvailable} {product.unit[unitSelected]} available</td>) : (<td></td>)}
    <td>
    <form>
      <div style={{display: 'flex'}}>
          <input type="integer"
          onSelect={e => setInvalidQuant(false)}
          value= {quantityDesired}
          placeholder="0"
          onChange={e=> setQuantityDesired(e.target.value)}
          style = {{ width: '40px' }} />
        <button
          onClick={e => {
            e.preventDefault();
          addToCart({product, quantityDesired, unitSelected, quantity, setQuantity, setQuantityDesired, setInvalidQuant, qAvailable , productMultiplier});
        }}>Add</button>
      </div>
    </form>
    </td>
  </tr>
  )
}

function CartRow({ product, removeFromCart }) {
  const unitSelected = product.unitSelected
  const total_price = (product.cart * product.price[0]).toFixed(2)
  let productMultiplier;
  unitSelected ? (productMultiplier = (product.price[0] / product.price[1]).toFixed(2)) : (productMultiplier = 1)

  return(
  <tr>
    <td>{product.name}</td>
    <td>{product.cart*productMultiplier +' ' + product.unit[unitSelected]}</td>
    <td>{'$'+(Number(product.price[unitSelected])).toFixed(2)+'/'+product.unit[unitSelected]}</td>
    <td>{'$'+total_price}</td>
    <td><button onClick={() => removeFromCart({product})}>Remove</button></td>
  </tr>
  )}

function ListTable({products, addToCart }) {
  const rows = products
  .filter(product => product.quantity > 0)
  .map((product) => (
  <ProductRow key={product.id} product={product} addToCart={addToCart} />
  ));
  return (
    <table>
      <thead style = {{ textAlign: 'left'}}>
        <tr>
          <th style = {{    
            paddingRight: '150px',
            maxWidth: '150px', 
            whiteSpace: 'normal',
            textAlign: 'left'}}>Name</th>
          <th style = {{    
            maxWidth: '100px', 
            whiteSpace: 'normal',
            textAlign: 'left'}}>
      Quantity Available</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CartTable({ products, removeFromCart, onSubmit, custname, email, notes, setCustname, setEmail, setNotes }) {
  const rows = products
  .filter((product) => product.cart > 0)
  .map((product) => (
  <CartRow key={product.id} product={product} removeFromCart={removeFromCart}/>
  ));
  return (
    <div>
            <hr></hr>
    <div className={styles.centerText}>

    <table>
      <thead>
        <tr>
        <th colSpan="5">
            CART
          </th>
        </tr>
        <tr>
        <th style = {{    
            maxWidth: '100px', 
            whiteSpace: 'normal',
            textAlign: 'left'}}>Name</th>
          <th style = {{    
            maxWidth: '100px', 
            whiteSpace: 'normal',
            textAlign: 'left'}}>Quantity Selected</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      </table>
      </div>
      <hr></hr>
      <p>Checkout total: ${products.filter(product => product.cart).reduce((total, product) => total + (product.cart * product.price[0]), 0).toFixed(2)}</p>
      <form>
        <div>
        <input type="text"
        value = {custname}
        onChange={e => setCustname(e.target.value)}
        required
        placeholder="Name / Organization"/>
        </div>
        <div>
        <input type="text"
        value = {email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="Email"/>
        </div>
        <div>
        <input type="textarea"
        value = {notes}
        placeholder="Notes"
        onChange={e=> setNotes(e.target.value)}/>
        </div>
      <button
        onClick={e => {onSubmit(e);}
        }>Submit Order</button>
      </form>
    </div>
  );
}





export default function App() {
  const [custname, setCustname] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [farmersNote, setFarmersNote] = useState('');

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        const productsWithCart = data.map(product => ({
          ...product, cart: 0
        }));
        setProducts(productsWithCart);
        console.log('products', productsWithCart);
    fetch('/api/farmers-notes')
        .then(response => response.json())
        .then(note => {
          setFarmersNote(note.note)
        })
        .catch(error => console.error('Error:', error));

      })
      .catch(error => console.error('Error:', error));
  }, []);

  let order = {
    name: custname,
    email: email,
    notes: notes,
    products: products.filter((product) => product.cart > 0)
  }

  let productsToUpdate = products.filter((product) => product.cart > 0)


  function submitOrder(e) {
    e.preventDefault();
    console.log('submitting order', order);
    console.log('updating products', productsToUpdate);
    setIsLoading(true);
    fetch('/api/update-quantities', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(productsToUpdate)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {console.log('products updated', response)})
    fetch('/api/place-order', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify(order)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {
        return EmailGB({order});
      })
      .then(response => {
        setIsLoading(false);
        setOrderPlaced(true)})
      .catch(error => console.error('Error:', error));
  }

  function addToCart({product, quantityDesired, setQuantityDesired, unitSelected, quantity, setQuantity, setInvalidQuant, qAvailable, productMultiplier}){
    // q available is the quantity available in the unit selected

    // everything is in the base unit
    // if unitSeelcted, then we just display it in the unit selected
    // all the numbers passed around are in the base unit
    // nothing is rounded until it is displayed

    // quantity desired comes in with whatever unit is selected
    // so that needs to change to the base unit
    unitSelected ? (productMultiplier = (product.price[0] / product.price[1]).toFixed(2)) : (productMultiplier = 1)

    const baseUnitQuantityDesired = unitSelected ? parseFloat(quantityDesired/productMultiplier) : parseFloat(quantityDesired)
    const parsedQuantityAvail = parseFloat(quantity) // in base unit
  
    const newQuantity = parseFloat(parsedQuantityAvail - baseUnitQuantityDesired)


    const productToAdd = {...product, cart: baseUnitQuantityDesired, unitSelected: unitSelected, quantity: newQuantity}

    if (isNaN(baseUnitQuantityDesired) || baseUnitQuantityDesired < 0 || parseFloat(qAvailable)  < (baseUnitQuantityDesired*productMultiplier)) {
      setInvalidQuant(true);
      return;
    } else {
    const nextProducts = products.map((p) => {
      if (p.id === product.id) {
        return productToAdd
      } else {
        return p;
      }
    });
    setProducts(nextProducts);
    setQuantityDesired('');
  }}


  function removeFromCart({product}) {
    // and restore the amount back to the product list in the base unit
    // so unitSelected ? (product.cart* or / productMultiplier) : (product.cart)
    const productMultiplier = (product.price[0] / product.price[1])
    const quantityToRestore = parseFloat(product.cart)

    const nextProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: parseFloat(p.quantity) + quantityToRestore, cart: parseFloat(p.cart) - parseFloat(p.cart)};
      } else{
        return p;
      }
    });
    setProducts(nextProducts)
  }

  const CartLen = products.filter((product) => product.cart > 0).length


  return <>
  <Layout isLoading={isLoading}>
    <h1 className={styles.centerText}>Wholesale Order Form</h1> 
    {/* {isLoading &&  <Image className={styles.loading}
                    priority
                    src="/images/cabbagelogotransparent.png"
                    height={2500}
                    width={2323}
                    alt="cabagelogotransparent"
                />} */}
    <div className={styles.centerText}>
    {orderPlaced ? (<p></p>):(farmersNote ? (<p style={{width: '100%'}}><em>Farmer's Note: {farmersNote}</em></p>) : (<p></p>))}
    </div>
      {orderPlaced ? ( <p></p>
      ) : (
        <div className={styles.centerText}>
        <ListTable className={styles.centerText} products={products} addToCart={addToCart} farmersNote= {farmersNote}/>
        </div>
      )}
        <div>
      {orderPlaced ? (
        <OrderSummary order = {order} />
      ) : CartLen === 0 ? (<h1 className={styles.centerText}>Cart is empty</h1>
      ) : (
        <div className={styles.centerText}>
      <CartTable className={styles.centerText} products={products} removeFromCart={removeFromCart} onSubmit={submitOrder} custname={custname} 
      email={email} 
      notes={notes} 
      setCustname={setCustname} 
      setEmail={setEmail} 
      setNotes={setNotes} 
      />
      </div>
    )}
    </div>
  </Layout>
  </>
}

