import React from 'react';
import './App.css'; // You can add CSS styles here
import CurrencyConversion from './components/CurrencyConversion';
import PayPalButton from './components/PayPalButton';

function App() {
  return (
    <div>
    <div className="App">
      <CurrencyConversion />
      <PayPalButton currency="USD" />
    </div>
    <div className="footer">
      <p>&copy; 2023 ZONO Academy Technical Intern Coding Test - Task Submission. 
        <br></br>Created by 
       <a href='https://sibajene.netlify.app'> Sibajene</a></p>
    </div>
    </div>
  );
}

export default App;
