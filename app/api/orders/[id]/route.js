import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const order = await db.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Order', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  console.log(id);
  try {
    const existingOrder = await db.order.findUnique({
      where: { id },
    });
    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: 'Order Not Found',
        },
        { status: 404 },
      );
    }
    const deletedOrder = await db.order.delete({ where: { id } });
    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Order', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('from put api', id);
  try {
    const { orderStatus } = await request.json();
    const existingOrder = await db.order.findUnique({
      where: { id },
    });
    if (!existingOrder) {
      return NextResponse.json(
        {
          data: null,
          message: 'Order Not Found',
        },
        { status: 404 },
      );
    }
    const updatedOrder = await db.order.update({
      where: { id },
      data: { orderStatus },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to Update Order', error },
      { status: 500 },
    );
  }
}
