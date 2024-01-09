import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import styles from '/components/layout.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.wideImage}>
        <Image
          className={styles.wideimage}
          priority
          src="/images/aerial_photo.jpg"
          width={2048}
          height={1364}
          alt="aerial photo of greenbush"
        />
      </div>
      <div className={styles.imageTextContainer}>
        <div>
          <Image
            className={styles.imageleft}
            src="/images/peas.jpg"
            width={1350}
            height={1800}
            alt="peas"
          />
        </div>
        <div className={styles.textRight}>
          <h2>Fresh Nourishing Foods</h2>
          <p>
            Sign up now for a Community Supported Agriculture (CSA) share to
            receive a weekly box of vegetables straight to your door.
          </p>
          <h2>Invigorating Natural Medicines</h2>
          <p>
            {' '}
            Get in touch to buy quality bulk culinary or medicinal herbs for
            your meals, teas, tinctures or salves grown with organic practices
            and loving guidance.
          </p>
          <Link href="./CSA-fall-share">Sign up for a CSA share</Link>
        </div>
      </div>
      <div className={styles.imageTextContainer}>
        <div className={styles.textLeft}>
          <h2> Join Our Community</h2>
          <p>
            {' '}
            There’s a bunch of ways to come out and volunteer, labor trade or
            donate to the cause ~ come hang with us!
          </p>
          <button>Get Involved</button>
        </div>
        <div>
          <Image
            className={styles.imageright}
            src="/images/farm_rows.jpg"
            width={1800}
            height={1201}
            alt="farm_rows"
          />
        </div>
      </div>
      <div className={styles.imageTextContainer}>
        <div>
          <Image
            className={styles.imageleft}
            src="/images/barn.jpg"
            width={1800}
            height={1350}
            alt="red barn in front of blue skies"
          />
          <p> photo credit: Adam Cain, Vibrant Focus Photography</p>
        </div>
        <div className={styles.textRight}>
          <h2>Our Mission</h2>
          <p>
            To create a sustainable farming community rooted in loving and
            nurturing our relationships with each other and the land
          </p>
          <h2>Our Vision</h2>
          <p>
            {' '}
            We are cultivating a space of joy and possibility where we live with
            intention, honor our differences and work together in reciprocal
            connection with the Earth
          </p>
          <h2> Help our vision come alive</h2>
          <button>Donate </button>
        </div>
      </div>
    </Layout>
  );
}
