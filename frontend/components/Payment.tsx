"use client";
import React from "react";
import Script from "next/script";
import { Button } from "./ui/button";
import { Phone } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const Payment = ({
    amountInRupees,
    onPaymentSuccess,
    customerData,
    children,
}: {
    amountInRupees: number;
    onPaymentSuccess: () => void;
    customerData: any;
    children: React.ReactNode;
}) => {
    const AMOUNT = amountInRupees * 100;
    const [isProcessing, setProcessing] = React.useState(false);

    const handlePayment = async () => {
        setProcessing(true);
        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: AMOUNT,
                    currency: "INR",
                    customerData,
                }),
            });

            const data = await response.json();
            if (data.error) {
                console.error(data.error);
                alert("Payment failed. Please try again.");
                setProcessing(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: AMOUNT, // Amount is in currency subunits. Default currency is INR.
                currency: data.currency,
                name: "Your Company Name",
                description: "Test Transaction",
                order_id: data.orderId, //This is a sample Order ID. Replace with your own Order ID.
                handler: function (response: any) {
                    alert(
                        `Payment successful! Payment ID: ${response.razorpay_payment_id}`
                    );
                    // called when the payment is successful
                    try {
                        onPaymentSuccess();
                    } catch (error) {
                        // refund
                    }

                    // Do any database functionality here
                    setProcessing(false);
                },
                prefill: {
                    name: customerData.firstName + " " + customerData.lastName,
                    email: customerData.email,
                },
            };
            const rzpy = new window.Razorpay(options);
            rzpy.open();
        } catch (error) {
            // console.error('Payment error:', error);
            alert("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="w-full">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => {
                    // console.log('Razorpay script loaded');
                }}
                onError={() => {
                    // console.error('Failed to load Razorpay script');
                }}
            />
            <Button
                variant={"primary"}
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing}
            >
                {children}
            </Button>
        </div>
    );
};

export default Payment;
