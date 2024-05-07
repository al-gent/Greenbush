import Dash from '../components/dash';
import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dash client="GGC" isLoading={isLoading} setIsLoading={setIsLoading} />
  );
}
