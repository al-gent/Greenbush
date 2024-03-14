function CartRow({ product }) {
  const unitSelected = product.unitSelected;
  const total_price = (product.cart * product.price[0]).toFixed(2);
  let productMultiplier;
  unitSelected
    ? (productMultiplier = (product.price[0] / product.price[1]).toFixed(2))
    : (productMultiplier = 1);

  let perUnit = product.unit[unitSelected];
  if (perUnit.endsWith('es')) {
    perUnit = perUnit.slice(0, -2);
  } else if (perUnit.endsWith('s')) {
    perUnit = perUnit.slice(0, -1);
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td>
        {product.cart * productMultiplier + ' ' + product.unit[unitSelected]}
      </td>
      <td>
        {'$' + Number(product.price[unitSelected]).toFixed(2) + '/' + perUnit}
      </td>
      <td>{'$' + total_price}</td>
    </tr>
  );
}

function OrderTable({ products }) {
  const rows = products.map((product) => (
    <CartRow key={product.id} product={product} />
  ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="5">Items Ordered</th>
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
  );
}

export default function OrderSummary({ order }) {
  return (
    <div>
      <p>Thank you for your order, {order.name}.</p>
      <p>
        You will recieve an email at {order.email} when your order is confirmed.
      </p>
      <OrderTable products={order.products} />
      <p>
        Checkout total : $
        {order.products
          .reduce(
            (total, product) => total + product.cart * product.price[0],
            0,
          )
          .toFixed(2)}
      </p>
      <p>Notes: {order.notes}</p>
    </div>
  );
}
