import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '/styles/index.module.css';
import EditWholesale from '../components/edit-wholesale';
import ReviewOrders from '../components/review-orders';
import CompletedOrders from './completed-orders';
import AllNewItems from './all-new-items';
import FarmerInfo from './farmerinfo';
// import AnalyzeSales from './analytics';

export default function Dash({ client, isLoading, setIsLoading }) {
  const [viewEditWholesale, setViewEditWholesale] = useState(false);
  const [viewNewOrders, setViewNewOrders] = useState(false);
  const [viewAllItems, setViewAllItems] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  // const [viewAnalytics, setViewAnalytics] = useState(false);
  return (
    <div>
      <FarmerInfo client={client} setIsLoading={setIsLoading} />
      <div className={styles.dash}>
        <button onClick={() => setViewNewOrders(!viewNewOrders)}>
          {viewNewOrders ? `Hide New Orders` : `New Orders`}
        </button>
        <button onClick={() => setViewEditWholesale(!viewEditWholesale)}>
          {viewEditWholesale ? `Hide Edit Wholesale` : `Edit Wholesale`}
        </button>
      </div>
      <div className={styles.dash}>
        <button onClick={() => setViewCompleted(!viewCompleted)}>
          {viewCompleted ? `Hide Completed Orders` : `Completed Orders`}
        </button>
        <button onClick={() => setViewAllItems(!viewAllItems)}>
          {viewAllItems ? `Hide Harvest List` : `Harvest List`}
        </button>
      </div>
      {/* <div className={styles.dash}>
        <button onClick={() => setViewAnalytics(!viewAnalytics)}>
          {viewAnalytics ? `Hide Analytics` : `Analytics`}
        </button>
      </div> */}
      {viewNewOrders && (
        <ReviewOrders
          client={client}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {viewAllItems && (
        <AllNewItems client={client} setIsLoading={setIsLoading} />
      )}
      {viewCompleted && (
        <CompletedOrders client={client} setIsLoading={setIsLoading} />
      )}
      {viewEditWholesale && (
        <EditWholesale
          client={client}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {/* {viewAnalytics && <AnalyzeSales client={client} />} */}
    </div>
  );
}
