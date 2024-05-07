import OrderForm from '../components/orderForm';
import Layout from '../components/Layout';
import React, { useState } from 'react';

export default function Wholesale() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Layout isLoading={isLoading}>
      <OrderForm
        client="GGC"
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        farmer_email="dgent570@outlook.com"
      />
    </Layout>
  );
}
