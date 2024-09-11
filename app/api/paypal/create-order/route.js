import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { amount } = await request.json();

  try {
    const response = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount, // Dynamic pricing
            },
          },
        ],
      },
      {
        auth: {
          username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },
      },
    );

    return NextResponse.json({ id: response.data.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
