import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../components/layout.module.css';
import useTypewriter from '../components/typewriter_effect'

export default function Home() {
    const titles = [
        'three',
        'one',
        'zero',
        'five',
        'six',
        'nine',
        'seven',
        'four',
        'eight',
        'four'

      ];
      
      
      const typedText = useTypewriter(titles);
  return (
    <h2>{typedText || '\u00A0'}</h2>

  );
}
