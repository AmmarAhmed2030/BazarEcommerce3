import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const market = await db.market.findUnique({
      where: { id },
    });
    return NextResponse.json(market);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Market', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingMarket = await db.market.findUnique({
      where: { id },
    });
    if (!existingMarket) {
      return NextResponse.json(
        {
          data: null,
          message: 'Market Not Found',
        },
        { status: 404 },
      );
    }
    const deletedMarket = await db.market.delete({
      where: { id },
    });
    return NextResponse.json(deletedMarket);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Market', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const { title, slug, description, logoUrl, isActive, categoryIds } =
    await request.json();

  try {
    const existingMarket = await db.market.findUnique({
      where: { id },
    });
    if (!existingMarket) {
      const newMarket = await db.market.create({
        data: {
          title,
          slug,
          description,
          logoUrl,
          isActive,
          categoryIds,
        },
      });
      return NextResponse.json({
        data: newMarket,
        message: 'There is no market with this id so we created a new one ',
      });
    }
    const updatedMarket = await db.market.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        logoUrl,
        isActive,
        categoryIds,
      },
    });
    return NextResponse.json(updatedMarket);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update Market', error },
      { status: 500 },
    );
  }
}
