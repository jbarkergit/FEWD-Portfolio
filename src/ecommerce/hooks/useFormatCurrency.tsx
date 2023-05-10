import { useState } from 'react';

export default function useFormatCurrency() {
  const [numFormat, setNumFormat] = useState('en-us');
  const [currency, setCurrency] = useState('USD');
  const formatCurrency = Intl.NumberFormat(numFormat, { currency: currency, style: 'currency' });
}
