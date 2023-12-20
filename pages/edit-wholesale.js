import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/wholesale.module.css'


function ProductRow({product, updateProduct}) {
  const [productName, setProductName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit, setUnit] = useState(product.unit);
  const [price, setPrice] = useState(product.price);

  const [edit, setEdit] = useState(false);
  let perUnit = unit;
  if (perUnit.endsWith('es')) {
    perUnit = perUnit.slice(0, -2);
  } else if (perUnit.endsWith('s')) {
    perUnit = perUnit.slice(0, -1);
  }
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
            }} />
      </td>
      <td>  
        <input type="integer"
            value= {quantity}
            onChange={e=> {
              e.preventDefault();
              const newQuantity = parseInt(e.target.value);
              setQuantity(newQuantity)
            }} />
            </td>
      <td>
      <input
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
        <input
        type = "integer"
        value = {price}
        onChange={e => {
          e.preventDefault();
          const newPrice = parseInt(e.target.value);
          setPrice(newPrice)}}
          ></input>
        </td>
        <button onClick={() =>{
          updateProduct(product, productName, quantity, unit, price);
           setEdit(false)}}>Save</button>
    </tr>
    )
     : 

  <tr>
    <td>{productName}</td>
      <div style={{display: 'flex'}}>
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
            updateProduct(product, newQuantity);
          }}
          style = {{ width: '40px' }} />
    </form>
    <td>{quantity === 1? <td> {perUnit}</td> : <td>{unit}</td>}</td>
      </div>
    <td>{'$'+price+'/'+perUnit}</td>
    <button onClick={() => setEdit(true)}>Edit</button>
  </tr>
  )
}

function ProductTable({products, updateProduct }) {
  const rows = products.map((product) =>
  (<ProductRow key={product.id} product={product} updateProduct={updateProduct}/>))
  ;
  return (
    <div>
    <table>
      <thead style = {{ textAlign: 'left'}}>
        <tr>
          <th>Name</th>
          <th>Quantity Available</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
    </div>
    
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/all-products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);

      })
      .catch(error => console.error('Error:', error));
  }, []);

  function updateProduct(product, productName, newQuantity, unit, price) {
    setIsLoading(true);
    console.log('updating product', product, productName, newQuantity, unit, price);
    fetch('/api/update-product', {
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
      .then(response => {console.log('product updated', response)})
      .then(response => setIsLoading(false))
      .catch(error => console.error('Error:', error));
  }



  return <>
  <Layout>
    <h1 className={styles.centerText}>Wholesale Products</h1> 
    <ProductTable products={products} updateProduct={updateProduct} />
  </Layout>
  </>
}

