export default function generateIsoFormattedDate(date) {
  const dateObject = new Date(date);
  return dateObject.toISOString();
}
