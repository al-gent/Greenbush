import styles from '../styles/wholesale.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

export default function Layout({ children, isLoading, props, siteTitle }) {
  return (
    <div className={styles.centerText}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.nav}>{props}</div>
        <Image
          className={styles.logo}
          priority
          src="/images/Untitled.png"
          height={1500}
          width={1159}
          alt="Logo"
        />
      </header>
      <main>{children}</main>
      <footer className={styles.header}>
        <Image
          className={isLoading ? styles.loading : styles.logo}
          priority
          src="/images/cabbagelogotransparent.png"
          height={2500}
          width={2323}
          alt="cabagelogotransparent"
        />
      </footer>
      <p className={styles.footerText}>
        {' '}
        Website made with love by{' '}
        <Link href="https://github.com/al-gent">Adam</Link>
      </p>
    </div>
  );
}
