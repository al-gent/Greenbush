import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import styles from '/styles/demo.module.css';
import OrderForm from '../components/orderForm';
import { useState } from 'react';
import Layout from '../components/Layout';
import Dash from '../components/dash';
import DashboardHelp from '../components/dashboard-help';

export default function Demo() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.spreadCards}>
      <Head>
        <title>Farmhand Demo</title>
      </Head>
      <div className={styles.imAnApp}>
        <h1> Hi! I'm a free app. </h1>
        <h2>I help small farms* sell wholesale produce.</h2>
        <div>
          <div>
            <h3>I can:</h3>
            <ul>Keep track of inventory.</ul>
            <ul>
              Give customers an elegent and functional ordering experience.
            </ul>
            <ul>Keep track of orders.</ul>
            <ul>Send emails to the farm when orders come in. </ul>
            <ul>Send invoices to customers when orders go out.</ul>
            <ul>
              Aggregate produce from all orders into one list, so you know what
              to harvest.
            </ul>
            <ul>Create graphs & tables to show buying trends.</ul>
            <ul>
              Make life easier for hardworking farmers by automating boring
              tasks.{' '}
            </ul>
            <ul style={{ fontWeight: 'bold' }}>
              Volunteer for your farm too!{' '}
            </ul>
            <a href="mailto:94gent@gmail.com?subject=Hook me up with that sweet sweet app">
              <button>Email Adam</button>
            </a>
            <Link href="./signup">
              <button>Farmer Signup</button>
            </Link>
          </div>
        </div>
        <p style={{ fontSize: '10px' }}>
          *currently helping only one farm - but I have big dreams*
        </p>
      </div>

      <div className={styles.orderFormComments}>
        <h2>This is what a buyer sees - make an order & see how it works!</h2>
        <ul>When a purchase is made, your inventory updates automatically.</ul>
        <ul>
          Some products, like ground cherries, can be bought by the pound, or by
          the pint.
        </ul>
        <ul>When an order is submitted, an email goes to the farm.</ul>
      </div>
      <div className={styles.customerInterface}>
        <div>
          <OrderForm
            client="demo"
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            farmer_email="94gent@gmail.com"
          />
        </div>
      </div>
      {/* <div className={styles.dashComments}>
        <h2>Farmer's Dashboard Features</h2>
        <div className={styles.spreadPoints}>
        <div>
          <h3>New Orders</h3>
          <ul>View all pending orders awaiting completion.</ul>
          <ul>Delete an order.</ul>
          <ul>
            Mark orders as confirmed, automatically sending a confirmation email
            to clients.
          </ul>
          <ul>Mark orders as completed.</ul>
          <ul>Edit the quantity for delivery.</ul>
        </div>
        <div>
          <h3>Edit Wholesale</h3>
          <ul>Update available quantitites.</ul>
          <ul>Add new products, delete products, or adjust prices.</ul>
          <ul>Update farmer's note displayed on the order form.</ul>
          <ul>
            Maybe you sell cilantro or green onions by the pound and by the
            bunch?
          </ul>
          <ul>
            Each item has a primary price/unit, with an option to add a
            secondary price/unit.{' '}
          </ul>
        </div>
        <div>
          <div>
            <h3>Completed Orders</h3>
            <ul>View all completed orders</ul>
            <ul>Change order status if necessary</ul>
            <h3>Harvest List</h3>
            <ul>
              Items from all new orders are aggregated here for easy harvesting.
            </ul>
          </div>
        </div>
        </div>
      </div> */}

      <h2>This is what the farmer sees. Check it out!</h2>
      <div className={styles.imAnApp}>
        <Dash client="demo" isLoading={isLoading} setIsLoading={setIsLoading} />
        <DashboardHelp />
      </div>
    </div>
  );
}
