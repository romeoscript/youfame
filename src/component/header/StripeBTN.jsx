import React from 'react';
import axios from 'axios'; // Import Axios
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';



const StripeButton = ({amount}) => {
    const handleCheckout = async () => {
        console.log(amount);
        try {
            // Call your vanilla app's API endpoint to create a Stripe session using Axios
            const response = await axios.post('http://localhost:5000/create-stripe-session',{
                amount:amount
            });

            const { sessionId } = response.data;

            // Redirect to the vanilla app for payment with the session ID
            window.location.href = `http://127.0.0.1:5500/index.html?session=${sessionId}`;
        } catch (error) {
            console.error("Error creating Stripe session:", error);
        }
    };

    return (
        <Button onClick={handleCheckout} variant="outlined" sx={{ margin: '0.5rem 1rem' }} startIcon={<CreditCardIcon />} >
            Credit Card
        </Button>

    );
};

export default StripeButton;
