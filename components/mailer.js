import emailjs from '@emailjs/browser';

export default async function EmailGB(order, farmer_email) {
  console.log('start of EMAIL function', order, farmer_email);

  const orderTable = order.products
    .map((product) => {
      return `
    ${product.cart} ${product.unit} - ${product.name} - $${
      product.price * product.cart
    }`;
    })
    .join();

  const templateParams = {
    farmer_email: farmer_email,
    name: order.name,
    reply_to: order.email,
    notes: order.notes,
    orderTable: orderTable,
    total: order.products.reduce((acc, product) => {
      return acc + product.cart * product.price;
    }, 0),
  };

  console.log('templateParams', templateParams);
  try {
    const result = await emailjs.send(
      'service_l0rokdr',
      'wholesale',
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
