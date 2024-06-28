export default function saveBuyerInfo(buyer, email, setIsLoading) {
  setIsLoading(true);
  fetch(`/api/update-buyer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      buyer,
      email,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((response) => {
      console.log('buyers updated', response);
    })
    .then((response) => setIsLoading(false))
    .catch((error) => console.error('Error:', error));
}
