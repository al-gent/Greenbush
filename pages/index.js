import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/index.module.css';
import SocialLinks from '../components/social_links';
import { useEffect, useState } from 'react';
import useTypewriter from '../components/typewriter_effect'
import MiniChat from '../components/miniChat'


export default function Home() {
  const titles = [
    'Applied AI Engineer',
    'Data Scientist',
    'Agent Architect',
    'Snowboard Instructor',
    'Trivia Technologist',
    'Educator',
    'Data Engineer',
    'Curious Human',
    'Tiny Home Builder',
    'Musician',
    'ML Engineer',
    'Software Developer',
    'Naturalist',
  ];
  
  
  const typedText = useTypewriter(titles);
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
        <h2>{typedText || '\u00A0'}</h2>
        </div>{' '}

      <div className={styles.centerCard}>
        <h2>Featured Projects</h2>
        <div className={styles.dash}>
          <Link href="https://trivially-gamma.vercel.app/">
            <button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexDirection: 'column' }}>
        <Image
          src="/trivially_icon.png"
          alt="Trivialy icon"
          width={32}
          height={32}
        />
        <span style={{ textAlign: 'center' }}>
          AI-Powered Trivia
        </span>
      </div>
      </button>
          </Link>
          <Link href="http://www.adamlgent.com/hmscale">
            <button>Happiness vs Meaning Scale</button>
          </Link>
          <Link href="http://www.adamlgent.com/demodemo">
          <button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexDirection: 'column' }}>
          <Image
          src="/favicon.ico"
          alt="pixel chicken"
          width={32}
          height={32}
        />
            Orders & Inventory Manager
            </div>
            </button>
          </Link>
        </div>
        <MiniChat />
      </div>
    </div>
  );
}
