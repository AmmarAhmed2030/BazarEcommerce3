import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const userProfile = await db.userProfile.findUnique({
      where: { userId: id },
    });
    return NextResponse.json(userProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get User Profile', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const {
    userId,
    name,
    firstName,
    lastName,
    username,
    email,
    phone,
    profileImage,
    streetAddress,
    city,
    country,
    district,
    dateOfBirth,
  } = await request.json();

  try {
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          message: 'User Not Found',
        },
        { status: 404 },
      );
    }
    let newUserProfile;
    const existingUserProfile = await db.userProfile.findUnique({
      where: { userId },
    });
    if (!existingUserProfile) {
      newUserProfile = await db.userProfile.create({
        data: {
          userId,
          name,
          firstName,
          lastName,
          username,
          email,
          phone,
          profileImage,
          streetAddress,
          city,
          country,
          district,
          dateOfBirth,
        },
      });
      return NextResponse.json(newUserProfile);
    }
    newUserProfile = await db.userProfile.update({
      where: { userId: id },
      data: {
        name,
        firstName,
        lastName,
        username,
        email,
        phone,
        profileImage,
        streetAddress,
        city,
        country,
        district,
        dateOfBirth,
      },
    });
    return NextResponse.json(newUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update User', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingCustomer = await db.user.findUnique({
      where: { id },
    });
    if (!existingCustomer) {
      return NextResponse.json(
        {
          data: null,
          message: 'Customer Not Found',
        },
        { status: 404 },
      );
    }
    const deletedCustomer = await db.user.delete({
      where: { id },
    });
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Customer', error },
      { status: 500 },
    );
  }
}
