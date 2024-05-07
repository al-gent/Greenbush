import { useState, useEffect } from 'react';
import styles from '/styles/index.module.css';
export default function AllNewItems({ client, setIsLoading }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const url = `/api/get-orders?client=${encodeURIComponent(client)}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);
  console.log('orders', orders);
  const itemsOrdered = {};
  orders.map((order) => {
    let itemstring = order.items;
    itemstring.map((item) => {
      let product = JSON.parse(item);
      console.log('product', product);
      if (product.editedCart) product.cart = parseInt(product.editedCart);
      if (product.name in itemsOrdered)
        itemsOrdered[product.name][0] += product.cart;
      else
        itemsOrdered[product.name] = [
          product.cart,
          product.unit[product.unitSelected],
        ];
    });
  });
  console.log('items ordered', itemsOrdered);
  const rows = Object.entries(itemsOrdered).map(([key, val]) => {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>
          {val[0].toFixed(0)} {val[1]}
        </td>
      </tr>
    );
  });
  return (
    <div className={styles.infoCard}>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Items from All Orders</th>
          </tr>
          <tr>
            <th
              style={{
                maxWidth: '100px',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}
            >
              Name
            </th>
            <th
              style={{
                maxWidth: '100px',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}
            >
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
