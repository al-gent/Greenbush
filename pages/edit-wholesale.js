import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/wholesale.module.css'

// unit is now a list of units & price is now a list of prices
// the layout of this product list needs to reflect that
//I need to talk to david to see if a good way to do it would be
// to have a primary unit that he can use to display the product
// and then have a dropdown menu that allows the customer to select the unit they want
// and then the price will change accordingly
// maybe he can select which units will be available for a given product

// I also need to add a way to add a new product
// and a way to delete a product


function ProductRow({product, updateProduct, updateQuantity, deleteProduct}) {
  const [productName, setProductName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit, setUnit] = useState(product.unit[0]);
  const [unit2, setUnit2] = useState(product.unit[1]);
  const [price, setPrice] = useState(product.price[0]);
  const [price2, setPrice2] = useState(product.price[1]);
  const [edit, setEdit] = useState(false);

  function perUnit(unit) {
    if(unit) {
  if (unit.endsWith('es')) {
    return unit.slice(0, -2);
  } else if (unit.endsWith('s')) {
    return unit.slice(0, -1);
  }
  else {
    return unit;
  }}
  else {return}}


  return(
    edit ? (
    <tr>
      <td>
            <input type="text"
            value= {productName}
            onChange={e=> {
              e.preventDefault();
              const newProductName = e.target.value;
              setProductName(newProductName);
            }}
             />
      </td>
      <td>  
        <input className = {styles.inputBox}
         type="integer"
            value= {quantity}
            onChange={e=> {
              e.preventDefault();
              const newQuantity = parseFloat(e.target.value);
              setQuantity(newQuantity)
            }} />
            </td>
            <td>
      <input className = {styles.inputBox}
      type="number"
      step='any'
        value= {price}
        onChange={e=> {
          e.preventDefault();
          const newPrice = parseFloat(e.target.value);
          setPrice(newPrice)
        }} />
      <input className = {styles.inputBox}
        type="text"
        value={unit}
        onChange={e => {
          e.preventDefault();
          const newUnit = e.target.value;
          setUnit(newUnit)
        }}
        ></input>
        </td>
        <td>
        <input className = {styles.inputBox}
        type = "number"
        step='any'
        value = {price2}
        onChange={e => {
          e.preventDefault();
          const newPrice2 = parseFloat(e.target.value);
          setPrice2(newPrice2)}}
          ></input>
      <input className = {styles.inputBox}
        type="text"
        value={unit2}
        onChange={e => {
          e.preventDefault();
          const newUnit2 = e.target.value;
          setUnit2(newUnit2)
        }}
        ></input>
        </td>
        <button onClick={() =>{
          updateProduct(product, productName, quantity, unit,unit2, price, price2);
           setEdit(false)}}>Save</button>
        <button onClick={() => deleteProduct(product.id)}>Delete</button>
        <button onClick={() => setEdit(false)}>Cancel</button>
    </tr>

    ):( 

  <tr>
    <td>{productName}</td>
    <td>
    <form>
          <input type="integer"
          value= {quantity}
          placeholder={quantity}
          onChange={e=> {
            e.preventDefault();
            const newQuantity = parseInt(e.target.value);
            if (isNaN(newQuantity) || newQuantity < 0 || newQuantity === quantity) {
            setQuantity(quantity);
            return;
            }
            setQuantity(newQuantity);
            updateQuantity(product, productName, newQuantity, unit, price);
          }}
          style = {{ width: '40px' }} />
    </form>
    </td>
    <td>${price} / {perUnit(unit)}</td>
    <td>{product.price.length > 1 ? ('$'+price2+'/'+ perUnit(unit2)):('')}</td>
    <button onClick={() => setEdit(true)}>Edit</button>
  </tr>
  ));
}

