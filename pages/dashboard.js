import Dash from '../components/dash';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Login from '../components/login';
import { parseCookies } from '../helpers';
import DashboardHelp from '../components/dashboard-help';

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req);
  return { props: { cookies } };
}

export default function Dashboard(cookies) {
  const [farmCode, setFarmCode] = useState('');
  const [pin, setPin] = useState('');
  const [isCred, setIsCred] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cookies.cookies.user) {
      setFarmCode(JSON.parse(cookies.cookies.user).farmcode);
      setIsCred(true);
    }
  }, []);

  return (
    <div>
      {isCred && (
        <div>
          <Dash
            client={farmCode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <DashboardHelp />
        </div>
      )}
      <div>
        <Login
          farmCode={farmCode}
          setFarmCode={setFarmCode}
          pin={pin}
          setPin={setPin}
          isCred={isCred}
          setIsCred={setIsCred}
        />
      </div>
    </div>
  );
}
