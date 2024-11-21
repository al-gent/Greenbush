import { Analytics } from '@vercel/analytics/react';
import '../styles/global.css';
import { CookiesProvider } from 'react-cookie';
import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';

// optional object for configuring SDK cookie behavior, currently showing defaults
const stytchOptions = {
  cookieOptions: {
    opaqueTokenCookieName: "stytch_session",
    jwtCookieName: "stytch_session_jwt",
    path: "",
    availableToSubdomains: false,
    domain: "",
  }
}

const stytchClient = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN,
  stytchOptions
);

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <StytchProvider stytch={stytchClient}>
        <CookiesProvider>
          <Analytics />
          <Component {...pageProps} />
        </CookiesProvider>
      </StytchProvider>
    </>
  );
}

