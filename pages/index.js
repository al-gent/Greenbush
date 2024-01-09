import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import styles from '/styles/index.module.css';
import Contact from '../components/contact';

export default function Home() {
  return (
    <div className={styles.parent}>
      <h1> Adam L Gent </h1>
      <Image
        className={styles.headshot}
        src="/images/headshot.jpg"
        height={1300}
        width={1300}
        alt="Headshot"
      />
      <h2> Software Engineer </h2>
      <h3> Full Stack Developer </h3>
      <Contact> </Contact>
    </div>
  );
}
