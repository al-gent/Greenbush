import Dash from '../components/dash';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Login from '../components/login';

export default function Dashboard() {
  const [farmCode, setFarmCode] = useState('');
  const [pin, setPin] = useState('');
  const [isCred, setIsCred] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isCred ? (
        <div>
          <Dash
            client={farmCode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      ) : (
        <div>
          <h1>Farmer's Dashboard</h1>
          <Login
            farmCode={farmCode}
            setFarmCode={setFarmCode}
            pin={pin}
            setPin={setPin}
            isCred={isCred}
            setIsCred={setIsCred}
          />
        </div>
      )}
    </div>
  );
}
