import { Analytics } from '@vercel/analytics/react';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
