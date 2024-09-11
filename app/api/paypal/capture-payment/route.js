import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { orderID } = await request.json();

  try {
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        auth: {
          username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
