import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/index.module.css';
import SocialLinks from '../components/social_links';

export default function Home() {
  return (
    <div>
      <div className={styles.storyCard}>
        <h1> Adam Gent </h1>
        <Image
          className={styles.headshot}
          src="/images/IMG_5495.jpg"
          height={1800}
          width={1800}
          alt="Headshot"
        />
        <SocialLinks />
        <h2>Creator - Educator</h2>
        <h4> Learning new technologies.</h4>
        <h4>Working on interesting problems.</h4>
      </div>{' '}
      <div className={styles.centerCard}>
        <h2>Featured Projects</h2>
        <div className={styles.dash}>
          <Link href="http://www.adamlgent.com/hmscale">
            <button>Happiness vs Meaning Scale</button>
          </Link>
          <Link href="http://www.adamlgent.com/demodemo">
            <button>Orders & Inventory Management Web App</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
