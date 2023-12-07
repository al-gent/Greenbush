import styles from './layout.module.css'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

const name= 'Greenbush Growing Cooperative';
export const siteTitle = 'XXGreenbushXX';


export default function Layout({ children, home }) {
    return <div className={styles.container}>
        <Head>
            <title>{siteTitle}</title>

        </Head>
        <header className={styles.header}>
                <Image className={styles.logo}
                    priority
                    src="/images/Untitled.png"
                    height={1500}
                    width={1159}
                    alt="cabagelogotransparent"
                />
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
            <Image className={styles.loading}
                    priority
                    src="/images/cabbagelogotransparent.png"
                    height={2500}
                    width={2323}
                    alt="cabagelogotransparent"
                />
        </footer>
    <p className={styles.footerText}> Website made with love by <Link href='https://github.com/al-gent'>Adam</Link></p>

    </div>
}