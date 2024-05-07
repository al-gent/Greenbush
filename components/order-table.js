import editOrder from './edit-order';
import updateOrder from './update-order';
import deleteOrder from './delete-order';
import EditRow from './edit-row';
import CartRow from './cart-row';
import { useState, useEffect } from 'react';

export default function OrderTable({
  orders,
  setOrders,
  order,
  reload,
  setReload,
  client,
  setIsLoading,
}) {
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
          editOrder({
            newQuantity: quantity,
            order,
            orders,
            setOrders,
            productID,
          })
        }
      />
    ) : (
      <CartRow key={product.id} product={product} />
    );
  });

  return (
    <table>
      <thead>
        {edit ? (
          <th>
            <button
              onClick={(e) => (
                e.preventDefault,
                console.log('onClick', order),
                updateOrder({ order, orders, setIsLoading, client }),
                setEdit(false)
              )}
            >
              Save Order
            </button>{' '}
            <button
              onClick={(e) => (
                e.preventDefault,
                console.log('onClick', order.id),
                deleteOrder(order.id, client, reload, setReload),
                setEdit(false),
                setReload(true)
              )}
            >
              Delete Order
            </button>{' '}
          </th>
        ) : (
          <th>
            {order.status != 'completed' && (
              <button onClick={() => setEdit(true)}>Edit Order</button>
            )}
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
      {order.notes && <p>Note: {order.notes}</p>}
    </table>
  );
}
