import emailjs from '@emailjs/browser';
import { renderToString } from 'react-dom/server';
import CartTable from '../components/cart-table';
export default async function emailConfirmed(order) {
  products.map((itemString) => {
    let product = JSON.parse(itemString);
  });

  const orderTableHTML = renderToString(OrderTable(order.products));

  const templateParams = {
    name: order.name,
    reply_to: order.email,
    notes: order.notes,
    orderTable: orderTableHTML,
    orderID: order.id,
  };

  return;
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
