export const dateFormatter = (dateString) => {
  const date = new Date(dateString);

  const options = { month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate
}
