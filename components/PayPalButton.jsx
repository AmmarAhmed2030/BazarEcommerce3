'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';
const PayPalButton = ({ amount }) => {
  const createOrder = async () => {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();
    return data.id; // PayPal Order ID
  };

  const onApprove = async (data) => {
    const response = await fetch('/api/paypal/capture-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: data.orderID }),
    });

    const paymentData = await response.json();
    // Handle payment success, e.g., save transaction data to your database
    console.log(paymentData);
  };

  return (
    <PayPalScriptProvider
      options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'vertical' }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
