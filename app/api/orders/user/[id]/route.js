import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },

      where: { userId: id },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Orders', error },
      { status: 500 },
    );
  }
}
