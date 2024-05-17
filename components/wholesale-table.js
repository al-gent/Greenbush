export default function WholesaleTable({ products }) {
  const productsInStock = products
    .filter((product) => product.quantity > 0)
    .map((product) => {
      let perUnit = product.unit[0];
      if (perUnit.endsWith('es')) {
        perUnit = perUnit.slice(0, -2);
      } else if (perUnit.endsWith('s')) {
        perUnit = perUnit.slice(0, -1);
      }
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>
            {product.quantity} {product.unit[0]}
          </td>
          <td>{'$' + product.price[0] + '/' + perUnit}</td>
        </tr>
      );
    });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{productsInStock}</tbody>
      </table>
    </div>
  );
}
