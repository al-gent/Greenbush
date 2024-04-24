import sendConfirmationEmail from './send-confirmation-email';

export default function updateOrderStatus({
  orders,
  setOrders,
  orderID,
  status,
  updateOrderStatusAPI,
  setIsLoading,
  setReload,
  reload,
}) {
  setIsLoading(true);
  if (status === 'confirmed') {
    sendConfirmationEmail({ orders, orderID });
  }
  console.log('updateOrderStatus', orderID, status);
  fetch(updateOrderStatusAPI, {
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
      setReload(!reload);
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
