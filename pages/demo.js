import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/demo.module.css';
import OrderForm from '../components/orderForm';
import { useState } from 'react';
import Layout from '../components/Layout';
import Dash from '../components/dash';
export default function Demo() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.spreadCards}>
      <div className={styles.imAnApp}>
        <h1> Hi! I'm an app. </h1>
        <h2>I help small farms* sell wholesale produce.</h2>
        <div className={styles.spreadPoints}>
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
            <ul>
              Make life easier for hardworking farmers by automating boring
              tasks.{' '}
            </ul>
          </div>
          <div>
            <h3>I'd like to be able to: </h3>
            <ul>
              Predict what veggies will be listed for sale at a given time of
              the season.
            </ul>
            <ul>Create pretty graphs that buying show trends.</ul>
            <ul>Accept payment</ul>
            <ul>Have the option for buyers to sign in</ul>
            <ul style={{ fontWeight: 'bold' }}>
              Work for your farm too!{' '}
              <Link href="">
                <button>Email Adam</button>
              </Link>
            </ul>
          </div>
        </div>
        <p style={{ fontSize: '10px' }}>
          *currently helping only one farm - but I have big dreams*
        </p>
      </div>

      <div className={styles.orderFormComments}>
        <h2>Clients order veggies here.</h2>
        <h3>Cool features:</h3>
        <ul>When a purchase is made, your inventory updates automatically.</ul>
        <ul>
          Some products, like ground cherries, can be bought by the pound, or by
          the pint.
        </ul>
        <ul>When an order is submitted, an email goes to the farm.</ul>
        <h2>Play around - make an order & see how it works!</h2>
      </div>
      <div className={styles.customerInterface}>
        <div>
          <OrderForm
            dataAPI="/api/data_demo"
            farmersNotesAPI="/api/farmers-notes_demo"
            updateQuantitiesAPI="/api/update-quantities_demo"
            placeOrderAPI="/api/place-order_demo"
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            farmer_email="94gent@gmail.com"
          />
        </div>
      </div>
      <div className={styles.dashComments}>
        <h2>Farmer's Dashboard Features</h2>
        <div className={styles.spreadPoints}>
          <div>
            <h3>View New Orders</h3>
            <ul>View all the orders that haven't been completed yet</ul>
            <ul>Delete an order</ul>
            <ul>
              Mark order as confirmed - confirmation email will be sent to
              client automatically.
            </ul>
            <ul>Mark order as completed</ul>
            <ul>Edit the quantity that will be delivered</ul>
          </div>
          <div>
            <h3>Edit Wholesale</h3>
            <ul>Update the quantities available</ul>
            <ul>Add new products, delete products, or adjust prices</ul>
            <ul>Add a farmer's note that is displayed on your order form</ul>
            <ul>
              Each item has a primary price/unit, with the option to add a
              secondary price/unit{' '}
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h3>View Completed Orders</h3>
              <ul>See all completed orders</ul>
              <ul>Change order status if necessary</ul>
              <h3>List of All Items</h3>
              <ul>
                Items from all new orders are aggregated here - making it easy
                to know what to harvest that day.
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.farmersDash}>
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
