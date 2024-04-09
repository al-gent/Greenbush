import Image from 'next/image';
import Link from 'next/link';
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
          src="/images/IMG_5495.jpg"
          height={1800}
          width={1800}
          alt="Headshot"
        />
        <SocialLinks></SocialLinks>
        <h3>Developer - Educator - Creative</h3>
        <p> Learning new technologies & looking for interesting problems.</p>
        <p> </p>
        {/* <p>
          View my resume{' '}
          <Link href="/resume.pdf" target="_blank">
            here
          </Link>
          .
        </p> */}
      </div>
      <div className={styles.storyCard}>
        <h2>Project Spotlight: Wholesale Order Form</h2>
        <Link href="http://www.greenbushgrowingcoop.com" target="_blank">
          <Image
            className={styles.headshot}
            src="/images/Untitled.png"
            height={1500}
            width={1500}
            alt="Headshot"
          />
        </Link>
        <p>
          My client, an organic farmer, was having a hard time managing his
          inventory.
        </p>
        <p>
          When new orders came in, he had to update his inventory by hand. This
          was time consuming and error prone.
        </p>
        <p>
          I built him a tool that allows him to update his inventory in real
          time.
        </p>
        <p>
          Go ahead and pretend to buy some produce & you can see how it works.
        </p>
      </div>
      <OrderingForm
        reload={reload}
        setReload={setReload}
        updateOrders={updateOrders}
        setUpdateOrders={setUpdateOrders}
      ></OrderingForm>
      <div className={styles.storyCard}>
        <p>
          Since I already built the ordering form, I added a way for him to
          review his orders.
        </p>
        <p>
          If you made an order, you should be able to see it in the table below.
        </p>
        <p>
          In this demo version, it would have been easier to update everything
          using state. But just so you could see how it works IRL, I set up a
          demo database.
        </p>
        <p>
          In the live version, the customer gets a confirmation email when the
          farmer confirms the order.
        </p>
      </div>
      <ReviewOrders
        reload={reload}
        setReload={setReload}
        updateOrders={updateOrders}
        setUpdateOrders={setUpdateOrders}
      ></ReviewOrders>
      <div className={styles.storyCard}>
        <p>
          Obviously, my client needed a way to update his inventory. So I built
          this tool for him to do that.
        </p>
      </div>
      <EditWholesale reload={reload} setReload={setReload}></EditWholesale>
      <div className={styles.storyCard}>
        <p>Can you think of any good features I missed? Let me know!</p>
      </div>
      <CommentBox></CommentBox>
    </div>
  );
}
