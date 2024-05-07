export default function updateOrder({ order, client, setIsLoading }) {
  setIsLoading(true);
  console.log('updateOrder', order, client);
  const url = `/api/update-orders?client=${encodeURIComponent(client)}`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((response) => {
      setIsLoading(false);
    })
    .catch((error) => console.error('Error:', error));
}
