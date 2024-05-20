export default function CartRow({ product }) {
  const unitSelected = product.unitSelected;
  let productMultiplier;
  unitSelected
    ? (productMultiplier =
        product.unitratio || product.price[0] / product.price[1])
    : (productMultiplier = 1);
  //the || statement should make it so that past orders that weren't sent along with a unitRatio dont break

  let perUnit = product.unit[unitSelected];
  if (perUnit.endsWith('es')) {
    perUnit = perUnit.slice(0, -2);
  } else if (perUnit.endsWith('s')) {
    perUnit = perUnit.slice(0, -1);
  }

  //when the cart is edited for a product that is in it's secondary unit,
  // that quantity is no longer in the base unit anymore so
  //we dont need to multiply it by the product multiplier

  const cart = product.editedCart
    ? product.editedCart
    : (product.cart * productMultiplier).toFixed(0);

  const total_price = (cart * product.price[unitSelected]).toFixed(2);
  return (
    <tr>
      <td>{product.name}</td>
      {product.editedCart ? (
        <td>
          <del>{product.cart * productMultiplier}</del>
          {' ' + product.editedCart + ' ' + product.unit[unitSelected]}
        </td>
      ) : (
        <td>{cart + ' ' + product.unit[unitSelected]} </td>
      )}
      <td>{`$${product.price[unitSelected]}/${perUnit}`}</td>
      <td>{'$' + total_price}</td>
    </tr>
  );
}
