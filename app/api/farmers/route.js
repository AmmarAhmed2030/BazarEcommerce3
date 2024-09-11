import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const farmerData = await request.json();
    const existingUser = await db.user.findUnique({
      where: { id: farmerData?.userId },
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
      where: { id: farmerData?.userId },
      data: {
        emailVerified: true,
        image: farmerData?.profileImageUrl,
      },
    });
    const newFarmerProfile = await db.farmerProfile.create({
      data: {
        code: farmerData.code,
        contactPerson: farmerData.contactPerson,
        contactPersonPhone: farmerData.contactPersonPhone,
        email: farmerData.email,
        name: farmerData.name,
        notes: farmerData.notes,
        terms: farmerData.terms,
        phone: farmerData.phone,
        physicalAddress: farmerData.physicalAddress,
        isActive: farmerData.isActive,
        profileImageUrl: farmerData.profileImageUrl,
        products: farmerData.products,
        landSize: parseFloat(farmerData.landSize),
        mainCrop: farmerData.mainCrop,
        userId: farmerData?.userId,
      },
    });
    // const userWihtFarmerProfile = await db.user.update({
    //   where: { id: farmerData?.userId },
    //   data: {
    //     farmerProfile: newFarmerProfile,
    //   },
    // });
    console.log(newFarmerProfile);
    return NextResponse.json(newFarmerProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create Farmer', error },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    const farmers = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: { role: 'FARMER' },
      // include: { farmerProfile: true },
    });
    return NextResponse.json(farmers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Farmers', error },
      { status: 500 },
    );
  }
}
