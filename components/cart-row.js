export default function CartRow({ product }) {
  let productMultiplier = 1;
  const unitSelected = product.unitSelected || 0;
  unitSelected === 0
    ? (productMultiplier = 1)
    : (productMultiplier = product.price[0] / product.price[1]);
  const cart = Math.round(product.cart * productMultiplier);
  const total_price = product.editedCart
    ? (product.editedCart * product.price[0]).toFixed(2)
    : Math.round(product.cart * product.price[0]).toFixed(2);

  return (
    <tr>
      <td>{product.name}</td>
      {product.editedCart ? (
        <td>
          <del>{cart}</del>
          {' ' + product.editedCart + ' ' + product.unit[unitSelected]}
        </td>
      ) : (
        <td>{cart + ' ' + product.unit[unitSelected]} </td>
      )}
      <td>{'$' + product.price[unitSelected]}</td>
      <td>{'$' + total_price}</td>
    </tr>
  );
}
