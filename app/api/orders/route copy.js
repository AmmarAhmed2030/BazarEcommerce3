import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  function generateOrderNumber(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let orderNumber = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderNumber += characters.charAt(randomIndex);
    }

    return orderNumber;
  }

  // Example usage: Generate an order number with 8 characters
  try {
    const { checkoutFormData, orderItems } = await request.json();

    const newOrder = await db.order.create({
      data: {
        userId: checkoutFormData.userId,
        firstName: checkoutFormData.firstName,
        lastName: checkoutFormData.lastName,
        email: checkoutFormData.email,
        phone: checkoutFormData.phone,
        streetAddress: checkoutFormData.streetAddress,
        city: checkoutFormData.city,
        country: checkoutFormData.country,
        district: checkoutFormData.district,
        shippingCost: parseFloat(checkoutFormData.shippingCost),
        paymentMethod: checkoutFormData.paymentMethod,
        orderNumber: generateOrderNumber(8),
      },
    });
    const newOrderItems = await db.orderItem.createMany({
      data: orderItems.map((item) => ({
        productId: item.id,
        title: item.title,
        vendorId: item.vendorId,
        imageUrl: item.imageUrl,
        orderId: newOrder.id,
        quantity: parseInt(item.qty),
        price: parseFloat(item.salePrice),
      })),
    });
    console.log(newOrder, newOrderItems);
    return NextResponse.json(newOrder);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create Order', error },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
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
