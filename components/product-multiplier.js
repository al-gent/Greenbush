export default function productMultiplier(product) {
  const productMultiplier = product.unitratio
    ? product.unitratio
    : (product.price[0] / product.price[1]).toFixed(2);
  return parseFloat(productMultiplier);
}
