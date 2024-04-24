import { useState, useEffect } from 'react';
import emailConfirmed from './emailConfirmed';
import styles from '/styles/index.module.css';
import FormattedDate from '../components/formatted-date';
import OrderTable from '../components/order-table';
import updateOrderStatus from './update-order-status';

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

  return (
    <>
      <div className={styles.parent}>
        {!isLoading && orders.length === 0 ? (
          <h1>No New Orders</h1>
        ) : (
          <h1>New Orders</h1>
        )}
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
                    orders: orders,
                    setOrders: setOrders,
                    orderID: order.id,
                    status: e.target.value,
                    updateOrderStatusAPI: updateOrderStatusAPI,
                    setIsLoading: setIsLoading,
                    setReload: setReload,
                    reload: reload,
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
