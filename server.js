import express from 'express';
import stripePackage from 'stripe';
import cors from 'cors';

const stripe = stripePackage('sk_test_51NxI2RCJIXj2AddOi62fWEXIOM1gS3LOiVxgXhrNjxMD16WcVBVfMCELEz6SzbXr4UGOpwrNT6P494SlzUh0hY2u00e9Lzqdjs');

const app = express();
const PORT = 5000;

app.use(cors()); // To handle CORS issues
app.use(express.json()); // To parse JSON requests

app.post('/create-stripe-session', async (req, res) => {
  // Hardcoded amount for testing
  const amount = 1000; // Represents $10.00

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Test Product',
        },
        unit_amount: amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/payment-success',
    cancel_url: 'http://localhost:3000/payment-cancelled',
  });

  res.json({ sessionId: session.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
