export default function EditOrderTableRow({ product, setQuantity }) {
  const unitSelected = product.unitSelected;

  let productMultiplier;
  product.unitSelected
    ? (productMultiplier = product.unitratio)
    : (productMultiplier = 1);

  const cart = product.editedCart
    ? product.editedCart * productMultiplier
    : product.cart * productMultiplier;
  console.log(cart);

  const total_price = Math.round(product.cart * product.price[0]).toFixed(2);
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        {cart.toFixed(0)} {product.unit[unitSelected]}
      </td>
      <td>
        <input
          size="4"
          type="text"
          placeholder={cart}
          value={product.editedCart || ''}
          onChange={(e) => {
            setQuantity(e.target.value, product.id);
          }}
        ></input>
      </td>
      <td>{'$' + product.price[unitSelected]}</td>
      <td>{'$' + total_price}</td>
    </tr>
  );
}
