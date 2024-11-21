// src/components/LoginOrSignupForm.jsx
import { StytchLogin } from '@stytch/nextjs';
import { Products } from '@stytch/vanilla-js';

const REDIRECT_URL = 'http://localhost:3000/authenticate';

export const LoginOrSignupForm = () => {
  const config = {
    products: [Products.emailMagicLinks],
    emailMagicLinksOptions: {
      loginRedirectURL: REDIRECT_URL,
      loginExpirationMinutes: 60,
      signupRedirectURL: REDIRECT_URL,
      signupExpirationMinutes: 60,
    },
  };

  return <StytchLogin config={config} />;
};