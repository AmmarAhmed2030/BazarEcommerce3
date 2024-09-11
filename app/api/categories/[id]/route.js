import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const category = await db.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Category', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  console.log(id);
  try {
    const existingCategory = await db.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: 'Category Not Found',
        },
        { status: 404 },
      );
    }
    const deletedCategory = await db.category.delete({ where: { id } });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Category', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const { title, slug, imageUrl, description, isActive } = await request.json();

  try {
    const existingCategory = await db.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      const newCategory = await db.category.create({
        data: { title, slug, imageUrl, description, isActive },
      });
      return NextResponse.json({
        data: newCategory,
        message: 'There is no category with this id so we created a new one ',
      });
    }
    const updatedCategory = await db.category.update({
      where: { id },
      data: { title, slug, imageUrl, description, isActive },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update Category', error },
      { status: 500 },
    );
  }
}
