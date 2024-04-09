import { Analytics } from '@vercel/analytics/react';
import '../styles/global.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
