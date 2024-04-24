export default function deleteOrder(id, deleteOrdersAPI, reload, setReload) {
  fetch(deleteOrdersAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: id,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((response) => {
      setReload(!reload);
    })
    .catch((error) => console.error('Error:', error));
}
