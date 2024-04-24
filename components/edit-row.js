export default function EditRow({ product, setQuantity }) {
  let productMultiplier = 1;
  const unitSelected = product.unitSelected || 0;
  unitSelected === 0
    ? (productMultiplier = 1)
    : (productMultiplier = product.price[0] / product.price[1]);
  const cart = Math.round(product.cart * productMultiplier);
  const total_price = Math.round(product.cart * product.price[0]).toFixed(2);
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        {cart} {product.unit[unitSelected]}{' '}
      </td>
      <td>
        <input
          size="4"
          type="tel"
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
