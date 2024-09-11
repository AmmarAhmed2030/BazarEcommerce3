import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  console.log('userId from api/farmers/[id]/route.js ', id);
  try {
    const farmer = await db.farmerProfile.findUnique({
      where: { userId: id },
    });
    return NextResponse.json(farmer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Farmer', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingFarmer = await db.user.findUnique({
      where: { id },
    });
    if (!existingFarmer) {
      return NextResponse.json(
        {
          data: null,
          message: 'Farmer Not Found',
        },
        { status: 404 },
      );
    }
    const deletedFarmer = await db.user.delete({
      where: { id },
    });
    return NextResponse.json(deletedFarmer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Farmer', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log('from put api', id);
  try {
    const { status, emailVerified } = await request.json();
    const existingUser = await db.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: 'User Not Found',
        },
        { status: 404 },
      );
    }
    const updatedUser = await db.user.update({
      where: { id },
      data: { status, emailVerified },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to Update Farmer', error },
      { status: 500 },
    );
  }
}
