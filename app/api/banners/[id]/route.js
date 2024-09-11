import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const banner = await db.banner.findUnique({
      where: { id },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Banner', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingBanner = await db.banner.findUnique({
      where: { id },
    });
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: 'Banner Not Found',
        },
        { status: 404 },
      );
    }
    const deletedBanner = await db.banner.delete({ where: { id } });
    return NextResponse.json(deletedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Banner', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const { title, link, imageUrl, isActive } = await request.json();

  try {
    const existingBanner = await db.banner.findUnique({
      where: { id },
    });
    if (!existingBanner) {
      const newBanner = await db.banner.create({
        data: { title, link, imageUrl, isActive },
      });
      return NextResponse.json({
        data: newBanner,
        message: 'There is no banner with this id so we created a new one ',
      });
    }
    const updatedBanner = await db.banner.update({
      where: { id },
      data: { title, link, imageUrl, isActive },
    });
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update Banner', error },
      { status: 500 },
    );
  }
}
