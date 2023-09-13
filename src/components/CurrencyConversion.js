import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConversion() {
  const [amount, setAmount] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    // Fetch currency conversion rates using an external API
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setExchangeRates(response.data.rates);
      })
      .catch(error => {
        console.error('Error fetching currency data: ', error);
      });
  }, []);

  const convertCurrency = () => {
    if (exchangeRates[selectedCountry]) {
      const converted = (amount * exchangeRates[selectedCountry]).toFixed(2);
      setConvertedAmount(converted);
    } else {
      setConvertedAmount(null);
    }
  };

  return (
    <div>
      <h1>Product/Service Description</h1>

      <label htmlFor="amount">Enter Payment Amount (USD):</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />

      <label htmlFor="country">Select Your Location/Country:</label>
      <select
        id="country"
        value={selectedCountry}
        onChange={e => setSelectedCountry(e.target.value)}
        required
      >
        <option value="" disabled>Select Country</option>
        {Object.keys(exchangeRates).map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <button className="convert-button" onClick={convertCurrency}>Convert</button>


      {convertedAmount !== null && (
        <p>
          Converted Amount: {convertedAmount} {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default CurrencyConversion;
