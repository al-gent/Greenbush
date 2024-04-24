import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '/styles/index.module.css';
import EditWholesale from '../components/edit-wholesale';
import ReviewOrders from '../components/review-orders';
import CompletedOrders from './completed-orders';
import AllNewItems from './all-new-items';

export default function Dash({
  dataAPI,
  farmersNotesAPI,
  deleteProductAPI,
  addProductAPI,
  updateProductAPI,
  updateQuantityAPI,
  addNoteAPI,
  getOrdersAPI,
  getCompletedOrdersAPI,
  updateOrdersAPI,
  deleteOrdersAPI,
  updateOrderStatusAPI,
  isLoading,
  setIsLoading,
}) {
  const [viewEditWholesale, setViewEditWholesale] = useState(false);
  const [viewNewOrders, setViewNewOrders] = useState(false);
  const [viewAllItems, setViewAllItems] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);

  return (
    <div>
      <h1>Farmer's Dashboard</h1>
      <div className={styles.dash}>
        <button onClick={() => setViewNewOrders(!viewNewOrders)}>
          {viewNewOrders ? `Hide New Orders` : `View New Orders`}
        </button>
        <button onClick={() => setViewEditWholesale(!viewEditWholesale)}>
          {viewEditWholesale ? `Hide Edit Wholesale` : `View Edit Wholesale`}
        </button>
      </div>
      <div className={styles.dash}>
        <button onClick={() => setViewCompleted(!viewCompleted)}>
          {viewCompleted ? `Hide Completed Orders` : `View Completed Orders`}
        </button>
        <button onClick={() => setViewAllItems(!viewAllItems)}>
          {viewAllItems ? `Hide List of All Items` : `View List of All Items`}
        </button>
      </div>
      {viewNewOrders && (
        <ReviewOrders
          getOrdersAPI={getOrdersAPI}
          updateOrdersAPI={updateOrdersAPI}
          deleteOrdersAPI={deleteOrdersAPI}
          updateOrderStatusAPI={updateOrderStatusAPI}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {viewAllItems && (
        <AllNewItems getOrdersAPI={getOrdersAPI} setIsLoading={setIsLoading} />
      )}
      {viewCompleted && (
        <CompletedOrders
          getCompletedOrdersAPI={getCompletedOrdersAPI}
          setIsLoading={setIsLoading}
        />
      )}
      {viewEditWholesale && (
        <EditWholesale
          dataAPI={dataAPI}
          farmersNotesAPI={farmersNotesAPI}
          deleteProductAPI={deleteProductAPI}
          addProductAPI={addProductAPI}
          updateProductAPI={updateProductAPI}
          updateQuantityAPI={updateQuantityAPI}
          addNoteAPI={addNoteAPI}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
