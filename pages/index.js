import Image from 'next/image';
import styles from '/styles/index.module.css';
import OrderingForm from './demo/wholesale_demo';
import ReviewOrders from './demo/review-orders_demo';
import EditWholesale from './demo/edit-wholesale_demo';
import SocialLinks from '../components/social_links';
import { useState } from 'react';
import Contact from '../components/contact';
import CommentBox from '../components/comments';

export default function Home() {
  const [reload, setReload] = useState(0);
  const [updateOrders, setUpdateOrders] = useState(0);
  return (
    <div className={styles.parent}>
      <div className={styles.infoCard}>
        <h1> Adam L. Gent </h1>
        <Image
          className={styles.headshot}
          src="/images/adam_knight.jpg"
          height={1500}
          width={1500}
          alt="Headshot"
        />
        <SocialLinks></SocialLinks>
        <h2>Freelance Software Developer </h2>
        <h3>Currently seeking new opportunities </h3>
      </div>
      <h2>Project Spotlight: Wholesale Order Form</h2>
      <div className={styles.storyCard}>
        <h3>
          My client, an organic farmer, was having a hard time managing his
          inventory.
        </h3>
        <h4>
          When new orders came in, he had to update his inventory by hand. This
          was time consuming and error prone.
        </h4>
        <h4> So I built this tool to help him manage his inventory.</h4>
        <h4>
          Go ahead and pretend to buy some produce & you can see how it works.
        </h4>
      </div>
      <OrderingForm
        reload={reload}
        setReload={setReload}
        updateOrders={updateOrders}
        setUpdateOrders={setUpdateOrders}
      ></OrderingForm>
      <div className={styles.storyCard}>
        <h4>
          Since I already built the ordering form, I added a way for him to
          review his orders.
        </h4>
        <h4>
          If you made an order, you should be able to see it in the table below.
        </h4>
        <h4>
          In this demo version, it would have been easier to update everything
          using state. But just so you could see how it works IRL, I set up a
          demo database.
        </h4>
        <h4>
          In the live version, the customer gets a confirmation email when the
          farmer confirms the order.
        </h4>
      </div>
      <ReviewOrders
        reload={reload}
        setReload={setReload}
        updateOrders={updateOrders}
        setUpdateOrders={setUpdateOrders}
      ></ReviewOrders>
      <div className={styles.storyCard}>
        <h4>
          Obviously, my client needed a way to update his inventory. So I built
          this tool for him to do that.
        </h4>
      </div>
      <EditWholesale reload={reload} setReload={setReload}></EditWholesale>
      <div className={styles.storyCard}>
        <h4>Can you think of any good features I missed? Let me know!</h4>
      </div>
      <CommentBox></CommentBox>
    </div>
  );
}
