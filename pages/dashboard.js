import Dash from '../components/dash';
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dash
      getOrdersAPI="/api/get-orders"
      getCompletedOrdersAPI="/api/get-completed-orders"
      updateOrdersAPI="/api/update-orders"
      deleteOrdersAPI="/api/delete-order"
      updateOrderStatusAPI="/api/update-order-status"
      dataAPI="/api/data"
      farmersNotesAPI="/api/farmers-notes"
      deleteProductAPI="/api/delete-product"
      addProductAPI="/api/add-product"
      updateProductAPI="/api/update-product"
      updateQuantityAPI="/api/update-quantity"
      addNoteAPI="/api/add-note"
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
}
