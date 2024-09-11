import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function PUT(request, { params: { id } }) {
  console.log('from put api', id);
  try {
    const {
      code,
      contactPerson,
      contactPersonPhone,
      email,
      name,
      notes,
      profileImageUrl,
      phone,
      physicalAddress,
      terms,
      isActive,

      userId,
      products,
      landSize,
      mainCrop,
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
    console.log('exiting user', existingUser);
    const updatedFarmerProfile = await db.farmerProfile.update({
      where: { userId: id },
      data: {
        code,
        contactPerson,
        contactPersonPhone,
        email,
        name,
        notes,
        profileImageUrl,
        phone,
        physicalAddress,
        terms,
        isActive,
        userId,
        products,
        landSize: parseFloat(landSize),
        mainCrop,
      },
    });
    console.log(
      'from farmer / updatee/id route updateProfile',
      updatedFarmerProfile,
    );
    await db.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
        image: profileImageUrl,
      },
    });
    return NextResponse.json(updatedFarmerProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to Update Farmer', error },
      { status: 500 },
    );
  }
}
