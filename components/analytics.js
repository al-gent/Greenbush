import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

function formattedDate(date) {
  let dateObject = new Date(date);
  let formattedDate = dateObject.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return formattedDate;
}

export default function AnalyzeSales(client) {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const url = `/api/get-completed-orders?client=${encodeURIComponent(
      client,
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const clientTotals = [];

  orders.forEach((order) => {
    const clientTotal = {};
    let products = order.items;
    let total = 0;
    products.forEach((itemString) => {
      let product = JSON.parse(itemString);
      const total_price = product.editedCart
        ? (product.editedCart * product.price[0]).toFixed(2)
        : Math.round(product.cart * product.price[0]).toFixed(2);
      total += parseFloat(total_price);
    });
    clientTotal['client'] = order.name;
    clientTotal['total'] = total;
    clientTotal['date'] = formattedDate(order.date);
    clientTotals.push(clientTotal);
  });
  return (
    <div>
      <h2>Last 10 Order Totals</h2>
      <BarChart
        width={800}
        height={400}
        data={clientTotals.slice().reverse()}
        margin={{ top: 60, right: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="total" fill="#8884d8">
          <LabelList dataKey="client" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
}
