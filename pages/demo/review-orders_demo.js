import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import emailConfirmed from '../../components/emailConfirmed';
import styles from '../../styles/wholesale.module.css';

function EditRow({ product, setQuantity }) {
  let productMultiplier = 1;
  const unitSelected = product.unitSelected || 0;
  unitSelected === 0
    ? (productMultiplier = 1)
    : (productMultiplier = product.price[0] / product.price[1]);
  const cart = Math.round(product.cart * productMultiplier);
  const total_price = Math.round(product.cart * product.price[0]).toFixed(2);
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        {cart} {product.unit[unitSelected]}{' '}
      </td>
      <td>
        <input
          type="integer"
          placeholder={cart}
          value={product.editedCart || ''}
          onChange={(e) => {
            setQuantity(e.target.value, product.id);
          }}
        ></input>
      </td>
      <td>{'$' + product.price[unitSelected]}</td>
      <td>{'$' + total_price}</td>
    </tr>
  );
}

function CartRow({ product }) {
  let productMultiplier = 1;
  const unitSelected = product.unitSelected || 0;
  unitSelected === 0
    ? (productMultiplier = 1)
    : (productMultiplier = product.price[0] / product.price[1]);
  const cart = Math.round(product.cart * productMultiplier);
  const total_price = product.editedCart
    ? (product.editedCart * product.price[0]).toFixed(2)
    : Math.round(product.cart * product.price[0]).toFixed(2);

  return (
    <tr>
      <td>{product.name}</td>
      {product.editedCart ? (
        <td>
          <del>{cart}</del>
          {' ' + product.editedCart + ' ' + product.unit[unitSelected]}
        </td>
      ) : (
        <td>{cart + ' ' + product.unit[unitSelected]} </td>
      )}
      <td>{'$' + product.price[unitSelected]}</td>
      <td>{'$' + total_price}</td>
    </tr>
  );
}

function OrderTable({ order, editOrder, updateOrder, deleteOrder }) {
  const [edit, setEdit] = useState(false);
  let products = order.items;
  let total = 0;
  const rows = products.map((itemString) => {
    let product = JSON.parse(itemString);
    const total_price = product.editedCart
      ? (product.editedCart * product.price[0]).toFixed(2)
      : Math.round(product.cart * product.price[0]).toFixed(2);
    total += parseFloat(total_price);
    return edit ? (
      <EditRow
        key={product.id}
        product={product}
        setQuantity={(quantity, productID) =>
          editOrder({ newQuantity: quantity, order, productID })
        }
      />
    ) : (
      <CartRow key={product.id} product={product} />
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="5">Items Ordered</th>
            {edit ? (
              <th>
                <button
                  onClick={(e) => (
                    e.preventDefault,
                    console.log('onClick', order),
                    updateOrder({ order }),
                    setEdit(false)
                  )}
                >
                  Save Order
                </button>{' '}
                <button
                  onClick={(e) => (
                    e.preventDefault,
                    console.log('onClick', order),
                    deleteOrder(order.id),
                    setEdit(false)
                  )}
                >
                  Delete Order
                </button>{' '}
              </th>
            ) : (
              <th>
                {' '}
                <button onClick={() => setEdit(true)}>Edit Order</button>
              </th>
            )}
          </tr>
          <tr>
            <th>Name</th>
            <th>Quantity Desired</th>
            {edit && <th>New Quantity </th>}
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <hr></hr>
      <p>Order total: ${total} </p>
    </div>
  );
}

export default function ReviewOrders({ updateOrders }) {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('/api/get-orders_demo')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, [updateOrders]);

  function editOrder({ order, newQuantity, productID }) {
    const nextOrders = orders.map((o) => {
      if (o.id === order.id) {
        order.items = order.items.map((itemString) => {
          let item = JSON.parse(itemString);
          if (item.id === productID) {
            item.editedCart = newQuantity;
            return JSON.stringify(item);
          } else {
            return itemString;
          }
        });
        return { ...o, status: 'edited' };
      } else {
        return o;
      }
    });
    setOrders(nextOrders);
  }

  function deleteOrder(id) {
    setIsLoading(true);
    console.log('deleteOrder', id);
    fetch('/api/delete-order_demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: id,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }

  function updateOrder({ order }) {
    setIsLoading(true);
    console.log('updateOrder', order);
    fetch('/api/update-orders_demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }

  function sendConfirmationEmail({ orderID }) {
    setIsLoading(true);
    console.log('sendConfirmationEmail', orderID);

    const order = orders.find((order) => order.id === orderID);
    console.log('order', order);
    emailConfirmed(order);
  }

  function updateOrderStatus({ orderID, status }) {
    setIsLoading(true);
    // if (status === 'confirmed') {
    //   sendConfirmationEmail({ orderID });
    // }
    console.log('updateOrderStatus', orderID, status);
    fetch('/api/update-order-status_demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID, status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
      })
      .then((data) => {
        setOrders(
          orders.map((order) =>
            order.id === orderID ? { ...order, status } : order,
          ),
        );
      })
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div className={styles.infoCard}>
      <h1 className={styles.centerText}>Review Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div key={order.id}>
          <h2>
            {order.name} Order #{order.id}
          </h2>
          <OrderTable
            order={order}
            editOrder={editOrder}
            updateOrder={updateOrder}
            deleteOrder={deleteOrder}
          />
          <p>Notes: {order.notes}</p>
          <p>
            Order status:
            <select
              value={order.status}
              onChange={(e) =>
                updateOrderStatus({ orderID: order.id, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="edited">Edited</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </p>
        </div>
      ))}
    </div>
  );
}
