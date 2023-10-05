import React from 'react';
import axios from 'axios'; // Import Axios
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NxI2RCJIXj2AddOrPt260rtvsuDU45IZovsOMrQ8u4grsKZehUSH7fkIJTOtdkECN2rScLzLjHbqGyjOEbOZkGy00kkmtzLFk');

const StripeButton = () => {
  const handleCheckout = async () => {
    try {
      // Call your vanilla app's API endpoint to create a Stripe session using Axios
      const response = await axios.post('http://localhost:5000/create-stripe-session');

      const { sessionId } = response.data;

      // Redirect to the vanilla app for payment with the session ID
      window.location.href = `http://127.0.0.1:5500/index.html`;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Pay with Stripe
    </button>
  );
};

export default StripeButton;
