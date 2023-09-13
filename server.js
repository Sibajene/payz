const express = require('express');
const paypal = require('paypal-rest-sdk');

const app = express();

// Configure PayPal SDK with your credentials
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: 'AVEnI-dEQ3avmcWyv6S3hXE9pz25lQUF9fiRoFCvD2E87YFEY-16M-ZCUfZI8toP6SorRgADNxNQqeOA',
  client_secret: 'EPKEDDYABHcChn8m9c5E0F5a9ldovqtlr6uGc_szxObNAenIg9ZaiBJPiAAd2KAXLjuHrZsdilt6z8zm',
});

app.use(express.json());

// Create a PayPal order
app.post('/api/create-order', (req, res) => {
  const { amount, currency } = req.body;

  const createOrderRequest = {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount,
      },
    }],
  };

  paypal.orders.create(createOrderRequest, (error, order) => {
    if (error) {
      console.error('Error creating PayPal order:', error);
      res.status(500).send('Error creating PayPal order');
    } else {
      // Return the PayPal order ID and the redirect URL
      const approvalUrl = order.links.find(link => link.rel === 'approve').href;
      res.json({ order_id: order.id, redirect_url: approvalUrl });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
