import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function PUT(request, { params: { id } }) {
  console.log('from put api', id);
  try {
    const {
      name,
      email,
      username,
      firstName,
      lastName,
      profileImage,
      dateOfBirth,
      phone,
      streetAddress,
      city,
      country,
      district,
      userId,
    } = await request.json();
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
    await db.user.update({
      where: { id: userId },
      data: {
        image: profileImage,
      },
    });
    console.log('exiting user', existingUser);
    const updatedUserProfile = await db.userProfile.update({
      where: { userId: id },
      data: {
        name,
        email,
        username,
        firstName,
        lastName,
        profileImage,
        dateOfBirth,
        phone,
        streetAddress,
        city,
        country,
        district,
        userId,
      },
    });

    return NextResponse.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to Update User Profile', error },
      { status: 500 },
    );
  }
}
