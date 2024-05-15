import React, { useState } from 'react';
import styles from '/styles/questions.module.css';

export default function DashboardHelp() {
  const [haveQuestions, setHaveQuestions] = useState(false);
  const [viewNew, setViewNew] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const [viewTH, setViewTH] = useState(false);

  return (
    <div className={styles.questions}>
      <div>
        <button onClick={(e) => setHaveQuestions(!haveQuestions)}>
          Questions?
        </button>
      </div>
      {haveQuestions && (
        <div className={styles.questionBoxes}>
          <p>Click on a button to learn more about that feature</p>
          <button onClick={(e) => setViewNew(!viewNew)}>New Orders</button>
          {viewNew && (
            <div>
              <p>All your new orders will show up here.</p>
              <p>
                When you mark an order as confirmed, a confirmation email is
                sent automatically to the buyer.
              </p>
              <p>
                When you mark orders as completed, they disappear from this
                list.
              </p>
              <p>
                If you cannot deliver the quantity they ordered, your can edit
                the quantity here.
              </p>
            </div>
          )}
          <button onClick={(e) => setViewEdit(!viewEdit)}>
            Edit Wholesale
          </button>
          {viewEdit && (
            <div>
              <p>Add new products, delete products, or adjust prices.</p>
              <p>Update available quantitites.</p>
              <p>Update farmer's note displayed on the order form.</p>
              <p>
                Maybe you sell cilantro or green onions by the pound and by the
                bunch?
              </p>
              <p>
                Each item has a primary price/unit, with an option to add a
                secondary price/unit.{' '}
              </p>
              <p>The quantity is always in terms of the primary unit.</p>
            </div>
          )}
          <div>
            <button onClick={(e) => setViewCompleted(!viewCompleted)}>
              Completed Orders
            </button>
            {viewCompleted && (
              <div>
                <p>View all completed orders</p>
                <p>Change order status if necessary</p>
              </div>
            )}
            <button onClick={(e) => setViewTH(!viewTH)}>Harvest List</button>
            {viewTH && (
              <div>
                <p>
                  Items from all new orders are aggregated here for so you can
                  easily see what you need to harvest.
                </p>
              </div>
            )}
            <p>Still have questions? </p>
            <a href="mailto:94gent@gmail.com?subject=Help! I'm confused!">
              <button>Email Adam</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
