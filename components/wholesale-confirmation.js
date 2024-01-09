import Layout from './Layout';
import OrderSummary from '../lib/order-summary';
import { useState, useEffect } from 'react';

let data;
if (typeof window !== 'undefined') {
  data = JSON.parse(
    decodeURIComponent(new URLSearchParams(window.location.search).get('data')),
  );
}

export default async function confirmation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Layout>
      <h1>Wholesale Order Recieved</h1>
      {isClient ? (
        <OrderSummary order={data} />
      ) : (
        <h1>'only display prerendered'</h1>
      )}
      <ul></ul>
    </Layout>
  );
}
