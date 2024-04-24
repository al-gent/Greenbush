import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/wholesale.module.css';
import Link from 'next/link';

// unit is now a list of units & price is now a list of prices
// the layout of this product list needs to reflect that
//I need to talk to david to see if a good way to do it would be
// to have a primary unit that he can use to display the product
// and then have a dropdown menu that allows the customer to select the unit they want
// and then the price will change accordingly
// maybe he can select which units will be available for a given product

// I also need to add a way to add a new product
// and a way to delete a product

function ProductRow({ product, updateProduct, updateQuantity, deleteProduct }) {
  const [productName, setProductName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit, setUnit] = useState(product.unit[0]);
  const [unit2, setUnit2] = useState(product.unit[1]);
  const [price, setPrice] = useState(product.price[0]);
  const [price2, setPrice2] = useState(product.price[1]);
  const [edit, setEdit] = useState(false);

  function perUnit(unit) {
    if (unit) {
      if (unit.endsWith('es')) {
        return unit.slice(0, -2);
      } else if (unit.endsWith('s')) {
        return unit.slice(0, -1);
      } else {
        return unit;
      }
    } else {
      return;
    }
  }

  return edit ? (
    <tr className={styles.productRow}>
      <td>
        <input
          size={productName.length}
          type="text"
          value={productName}
          onChange={(e) => {
            e.preventDefault();
            const newProductName = e.target.value;
            setProductName(newProductName);
          }}
        />
      </td>
      <td>
        <input
          size="4"
          type="tel"
          value={quantity}
          onChange={(e) => {
            e.preventDefault();
            const newQuantity = parseFloat(e.target.value);
            setQuantity(newQuantity);
          }}
        />
      </td>
      <td>
        <input
          size="4"
          type="tel"
          step="any"
          value={price}
          onChange={(e) => {
            e.preventDefault();
            const newPrice = parseFloat(e.target.value);
            setPrice(newPrice);
          }}
        />
        <input
          size="4"
          type="text"
          value={unit}
          onChange={(e) => {
            e.preventDefault();
            const newUnit = e.target.value;
            setUnit(newUnit);
          }}
        ></input>
      </td>
      <td>
        <input
          size="4"
          type="tel"
          step="any"
          value={price2}
          onChange={(e) => {
            e.preventDefault();
            const newPrice2 = parseFloat(e.target.value);
            setPrice2(newPrice2);
          }}
        ></input>
        <input
          size="4"
          type="text"
          value={unit2}
          onChange={(e) => {
            e.preventDefault();
            const newUnit2 = e.target.value;
            setUnit2(newUnit2);
          }}
        ></input>
      </td>
      <button
        onClick={() => {
          updateProduct(
            product,
            productName,
            quantity,
            unit,
            unit2,
            price,
            price2,
          );
          setEdit(false);
        }}
      >
        Save
      </button>
      <button onClick={() => deleteProduct(product.id)}>Delete</button>
      <button onClick={() => setEdit(false)}>Cancel</button>
    </tr>
  ) : (
    <tr className={styles.productRow}>
      <td
        style={{
          maxWidth: '4rem',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {productName}
      </td>
      <td>
        <form>
          <input
            size={4}
            type="tel"
            value={quantity}
            placeholder={quantity}
            onChange={(e) => {
              e.preventDefault();
              const newQuantity = parseInt(e.target.value);
              if (
                isNaN(newQuantity) ||
                newQuantity < 0 ||
                newQuantity === quantity
              ) {
                setQuantity(quantity);
                return;
              }
              setQuantity(newQuantity);
              updateQuantity(product, productName, newQuantity, unit, price);
            }}
          />
        </form>
      </td>
      <td>
        ${price} / {perUnit(unit)}
      </td>
      <td>
        {product.price.length > 1 ? '$' + price2 + '/' + perUnit(unit2) : ''}
      </td>
      <button onClick={() => setEdit(true)}>Edit</button>
    </tr>
  );
}

function ProductTable({
  products,
  updateProduct,
  updateQuantity,
  addProduct,
  deleteProduct,
}) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [unit2, setUnit2] = useState('');
  const [price, setPrice] = useState('');
  const [price2, setPrice2] = useState('');

  const rows = products.map((product) => (
    <ProductRow
      key={product.id}
      product={product}
      updateProduct={updateProduct}
      updateQuantity={updateQuantity}
      deleteProduct={deleteProduct}
    />
  ));
  return (
    <table>
      <tr>
        <th style={{ wordWrap: 'break-word', maxWidth: '5rem' }}>Name</th>
        <th>Quantity</th>
        <th style={{ width: '4rem' }}>1st Price / Unit</th>
        <th style={{ width: '4rem' }}>2nd Price / Unit</th>
      </tr>
      <tbody>
        {rows}
        <tr>
          <td>
            <input
              size={10}
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => {
                e.preventDefault();
                const newProductName = e.target.value;
                setProductName(newProductName);
              }}
            />
          </td>
          <td>
            <input
              size={3}
              placeholder="Quantity"
              type="tel"
              value={quantity}
              onChange={(e) => {
                e.preventDefault();
                const newQuantity = parseFloat(e.target.value);
                setQuantity(newQuantity);
              }}
            />
          </td>
          <td>
            <input
              size={3}
              placeholder="Price"
              type="tel"
              step="any"
              value={price}
              onChange={(e) => {
                e.preventDefault();
                const newPrice = parseFloat(e.target.value);
                setPrice(newPrice);
              }}
            />
            <input
              size={3}
              placeholder="Unit"
              type="text"
              value={unit}
              onChange={(e) => {
                e.preventDefault();
                const newUnit = e.target.value;
                setUnit(newUnit);
              }}
            ></input>
          </td>
          <td>
            <input
              size={3}
              placeholder="Price"
              type="tel"
              step="any"
              value={price2}
              onChange={(e) => {
                e.preventDefault();
                const newPrice2 = parseFloat(e.target.value);
                setPrice2(newPrice2);
              }}
            ></input>
            <input
              size={3}
              placeholder="Unit"
              type="text"
              value={unit2}
              onChange={(e) => {
                e.preventDefault();
                const newUnit2 = e.target.value;
                setUnit2(newUnit2);
              }}
            ></input>
          </td>
          <td>
            <button
              onClick={() => {
                addProduct(productName, quantity, unit, unit2, price, price2);
                setPrice('');
                setPrice2('');
                setProductName('');
                setUnit('');
                setUnit2('');
                setQuantity('');
              }}
            >
              Add Product
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default function EditWholesale({
  dataAPI,
  farmersNotesAPI,
  deleteProductAPI,
  addProductAPI,
  updateProductAPI,
  updateQuantityAPI,
  addNoteAPI,
  isLoading,
  setIsLoading,
}) {
  const [farmersNote, setFarmersNote] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    console.log('dataAPI', dataAPI);
    fetch(dataAPI)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error:', error));

    fetch(farmersNotesAPI)
      .then((response) => response.json())
      .then((note) => {
        setFarmersNote(note.note);
      })
      .catch((error) => console.error('Error:', error));
    setIsLoading(false);
  }, []);

  function deleteProduct(id) {
    setIsLoading(true);
    fetch(deleteProductAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        console.log('product deleted', response);
      })
      .then((response) => setIsLoading(false))
      .then((response) =>
        setProducts(products.filter((product) => product.id !== id)),
      )
      .catch((error) => console.error('Error:', error));
  }

  function addProduct(productName, quantity, unit, unit2, price, price2) {
    setIsLoading(true);
    quantity ? (quantity = parseFloat(quantity)) : (quantity = 0);
    let unitArray = [];
    let priceArray = [];
    unit2 ? (unitArray = [unit, unit2]) : (unitArray = [unit]);
    price2 ? (priceArray = [price, price2]) : (priceArray = [price]);

    setProducts([
      ...products,
      {
        name: productName,
        quantity: quantity,
        unit: unitArray,
        price: priceArray,
      },
    ]);

    console.log('adding product', productName, quantity, unit, price);
    fetch(addProductAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName,
        quantity,
        unit,
        unit2,
        price,
        price2,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        console.log('product added', response);
      })
      .then((response) => setIsLoading(false))
      .catch((error) => console.error('Error:', error));
  }

  function updateProduct(
    product,
    productName,
    quantity,
    unit,
    unit2,
    price,
    price2,
  ) {
    setIsLoading(true);
    fetch(updateProductAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product,
        productName,
        quantity,
        unit,
        unit2,
        price,
        price2,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        console.log('product updated', response);
      })
      .then((response) => setIsLoading(false))
      .catch((error) => console.error('Error:', error));
  }

  function updateQuantity(product, productName, newQuantity, unit, price) {
    setIsLoading(true);
    console.log(
      'updating quantity',
      product,
      productName,
      newQuantity,
      unit,
      price,
    );
    fetch(updateQuantityAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product, productName, newQuantity, unit, price }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        console.log('quantity updated', response);
      })
      .then((response) => setIsLoading(false))
      .catch((error) => console.error('Error:', error));
  }

  function addNote(farmersNote) {
    setIsLoading(true);
    console.log('updating note', farmersNote);
    fetch(addNoteAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ farmersNote }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => setIsLoading(false))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div className={styles.editWholesale}>
      <h1>Wholesale Products</h1>
      {isLoading ? <p>Loading...</p> : null}
      <textarea
        style={{ width: '100%', maxWidth: '30rem', height: '5rem' }}
        placeholder={`Farmer's Note: ${farmersNote}`}
        onChange={(e) => {
          e.preventDefault();
          const newNote = e.target.value;
          setFarmersNote(newNote);
        }}
      ></textarea>
      <div>
        <button onClick={() => addNote(farmersNote)}>Post New Note</button>
      </div>
      <div>
        <ProductTable
          products={products}
          updateProduct={updateProduct}
          updateQuantity={updateQuantity}
          addProduct={addProduct}
          deleteProduct={deleteProduct}
        />
      </div>
    </div>
  );
}
