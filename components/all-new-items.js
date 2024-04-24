import { useState, useEffect } from 'react';
import styles from '/styles/index.module.css';
export default function AllNewItems({ getOrdersAPI, setIsLoading }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(getOrdersAPI)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const itemsOrdered = {};
  orders.map((order) => {
    let itemstring = order.items;
    itemstring.map((item) => {
      let product = JSON.parse(item);
      if (product.name in itemsOrdered)
        itemsOrdered[product.name][0] += product.cart;
      else
        itemsOrdered[product.name] = [
          product.cart,
          product.unit[product.unitSelected],
        ];
    });
  });
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
