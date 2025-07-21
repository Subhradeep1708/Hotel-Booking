"use client"
import React from 'react'
import Script from 'next/script'

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PaymentPage = () => {
    const AMOUNT = 100; // Amount in paise (50000 paise = 500 INR)
    const [isProcessing, setProcessing] = React.useState(false);

    const handlePayment = async () => {
        setProcessing(true);
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.error) {
                console.error(data.error);
                alert('Payment failed. Please try again.');
                setProcessing(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: AMOUNT, // Amount is in currency subunits. Default currency is INR.
                currency: data.currency,
                name: 'Your Company Name',
                description: 'Test Transaction',
                order_id: data.orderId, //This is a sample Order ID. Replace with your own Order ID.
                handler: function (response: any) {
                    // called when the payment is successful
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    // Do any database functionality here
                    setProcessing(false);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@gmail.com',
                    contact: '9999999999',
                },
            }
            const rzpy = new window.Razorpay(options);
            rzpy.open();
        } catch (error) {
            // console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    }


    return (
        <div>

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => {
                    // console.log('Razorpay script loaded');
                }}
                onError={() => {
                    // console.error('Failed to load Razorpay script');
                }}
            />
            <h1>Payment Page</h1>
            <p>Amount To Be Paid: {AMOUNT} </p>
            <button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
            <p>Note: This is a test payment page. No actual transactions will occur.</p>
        </div>
    )
}

export default PaymentPage;