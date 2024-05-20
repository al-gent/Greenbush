export default function UnitDropdown({
  product,
  setUnitSelected,
  setInvalidQuant,
  setQuantityDesired,
  productMultiplier,
}) {
  if (product.unit.length > 1) {
    return (
      <td>
        <select
          onChange={(e) => {
            setInvalidQuant(false);
            setUnitSelected(e.target.selectedIndex);
            setQuantityDesired('');
          }}
        >
          {product.unit.map((unit, index) => {
            const value = index
              ? Math.round(productMultiplier * product.quantity)
              : Math.round(product.quantity);
            return (
              <option key={unit + index} value={value}>
                {' '}
                {value} {unit}
              </option>
            );
          })}
        </select>
      </td>
    );
  } else {
    return (
      <td style={{ padding: '0.3rem' }}>
        {product.quantity} {product.unit}
      </td>
    );
  }
}
