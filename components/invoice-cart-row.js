export default function CartRow({ product, View, Text, styles }) {
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
    <View style={styles.tableRow}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{product.name}</Text>
      </View>
      {product.editedCart ? (
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>
            {' '}
            {product.editedCart * productMultiplier +
              ' ' +
              product.unit[unitSelected]}
          </Text>
        </View>
      ) : (
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>
            {' '}
            {(product.cart * productMultiplier).toFixed(0) +
              ' ' +
              product.unit[unitSelected]}
          </Text>
        </View>
      )}
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>
          {'$' + Number(product.price[unitSelected]).toFixed(2) + '/' + perUnit}
        </Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>{'$' + total_price}</Text>
      </View>
    </View>
  );
}
