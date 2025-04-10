import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '/styles/index.module.css';
import EditWholesale from '../components/edit-wholesale';
import ReviewOrders from '../components/review-orders';
import CompletedOrders from './completed-orders';
import TodaysHarvest from './todays-harvest';
import FarmerInfo from './farmerinfo';
import UpdateBuyers from './update-buyers';

// import AnalyzeSales from './analytics';

export default function Dash({ client, isLoading, setIsLoading }) {
  const [viewEditWholesale, setViewEditWholesale] = useState(false);
  const [viewNewOrders, setViewNewOrders] = useState(false);
  const [viewTodaysHarvest, setViewTodaysHarvest] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [newOrderCount, setNewOrderCount] = useState('');
  const [viewUpdateBuyers, setViewUpdateBuyers] = useState(false);

  // const [viewAnalytics, setViewAnalytics] = useState(false);
  useEffect(() => {
    const url = `/api/count-new-orders?client=${encodeURIComponent(client)}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNewOrderCount(data);
      })
      .catch((error) => console.error('Error:', error));
  }, [viewNewOrders, viewCompleted]);

  return (
    <div>
      <FarmerInfo client={client} setIsLoading={setIsLoading} />
      <div className={styles.dash}>
        <button
          onClick={() => setViewNewOrders(!viewNewOrders)}
          style={viewNewOrders ? { backgroundColor: 'red' } : {}}
        >
          {viewNewOrders
            ? `Hide New Orders`
            : `${newOrderCount} New Order${newOrderCount == 1 ? ' ' : 's'}`}
        </button>
        <button
          onClick={() => setViewEditWholesale(!viewEditWholesale)}
          style={viewEditWholesale ? { backgroundColor: 'green' } : {}}
        >
          {viewEditWholesale ? `Hide Edit Wholesale` : `Edit Wholesale`}
        </button>
      </div>
      {viewNewOrders && (
        <ReviewOrders
          client={client}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {viewEditWholesale && (
        <EditWholesale
          client={client}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <div className={styles.dash}>
        <button
          onClick={() => setViewCompleted(!viewCompleted)}
          style={viewCompleted ? { backgroundColor: 'green' } : {}}
          >
          {viewCompleted ? `Hide Completed Orders` : `Completed Orders`}
        </button>
        <button
          onClick={() => setViewTodaysHarvest(!viewTodaysHarvest)}
          style={viewTodaysHarvest ? { backgroundColor: 'red' } : {}}
          >
          {viewTodaysHarvest ? `Hide Today's Harvest` : `Today's Harvest`}
        </button>
      </div>
          {viewTodaysHarvest && (
            <TodaysHarvest client={client} setIsLoading={setIsLoading} />
          )}
          {viewCompleted && (
            <CompletedOrders client={client} setIsLoading={setIsLoading} />
          )}
      {/* <div className={styles.dash}>
        <button onClick={() => setViewAnalytics(!viewAnalytics)}>
          {viewAnalytics ? `Hide Analytics` : `Analytics`}
        </button>
      </div> */}
      <div className={styles.dash}>
        <button
          onClick={() => setViewUpdateBuyers(!viewUpdateBuyers)}
          style={viewUpdateBuyers ? { backgroundColor: 'purple' } : {}}
          >
          {viewUpdateBuyers ? `Hide Update Buyers` : `Update Buyers`}
        </button>
      </div>
          {viewUpdateBuyers && <UpdateBuyers client={client} />}
      {/* {viewAnalytics && <AnalyzeSales client={client} />} */}
    </div>
  );
}
