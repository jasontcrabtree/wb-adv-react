export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'NZD',
    minimumFractionDigits: 2,
  };

  const formatter = Intl.NumberFormat('en-nz', options);

  return formatter.format(amount / 100);
}
