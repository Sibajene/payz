
import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_CLIENT_ID } from '../paypalConfig.js'; // Import the client ID


function PayPalButton({ amount, currency }) {
  const [isPaid, setIsPaid] = useState(false);


  useEffect(() => {
    // Handle payment success here
    if (isPaid) {
      console.log('Payment was successful.');
    }
  }, [isPaid]);

  return (
    <PayPalScriptProvider options={{ 'client-id': PAYPAL_CLIENT_ID }}>
      <div>
        <br></br>
        {!isPaid ? (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              // Capture the payment here
              return actions.order.capture().then(details => {
                setIsPaid(true);
              });
            }}
          />
        ) : (
          <p>Payment successful!</p>
        )}
        
      </div>
    </PayPalScriptProvider>
    
  );
}

export default PayPalButton;
