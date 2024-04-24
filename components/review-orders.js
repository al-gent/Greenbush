import { useState, useEffect } from 'react';
import emailConfirmed from './emailConfirmed';
import styles from '/styles/index.module.css';
import FormattedDate from '../components/formatted-date';
import OrderTable from '../components/order-table';

export default function ReviewOrders({
  getOrdersAPI,
  updateOrdersAPI,
  deleteOrdersAPI,
  updateOrderStatusAPI,
  isLoading,
  setIsLoading,
}) {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(getOrdersAPI)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, [reload]);

  function sendConfirmationEmail({ orderID }) {
    setIsLoading(true);
    console.log('sendConfirmationEmail', orderID);

    const order = orders.find((order) => order.id === orderID);
    console.log('order', order);
    emailConfirmed(order);
  }

  function updateOrderStatus({ orderID, status }) {
    setIsLoading(true);
    if (status === 'confirmed') {
      sendConfirmationEmail({ orderID });
    }
    console.log('updateOrderStatus', orderID, status);
    fetch(updateOrderStatusAPI, {
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
        setReload(!reload);
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
    <>
      <div className={styles.parent}>
        {orders.length === 0 ? <h1>No New Orders</h1> : <h1>New Orders</h1>}
        {orders.map((order) => (
          <div className={styles.infoCard} key={order.id}>
            <h2>
              {order.name} Order #{order.id}
            </h2>
            <FormattedDate date={order.date} />
            <OrderTable
              orders={orders}
              setOrders={setOrders}
              order={order}
              reload={reload}
              setReload={setReload}
              deleteOrdersAPI={deleteOrdersAPI}
              setIsLoading={setIsLoading}
              updateOrdersAPI={updateOrdersAPI}
            />
            <p>
              Order status:
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus({
                    orderID: order.id,
                    status: e.target.value,
                  })
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
    </>
  );
}