function ProductTable({products, updateProduct, updateQuantity, addProduct, deleteProduct }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [unit2, setUnit2] = useState('');
  const [price, setPrice] = useState('');
  const [price2, setPrice2] = useState('');
  
  const rows = products.map((product) =>
  (<ProductRow key={product.id} product={product} updateProduct={updateProduct} updateQuantity = {updateQuantity} deleteProduct = {deleteProduct}/>))
  ;
  return (
    <table>
      <thead style = {{ textAlign: 'left'}}>
        <tr>
          <th>Name</th>
          <th style = {{    
            padding: '0px 20px 0px 0px'}}>
            Quantity</th>
          <th style = {{
            paddingRight: '20px',    
            maxWidth: '100px', 
            whiteSpace: 'normal',
            textAlign: 'left'}}>Primary Price / Unit</th>
          <th style = {{    
            maxWidth: '100px', 
            whiteSpace: 'normal',
            textAlign: 'left'}}>Secondary Price / Unit</th>
        </tr>
      </thead>
      <tbody>{rows}

    <tr>
      <td>
            <input type="text"
            placeholder = "Product Name"
            value= {productName}
            onChange={e=> {
              e.preventDefault();
              const newProductName = e.target.value;
              setProductName(newProductName);
            }}
             />
      </td>
      <td>  
        <input className = {styles.inputBox}
        placeholder = "Quantity"
         type="integer"
            value= {quantity}
            onChange={e=> {
              e.preventDefault();
              const newQuantity = parseFloat(e.target.value);
              setQuantity(newQuantity)
            }} />
      </td>
      <td>
      <input className = {styles.inputBox}
      placeholder = "Price"
      type="number"
      step='any'
        value= {price}
        onChange={e=> {
          e.preventDefault();
          const newPrice = parseFloat(e.target.value);
          setPrice(newPrice)
        }} />
      <input className = {styles.inputBox}
        placeholder = "Unit"
        type="text"
        value={unit}
        onChange={e => {
          e.preventDefault();
          const newUnit = e.target.value;
          setUnit(newUnit)
        }}></input>
        </td>
        <td>
        <input className = {styles.inputBox}
        placeholder = "Price"
        type = "number"
        step='any'
        value = {price2}
        onChange={e => {
          e.preventDefault();
          const newPrice2 = parseFloat(e.target.value);
          setPrice2(newPrice2)}}
          ></input>
      <input className = {styles.inputBox}
        placeholder = "Unit"
        type="text"
        value={unit2}
        onChange={e => {
          e.preventDefault();
          const newUnit2 = e.target.value;
          setUnit2(newUnit2)
        }}
        ></input>
        </td>
        <td>
        <button onClick={() =>{
          addProduct(productName, quantity, unit,unit2, price, price2);
          setPrice('');
          setPrice2('')
          setProductName('');
          setUnit('')
          setUnit2('')
          setQuantity('')}}>Add Product</button>
        </td>
    </tr>
    </tbody>
    </table>
    
  );
}

export default function App() {
  const [farmersNote, setFarmersNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setProducts(data);

      })
      .catch(error => console.error('Error:', error));
    fetch('/api/farmers-notes')
      .then(response => response.json())
      .then(note => {
        console.log('note', note)
        setFarmersNote(note.note)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  function deleteProduct(id) {
    setIsLoading(true)
    console.log('deleting product', id);
    fetch('/api/delete-product', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({id})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {console.log('product deleted', response)})
      .then(response => setIsLoading(false))
      .then(response => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error:', error));
  }

  function addProduct(productName, quantity, unit, unit2, price, price2) {
    setIsLoading(true);
    quantity ? quantity = parseFloat(quantity) : quantity = 0;
    let unitArray = [];
    let priceArray = [];
    (unit2 ? unitArray = [unit, unit2] : unitArray = [unit]);
    (price2 ? priceArray = [price, price2] : priceArray = [price]);

    setProducts([...products, {name: productName, quantity: quantity, unit: unitArray, price: priceArray}]);
    
    console.log('adding product', productName, quantity, unit, price);
    fetch('/api/add-product', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({productName, quantity, unit, unit2, price, price2})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {console.log('product added', response)})
      .then(response => setIsLoading(false))
      .catch(error => console.error('Error:', error));

    }

  function updateProduct(product, productName, quantity, unit,unit2, price, price2) {
    setIsLoading(true);
    fetch('/api/update-product', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({product, productName, quantity, unit,unit2, price, price2})
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => {console.log('product updated', response)})
      .then(response => setIsLoading(false))
      .catch(error => console.error('Error:', error));
  }

 function updateQuantity(product, productName, newQuantity, unit, price){
  setIsLoading(true);
  console.log('updating quantity', product, productName, newQuantity, unit, price);
  fetch('/api/update-quantity', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify({product, productName, newQuantity, unit, price})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(response => {console.log('quantity updated', response)})
    .then(response => setIsLoading(false))
    .catch(error => console.error('Error:', error));
 }

 function addNote(farmersNote) {
   setIsLoading(true);
   console.log('updating note', farmersNote);
   fetch('/api/add-note', {
     method: 'POST', 
     headers: {
       'Content-Type': 'application/json'},
     body: JSON.stringify({farmersNote})
     })
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(response => {console.log('note updated', response)})
     .then(response => setIsLoading(false))
     .catch(error => console.error('Error:', error));

    }

  return <>
  <Layout isLoading = {isLoading}>
    <h1 className={styles.centerText}>Wholesale Products</h1> 
    {isLoading ? <p>Loading...</p> : null}
    <textarea
    style = {{ width: '100%', height: '100px' }}
    placeholder={`Farmer's Note: ${farmersNote}`}
    onChange={e => {
      e.preventDefault();
      const newNote = e.target.value;
      setFarmersNote(newNote)
    }}
    ></textarea>
    <button onClick={() => addNote(farmersNote)}>Post New Note</button>
    <ProductTable products={products} updateProduct={updateProduct} updateQuantity={updateQuantity} addProduct={addProduct} deleteProduct={deleteProduct} />
  </Layout>
  </>
}

