import React, { useEffect, useRef } from 'react';

function PayPalButton({ amount }) {
    const paypalRef = useRef();

    useEffect(() => {
        let paypalButtons;
        if (window.paypal) {


            paypalButtons = window.paypal.Buttons({
                style: {
                    layout: 'vertical',  // Or 'horizontal'
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal'
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Your Order Description',
                            amount: {
                                currency_code: 'USD',
                                value: amount
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    alert('Transaction Successful!');
                },
                onError: (err) => {
                    console.error(err);
                    alert('Transaction failed. Please try again.');
                }
            })
            paypalButtons.render(paypalRef.current);
        }
        return () => {
            if (paypalButtons) {
                paypalButtons.close(); // Close the paypal buttons to cleanup
            }
        }
    }, [amount]);

    return (
        <div ref={paypalRef}></div>
    );
}

export default PayPalButton;
