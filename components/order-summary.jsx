import CartTable from './cart-table';

export default function OrderSummary({ order }) {
  return (
    <div>
      <p>Thank you for your order, {order.name}.</p>
      <p>
        You will recieve an email at {order.email} when your order is confirmed.
      </p>
      <CartTable products={order.products} />

      <p>Notes: {order.notes}</p>
    </div>
  );
}
