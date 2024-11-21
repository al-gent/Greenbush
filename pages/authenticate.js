// pages/authenticate.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { LoginOrSignupForm } from "../components/LoginOrSignupForm";

export default function Authenticate() {
  const { user, isInitialized } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const tokenType = router.query.stytch_token_type;
      const token = router.query.token;
      if (token && tokenType === 'magic_links') {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [isInitialized, router, stytch, user]);

  useEffect(() => {
    if (isInitialized && user) {
      // Redirect the user to an authenticated page if they are already logged in
      router.replace("/dashboard");
    }
  }, [user, isInitialized, router]);

  return <LoginOrSignupForm />;
}