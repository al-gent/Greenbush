export default function FormattedDate({ date }) {
  let dateObject = new Date(date);
  let formattedDate = dateObject.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return <p>{formattedDate}</p>;
}
