import emailjs from '@emailjs/browser';
import { renderToString } from 'react-dom/server';

export default async function emailConfirmed(order) {
  console.log('start of EMAIL function', order);

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

  function orderTable(order) {
    let products = order.items;
    let total = 0;
    const rows = products.map((itemString) => {
      let product = JSON.parse(itemString);
      const total_price = product.editedCart
        ? (product.editedCart * product.price[0]).toFixed(2)
        : Math.round(product.cart * product.price[0]).toFixed(2);
      total += parseFloat(total_price);
      return <CartRow key={product.id} product={product} />;
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="4">Items Ordered</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Quantity Desired</th>
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

  const orderTableHTML = renderToString(orderTable(order));

  const templateParams = {
    name: order.name,
    reply_to: order.email,
    notes: order.notes,
    orderTable: orderTableHTML,
    orderID: order.id,
  };

  console.log('templateParams', templateParams);
  try {
    const result = await emailjs.send(
      'service_l0rokdr',
      'template1',
      templateParams,
      'XPX6vluS07arIqYtC',
    );
    console.log('Email sent', result.text);
    return result.text;
  } catch (error) {
    console.log('error sending email', error.text);
    throw error;
  }
}
