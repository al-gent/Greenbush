import emailConfirmed from './emailConfirmed';

export default function sendConfirmationEmail({ orders, orderID }) {
  console.log('sendConfirmationEmail', orderID);

  const order = orders.find((order) => order.id === orderID);
  console.log('order', order);
  emailConfirmed(order);
}
