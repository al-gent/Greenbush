import React, { useState, useEffect } from 'react';

export default function Data() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/view-all-orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to download orders as a JSON file
  const downloadJSON = () => {
    const jsonString = JSON.stringify(orders, null, 2); // Pretty-print JSON
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Orders</h1>
      {error && <p>Error: {error}</p>}
      {/* Button to trigger download */}
      <button onClick={downloadJSON}>Download Orders as JSON</button>
    </div>
  );
}

