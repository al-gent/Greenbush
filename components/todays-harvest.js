import { useState, useEffect } from 'react';
import styles from '/styles/index.module.css';
export default function TodaysHarvest({ client, setIsLoading }) {
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
  const itemsOrdered = {};
  orders.map((order) => {
    let itemstring = order.items;
    itemstring.map((item) => {
      let product = JSON.parse(item);
      let id = `${product.name}${product.unit[product.unitSelected]}`;
      if (product.editedCart) product.cart = parseInt(product.editedCart);
      if (product.unitSelected)
        product.cart = parseInt(
          product.cart * product.unitratio ||
            product.price[0] / product.price[1],
        );
      if (product.editedCart == 0) return;
      if ([product.name, product.unit[product.unitSelected]] in itemsOrdered)
        itemsOrdered[[product.name, product.unit[product.unitSelected]]][0] +=
          product.cart;
      else
        itemsOrdered[[product.name, product.unit[product.unitSelected]]] = [
          product.cart,
          product.unit[product.unitSelected],
          product.price[product.unitSelected],
        ];
    });
  });

  let total = Object.values(itemsOrdered)
    .reduce((total, item) => {
      let itemTotal = item[2] * item[0];
      return total + itemTotal;
    }, 0)
    .toFixed(2);

  const rows = Object.entries(itemsOrdered).map(([key, val]) => {
    return (
      <tr key={key}>
        <td>{key.substring(0, key.length - val[1].length - 1)}</td>{' '}
        {/* this is because the key is both the product & the unit,
        so products in different units can be aggregated seperately,
        this cuts the string so that the unit is cut off, just leaving the product  */}
        <td>
          {val[0].toFixed(0)} {val[1]}
        </td>
        <td>${val[2] * val[0]}</td>
      </tr>
    );
  });
  return (
    <div className={styles.infoCard}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <p style={{ fontWeight: 'bold' }}>Today's Revenue: ${total}</p>
    </div>
  );
}
