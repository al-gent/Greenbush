import Layout from '../components/Layout';
import styles from '/components/layout.module.css';
import Image from 'next/image';

export default function () {
  const product_list = require('/home/adam/react/nextjs-blog/pages/product_list.json');

  for (const product of product_list) {
    const price = product['Price per Unit'].replace('$', ''); // Remove the dollar sign
    console.log(price);
  }
  const rows = product_list.map((product) => (
    <p>
      {product.Description} {product['Price per Unit'].replace('$', '')},
      {product.Unit}, {product.Quantity}{' '}
    </p>
  ));
  return (
    <Layout>
      <div>
        <h1>Products</h1>

        {rows}
      </div>
    </Layout>
  );
}
