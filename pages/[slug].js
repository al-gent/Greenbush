import React, { useState, useEffect } from 'react';
import OrderForm from '../components/orderForm';
import Layout from '../components/Layout';
import Image from 'next/image';

export async function getServerSideProps(context) {
  const { slug } = context.query;
  return {
    props: {
      slug,
    },
  };
}

export default function Wholesale({ slug }) {
  const lowerCaseSlug = slug.toLowerCase();
  const [isLoading, setIsLoading] = useState(true);
  const [farm, setFarm] = useState({});
  useEffect(() => {
    const url = `/api/get-farmer-info?client=${encodeURIComponent(
      lowerCaseSlug,
    )}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        if (!data) {
          // check if data is empty
          setFarm(null); // set farm to null if data is empty
        } else {
          setFarm(JSON.parse(data));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error', error);
        setIsLoading(false);
      });
  }, []);

  if (!farm) {
    return (
      <div>
        <h1>Sorry, I don't have that farm in my system </h1>
        <h2>Are you sure '{lowerCaseSlug}' is the correct farm code?</h2>
      </div>
    );
  }
  return (
    <div>
      {isLoading && <h1>loading...</h1>}
      <div>
        <h1>{farm.farmname}</h1>
        <OrderForm
          client={lowerCaseSlug}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          farmer_email={farm.email}
        />
      </div>
    </div>
  );
}
