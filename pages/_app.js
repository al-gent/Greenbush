import { Analytics } from '@vercel/analytics/react';
import '../styles/global.css';
import { CookiesProvider } from 'react-cookie';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <CookiesProvider>
        <Analytics />
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
}
