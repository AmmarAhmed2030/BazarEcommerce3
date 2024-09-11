import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const coupon = await db.coupon.findUnique({
      where: { id },
    });
    return NextResponse.json(coupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Coupon', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingCoupon = await db.coupon.findUnique({
      where: { id },
    });
    if (!existingCoupon) {
      return NextResponse.json(
        {
          data: null,
          message: 'Coupon Not Found',
        },
        { status: 404 },
      );
    }
    const deletedCoupon = await db.coupon.delete({ where: { id } });
    return NextResponse.json(deletedCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Coupon', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const { title, expiryDate, couponCode, isActive, vendorId } =
    await request.json();

  try {
    const existingCoupon = await db.coupon.findUnique({
      where: { id },
    });
    if (!existingCoupon) {
      const newCoupon = await db.coupon.create({
        data: { title, expiryDate, couponCode, isActive, vendorId },
      });
      return NextResponse.json({
        data: newCoupon,
        message: 'There is no coupon with this id so we created a new one ',
      });
    }
    const updatedCoupon = await db.coupon.update({
      where: { id },
      data: { title, expiryDate, couponCode, isActive, vendorId },
    });
    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update Coupon', error },
      { status: 500 },
    );
  }
}
