import CartRow from './invoice-cart-row';

export default function InvoiceTable({
  products,
  View,
  Text,
  styles,
  subtotal,
  setSubtotal,
}) {
  if (typeof products[0] == 'string') {
    products = products.map((product) => JSON.parse(product));
  }

  function productMultiplier(product) {
    return product.unitSelected ? product.unitratio : 1;
  }

  setSubtotal(
    products
      .reduce((total, product) => {
        return (
          total +
          (product.editedCart
            ? product.editedCart
            : product.cart * productMultiplier(product)) *
            product.price[product.unitSelected]
        );
      }, 0)
      .toFixed(2),
  );

  const rows = products
    .filter((product) => product.cart > 0)
    .filter((product) => product.editedCart != 0)
    .map((product) => (
      <CartRow
        key={product.id}
        product={product}
        View={View}
        Text={Text}
        styles={styles}
      />
    ));
  return (
    <View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Price Per Unit</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCell}>Total Price</Text>
          </View>
        </View>
        {rows}
      </View>
    </View>
  );
}
