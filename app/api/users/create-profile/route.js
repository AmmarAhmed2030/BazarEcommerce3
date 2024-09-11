import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
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
      where: { id: userId },
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
    const newUserProfile = await db.userProfile.create({
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

    console.log(newUserProfile);
    return NextResponse.json(newUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create User Profile', error },
      { status: 500 },
    );
  }
}
