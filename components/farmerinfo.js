import FormattedDate from './formatted-date';
import { useState, useEffect } from 'react';

export default function FarmerInfo({ setIsLoading, client }) {
  const [farm, setFarm] = useState({});
  useEffect(() => {
    setIsLoading(true);
    const url = `/api/get-farmer-info?client=${encodeURIComponent(client)}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFarm(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <h1>{farm.farmname} Dashboard</h1>
    </>
  );
}
