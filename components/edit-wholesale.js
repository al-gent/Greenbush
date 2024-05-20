import React, { useState, useEffect } from 'react';
import styles from '../styles/editWholesale.module.css';
import EditRow from './edit-wholesale-row';
import Link from 'next/link';

function ProductRow({ product, updateProduct, updateQuantity, deleteProduct }) {
  const [productName, setProductName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit, setUnit] = useState(product.unit[0]);
  const [unit2, setUnit2] = useState(product.unit[1]);
  const [price, setPrice] = useState(product.price[0]);
  const [price2, setPrice2] = useState(product.price[1]);
  const [unitRatio, setUnitRatio] = useState(product.unitratio || '');
  const [edit, setEdit] = useState(false);
  const [invalidQuant, setInvalidQuant] = useState(false);
  const [needUnitRatio, setNeedUnitRatio] = useState(false);

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
    <>
      <EditRow
        productName={productName}
        setProductName={setProductName}
        quantity={quantity}
        setQuantity={setQuantity}
        unit={unit}
        setUnit={setUnit}
        unit2={unit2}
        setUnit2={setUnit2}
        price={price}
        setPrice={setPrice}
        price2={price2}
        setPrice2={setPrice2}
        unitRatio={unitRatio}
        setUnitRatio={setUnitRatio}
        invalidQuant={invalidQuant}
      />
      <tr>
        <td>
          <button
            onClick={() => {
              if (isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0)
                setInvalidQuant(true);
              if (unit2 && !unitRatio) setNeedUnitRatio(true);
              else {
                setInvalidQuant(false);
                setNeedUnitRatio(false);
                updateProduct(
                  product,
                  productName,
                  quantity,
                  unit,
                  unit2,
                  price,
                  price2,
                  unitRatio,
                );
                setEdit(false);
              }
            }}
          >
            Save
          </button>
        </td>
        <td> {needUnitRatio && <>Please enter a unit ratio</>}</td>
        <td>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </td>
        <td>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <td>
          <div
            onClick={() => setEdit(true)}
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline',
              ':hover': {
                color: '#0366d6',
                textDecoration: 'none',
              },
            }}
          >
            {productName}
          </div>
        </td>
        <td>
          <input
            size={4}
            type="text"
            value={quantity == 0 ? '' : quantity}
            placeholder={quantity}
            onChange={(e) => {
              setInvalidQuant(false);
              setQuantity(e.target.value);
            }}
            onBlur={(e) => {
              if (quantity == '') return;
              if (isNaN(quantity) || quantity < 0) setInvalidQuant(true);
              else {
                updateQuantity(product, productName, quantity, unit, price);
              }
            }}
          />
        </td>
        <td>
          ${price} / {perUnit(unit)}
        </td>
        <td>
          {product.price.length > 1 ? '$' + price2 + '/' + perUnit(unit2) : ''}
        </td>
      </tr>
      <>
        {invalidQuant && (
          <td colSpan="4" style={{ textAlign: 'center' }}>
            This isn't a valid quantity
          </td>
        )}
      </>
    </>
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
  const [invalidQuant, setInvalidQuant] = useState(false);

  const currentListings = products
    .filter((product) => product.quantity > 0)
    .map((product) => (
      <ProductRow
        key={product.id}
        product={product}
        updateProduct={updateProduct}
        updateQuantity={updateQuantity}
        deleteProduct={deleteProduct}
      />
    ));
  const inactiveListings = products
    .filter((product) => product.quantity == 0)
    .map((product) => (
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
      <tbody>
        {currentListings.length > 0 && (
          <>
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                <h2>Current Listings</h2>
              </td>
            </tr>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th style={{ width: '4rem' }}>Price / Unit</th>
              <th style={{ width: '4rem' }}>2nd Price / Unit</th>
            </tr>
            {currentListings}
          </>
        )}
        {inactiveListings.length > 0 && (
          <>
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                <h3>Inactive Listings</h3>
              </td>
            </tr>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th style={{ width: '4rem' }}>Price / Unit</th>
              <th style={{ width: '4rem' }}>2nd Price / Unit</th>
            </tr>
            {inactiveListings}
          </>
        )}
        <EditRow
          productName={productName}
          setProductName={setProductName}
          quantity={quantity}
          setQuantity={setQuantity}
          unit={unit}
          setUnit={setUnit}
          unit2={unit2}
          setUnit2={setUnit2}
          price={price}
          setPrice={setPrice}
          price2={price2}
          setPrice2={setPrice2}
          invalidQuant={invalidQuant}
        />
        <tr>
          <td colSpan="4">
            <button
              onClick={() => {
                if (
                  isNaN(quantity) ||
                  quantity < 0 ||
                  isNaN(price) ||
                  price < 0
                )
                  setInvalidQuant(true);
                else {
                  addProduct(productName, quantity, unit, unit2, price, price2);
                  setInvalidQuant(false);
                  setPrice('');
                  setPrice2('');
                  setProductName('');
                  setUnit('');
                  setUnit2('');
                  setQuantity('');
                }
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

export default function EditWholesale({ client, isLoading, setIsLoading }) {
  const [farmersNote, setFarmersNote] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/data?client=${encodeURIComponent(client)}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error:', error));

    fetch(`/api/farmers-notes?client=${encodeURIComponent(client)}`)
      .then((response) => response.text())
      .then((note) => {
        if (!note) {
          setFarmersNote(null);
        } else {
          setFarmersNote(JSON.parse(note).note);
        }
      })
      .catch((error) => console.error('Error:', error));
    setIsLoading(false);
  }, []);

  function deleteProduct(id) {
    setIsLoading(true);
    fetch(`/api/delete-product`, {
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

    fetch(`/api/add-product`, {
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
        client,
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
    unitRatio,
  ) {
    setIsLoading(true);
    fetch(`/api/update-product`, {
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
        unitRatio,
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
    fetch('/api/update-quantity', {
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
    fetch(`/api/add-note?client=${encodeURIComponent(client)}`, {
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
        placeholder={
          farmersNote
            ? `Farmer's Note: ${farmersNote}`
            : `Farmer's Note: enter a note here. Buyers will see this note on your order form.`
        }
        onChange={(e) => {
          e.preventDefault();
          const newNote = e.target.value;
          setFarmersNote(newNote);
        }}
      ></textarea>
      <div>
        <button onClick={() => addNote(farmersNote)}>Post New Note</button>
      </div>
      <ProductTable
        products={products}
        updateProduct={updateProduct}
        updateQuantity={updateQuantity}
        addProduct={addProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}
