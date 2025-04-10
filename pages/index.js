import Image from 'next/image';
import Link from 'next/link';
import styles from '/styles/index.module.css';
import SocialLinks from '../components/social_links';
import { useEffect, useState } from 'react';

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, pause = 1500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
        if (text === currentWord) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pause);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
}


export default function Home() {
  const titles = [
    'Applied AI Engineer',
    'Data Scientist',
    'ML Engineer',
    'Agent Architect',
    'Trivia Technologist',
    'Creator',
    'Educator',
    'Data Engineer',
    'Curious Human',
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
        <h2>{typedText}</h2>
        </div>{' '}
      <div className={styles.centerCard}>
        <h2>Featured Projects</h2>
        <div className={styles.dash}>
          <Link href="https://trivially-gamma.vercel.app/">
            <button>
              Trivialy:
            <br />
             AI-Powered Trivia</button>
          </Link>
          <Link href="http://www.adamlgent.com/hmscale">
            <button>Happiness vs Meaning Scale</button>
          </Link>
          <Link href="http://www.adamlgent.com/demodemo">
          <button>flo.farm
            <br />
            Orders & Inventory Manager</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
