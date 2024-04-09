import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/index.module.css';
import OrderForm from './demo/wholesale_demo';
import ReviewOrders from './demo/review-orders_demo';
import EditWholesale from './demo/edit-wholesale_demo';
import SocialLinks from '../components/social_links';
import { useState } from 'react';
import Contact from '../components/contact';
import CommentBox from '../components/comments';
import HMScale from './hmscale';

export default function Home() {
  const [viewPS, setViewPS] = useState(false);
  const [viewOF, setViewOF] = useState(false);
  const [reload, setReload] = useState(0);
  const [updateOrders, setUpdateOrders] = useState(0);
  return (
    <div className={styles.parent}>
      <div className={styles.infoCard}>
        <h1> Adam Gent </h1>
        <Image
          className={styles.headshot}
          src="/images/IMG_5495.jpg"
          height={1800}
          width={1800}
          alt="Headshot"
        />
        <SocialLinks />
        <h3>Creator - Educator</h3>
        <p> Learning new technologies.</p>
        <p>Working on interesting problems.</p>
      </div>{' '}
      <div className={styles.storyCard}>
        <Link href="http://www.adamlgent.com/hmscale">
          <h2>Happiness Vs Meaning Scale</h2>
        </Link>
      </div>
      <div onClick={() => setViewPS(!viewPS)} className={styles.storyCard}>
        <h2>Project Spotlight</h2>
        {viewPS && (
          <div className={styles.parent}>
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
              My client, an organic farmer, was updating his inventory by hand
              and getting frustrated. It was time consuming and error prone.
            </p>
            <p>
              I built him a tool that allows him to update his inventory in real
              time.
            </p>
            <p>
              Feel free to play around with it - everything works in this demo
              version.
            </p>
          </div>
        )}
      </div>
      {viewPS && viewOF && (
        <OrderForm
          reload={reload}
          setReload={setReload}
          updateOrders={updateOrders}
          setUpdateOrders={setUpdateOrders}
        />
      )}
      {viewPS ? (
        viewOF ? null : (
          <button onClick={() => setViewOF(!viewOF)}>
            <h2>View Order Form </h2>
          </button>
        )
      ) : null}
      {viewPS && viewOF && (
        <div className={styles.storyCard}>
          <h1>Farmer's Dashboard</h1>
          <ReviewOrders
            reload={reload}
            setReload={setReload}
            updateOrders={updateOrders}
            setUpdateOrders={setUpdateOrders}
          ></ReviewOrders>
        </div>
      )}
    </div>
  );
}
