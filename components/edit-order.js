export default function editOrder({
  orders,
  setOrders,
  order,
  newQuantity,
  productID,
}) {
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
