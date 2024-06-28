import FormattedDate from './formatted-date';
import OrderTable from './order-table';
import { useState, useEffect } from 'react';
import styles from '/styles/index.module.css';
import editOrder from './edit-order';
import updateOrder from './update-order';
import deleteOrder from './delete-order';
import updateOrderStatus from './update-order-status';

export default function CompletedOrders({ client, setIsLoading }) {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url = `/api/get-completed-orders?client=${encodeURIComponent(
      client,
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCompletedOrders(data);
        setIsLoading(false);
      });
  }, [reload]);
  return (
    <div>
      {completedOrders.map((order) => (
        <div className={styles.infoCard} key={order.id}>
          <h2>
            {order.name} Order #{order.id}
          </h2>
          <FormattedDate date={order.date} />
          <a
            href={`/invoice-template/${order.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }} // Add button styles here
          >
            <button>Generate Invoice</button>
          </a>
          <OrderTable
            order={order}
            editOrder={editOrder}
            updateOrder={updateOrder}
            deleteOrder={deleteOrder}
          />
          <p>
            Order status:
            <select
              value={order.status}
              onChange={(e) =>
                updateOrderStatus({
                  orders: completedOrders,
                  setOrders: setCompletedOrders,
                  orderID: order.id,
                  status: e.target.value,
                  client: client,
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
  );
}
