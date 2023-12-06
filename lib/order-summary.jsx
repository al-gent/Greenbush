function CartRow({ product }) {
    const total_price = (product.cart * product.price)
    return(
    <tr>
      <td>{product.name}</td>
      <td>{product.cart +' ' + product.unit}</td>
      <td>{'$'+product.price}</td>
      <td>{'$'+total_price}</td>
    </tr>
    )}

function OrderTable({products}) {
    const rows = products
    .map((product) => (
    <CartRow key={product.id} product={product}/>
    ));
    return (
        <div>
        <table>
        <thead>
            <tr>
            <th colSpan="5">
                Items Ordered
            </th>
            </tr>
            <tr>
            <th>Name</th>
            <th>Quantity Selected</th>
            <th>Price</th>
            <th>Total Price</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
        </div>
        )}


export default function OrderSummary({order}) {
return (
    <div>
    <p>Thank you for your order, {order.name}</p>
    <p>You will recieve an email at {order.email} when your order is confirmed</p>
    <OrderTable products={order.products}/>
    <p>Notes: {order.notes}</p>
    </div>
)}

