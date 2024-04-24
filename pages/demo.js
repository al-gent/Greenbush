import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/index.module.css';
import OrderForm from '../components/orderForm';
import { useState } from 'react';
import Layout from '../components/Layout';
import Dash from '../components/dash';
export default function Demo() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className={styles.infoCard}>
        <h1>Customer Interface</h1>
        <Layout isLoading={isLoading}>
          <OrderForm
            dataAPI="/api/data_demo"
            farmersNotesAPI="/api/farmers-notes_demo"
            updateQuantitiesAPI="/api/update-quantities_demo"
            placeOrderAPI="/api/place-order_demo"
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            farmer_email="94gent@gmail.com"
          />
        </Layout>
      </div>
      <div>
        <Dash
          getOrdersAPI="/api/get-orders_demo"
          getCompletedOrdersAPI="/api/get-completed-orders_demo"
          updateOrdersAPI="/api/update-orders_demo"
          deleteOrdersAPI="/api/delete-order_demo"
          updateOrderStatusAPI="/api/update-order-status_demo"
          dataAPI="/api/data_demo"
          farmersNotesAPI="/api/farmers-notes_demo"
          deleteProductAPI="/api/delete-product_demo"
          addProductAPI="/api/add-product_demo"
          updateProductAPI="/api/update-product_demo"
          updateQuantityAPI="/api/update-quantity_demo"
          addNoteAPI="/api/add-note_demo"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
