import emailjs from '@emailjs/browser';

export default async function EmailGB(order) {
  console.log('start of EMAIL function', order);
  
const orderTable = order.order.products.map((product) => {
    return `
    ${product.cart} ${product.unit} - ${product.name} - $${product.price * product.cart}`
  }).join()

  const templateParams = {
    name: order.order.name,
    reply_to : order.order.email,
    notes: order.order.notes,
    orderTable: orderTable,
    total: order.order.products.reduce((acc, product) => {
      return acc + (product.cart * product.price)
    }, 0)
  }
  
  console.log('templateParams', templateParams);
  try {
    const result = await emailjs.send('service_l0rokdr', 'wholesale', templateParams, 'XPX6vluS07arIqYtC')
    console.log('Email sent', result.text);
    return result.text;
  } catch (error) {
    console.log('error sending email', error.text);
    throw error;
  }
}