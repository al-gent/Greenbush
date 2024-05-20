import emailjs from '@emailjs/browser';
import CartTable from './cart-table';
import { renderToString } from 'react-dom/server';

export default async function EmailGB(order, farmer_email) {
  const orderTableHTML = renderToString(
    <CartTable products={order.products} />,
  );

  const templateParams = {
    subject: `New Order from ${order.name}`,
    toEmail: farmer_email,
    emailBody: orderTableHTML,
  };

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
