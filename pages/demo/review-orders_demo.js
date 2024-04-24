import { useState, useEffect } from 'react';
import styles from '../../styles/index.module.css';
import EditWholesale from './edit-wholesale_demo';
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
    <table style={{ width: '100%' }}>
      <thead>
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
                console.log('onClick', order.id),
                deleteOrder(order.id),
                setEdit(false)
              )}
            >
              Delete Order
            </button>{' '}
          </th>
        ) : (
          <th>
            <button onClick={() => setEdit(true)}>Edit Order</button>
          </th>
        )}
        <tr>
          <th>Name</th>
          <th>Quantity Desired</th>
          {edit && <th>New Quantity </th>}
          <th>Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      <hr></hr>
      <p style={{ fontWeight: 'bold' }}>Order total: ${total} </p>
      <p>Notes: {order.notes}</p>
    </table>
  );
}

export default function ReviewOrders({ updateOrders }) {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [reload, setReload] = useState(true);
  const [viewAllItems, setViewAllItems] = useState(false);
  const [viewEditWholesale, setViewEditWholesale] = useState(false);
  const [viewNewOrders, setViewNewOrders] = useState(false);

  useEffect(() => {
    fetch('/api/get-orders_demo')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
    fetch('/api/get-completed-orders_demo')
      .then((response) => response.json())
      .then((data) => {
        setCompletedOrders(data);
        setIsLoading(false);
      });
  }, [reload, updateOrders]);

  function ViewAllItems() {
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
      <div>
        {viewAllItems && (
          <div>
            <h2>Items from All Orders</h2>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function CompletedOrders() {
    return (
      <div>
        {viewCompleted ? (
          (console.log(completedOrders),
          (
            <div>
              {completedOrders.map((order) => (
                <div className={styles.infoCard} key={order.id}>
                  <h2>
                    {order.name} Order #{order.id}
                  </h2>
                  <FormattedDate date={order.date} />
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
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }

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

  function updateOrderStatus({ orderID, status }) {
    setIsLoading(true);
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
  function FormattedDate({ date }) {
    let dateObject = new Date(date);
    let formattedDate = dateObject.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return <p>{formattedDate}</p>;
  }

  return (
    <div className={styles.storyCard}>
      <h1>Farmer's Dashboard</h1>
      <div className={styles.dash}>
        <button
          className={styles.dash}
          onClick={() => setViewAllItems(!viewAllItems)}
        >
          {viewAllItems ? `Hide List of All Items` : `View List of All Items`}
        </button>
        <button
          className={styles.dash}
          onClick={() => setViewCompleted(!viewCompleted)}
        >
          {viewCompleted ? `Hide Completed Orders` : `View Completed Orders`}
        </button>
      </div>{' '}
      <div className={styles.dash}>
        <button onClick={() => setViewEditWholesale(!viewEditWholesale)}>
          {viewEditWholesale ? `Hide Edit Wholesale` : `View Edit Wholesale`}
        </button>
        <button onClick={() => setViewNewOrders(!viewNewOrders)}>
          {viewNewOrders ? `Hide New Orders` : `View New Orders`}
        </button>
      </div>
      <ViewAllItems />
      <CompletedOrders />
      {viewEditWholesale && <EditWholesale />}
      {viewNewOrders && (
        <div className={styles.parent}>
          {orders.length === 0 ? <h1>No New Orders</h1> : <h1>New Orders</h1>}
          {orders.map((order) => (
            <div className={styles.infoCard} key={order.id}>
              <h2>
                {order.name} Order #{order.id}
              </h2>
              <FormattedDate date={order.date} />
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
      )}
    </div>
  );
}
