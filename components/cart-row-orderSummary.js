export default function CartRow({ product, removeFromCart }) {
  const unitSelected = product.unitSelected;
  let productMultiplier;
  unitSelected
    ? (productMultiplier = product.unitratio)
    : (productMultiplier = 1);

  const total_price = (
    (product.editedCart ? product.editedCart : product.cart) *
    productMultiplier *
    product.price[unitSelected]
  ).toFixed(2);

  let perUnit = product.unit[unitSelected];
  if (perUnit.endsWith('es')) {
    perUnit = perUnit.slice(0, -2);
  } else if (perUnit.endsWith('s')) {
    perUnit = perUnit.slice(0, -1);
  }

  return (
    <tr>
      <td>{product.name}</td>
      {product.editedCart ? (
        <td>
          {product.editedCart * productMultiplier +
            ' ' +
            product.unit[unitSelected]}
        </td>
      ) : (
        <td>
          {(product.cart * productMultiplier).toFixed(0) +
            ' ' +
            product.unit[unitSelected]}
        </td>
      )}
      <td>{'$' + Number(product.price[unitSelected]) + '/' + perUnit}</td>
      <td>{'$' + total_price}</td>
      {removeFromCart && (
        <td>
          <button onClick={() => removeFromCart({ product })}>Remove</button>
        </td>
      )}
    </tr>
  );
}
