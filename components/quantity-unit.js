export default function QuantityUnit(product, unitSelected) {
  const QU = unitSelected ? (
    <>
      {product.quantity} {product.unit[unitSelected]}{' '}
    </>
  ) : (
    <>
      {product.quantity * product.productMultiplier}{' '}
      {product.unit[unitSelected]}
    </>
  );
  return QU;
}
