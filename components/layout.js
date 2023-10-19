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
                <>
                <Image className={styles.logo}
                    priority
                    src="/images/Untitled.png"
                    height={1500}
                    width={1159}
                    alt="cabagelogotransparent"
                />
                <div className={styles.nav}>
                    <Link className={styles.navlink} href="/">About</Link>
                    <Link className={styles.navlink} href="/CSA-fall-share">CSA Fall Share</Link>
                    <Link className={styles.navlink} href="/get-involved">Get Involved</Link>
                    <Link className={styles.navlink} href="/what-is-a-co-op">What is a co-op?</Link>
                    <Link className={styles.navlink} href="/contact">Contact</Link>
                    <Link className={styles.navlink} href="/donate">Donate</Link>
                    <Link className={styles.navlink} href="/wholesale">Wholesale</Link>
                </div>
                </>
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
            <div className={styles.footerText}>
                <h2>Subscribe</h2>
                <p>Sign up with your email address to recieve news and updates</p>
                <form>
                    <input type="email" placeholder="Email Address"></input>
                    <button>Sign Up</button>
                </form>
            </div>
            <Image className={styles.logo}
                    priority
                    src="/images/cabbagelogotransparent.png"
                    height={2500}
                    width={2323}
                    alt="cabagelogotransparent"
                />
        </footer>
    <p className={styles.footerText}> Website made with love by <Link href='URL'>Adam</Link></p>

    </div>
}