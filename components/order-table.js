import editOrder from './edit-order';
import updateOrder from './update-order';
import deleteOrder from './delete-order';
import EditOrderTableRow from './edit-order-table-row';
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
  function productMultiplier(product) {
    return product.unitSelected
      ? product.unitratio || (product.price[0] / product.price[1]).toFixed(2)
      : 1;
  }

  //the || statement should make it so that past orders that weren't sent along with a unitRatio dont break

  let products = order.items;

  let total = products
    .reduce((total, itemString) => {
      let product = JSON.parse(itemString);
      return (
        total +
        (product.editedCart
          ? product.editedCart
          : product.cart * productMultiplier(product)) *
          product.price[product.unitSelected]
      );
    }, 0)
    .toFixed(2);

  const rows = products.map((itemString) => {
    let product = JSON.parse(itemString);
    return edit ? (
      <EditOrderTableRow
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
                updateOrder({ order, orders, setIsLoading, client }),
                setEdit(false)
              )}
            >
              Save Order
            </button>{' '}
            <button
              onClick={(e) => (
                e.preventDefault,
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
