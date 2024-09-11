import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const training = await db.training.findUnique({
      where: { id },
    });
    return NextResponse.json(training);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Training', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  console.log(id);
  try {
    const existingTraining = await db.training.findUnique({
      where: { id },
    });
    if (!existingTraining) {
      return NextResponse.json(
        {
          data: null,
          message: 'Training Not Found',
        },
        { status: 404 },
      );
    }
    const deletedTraining = await db.training.delete({ where: { id } });
    return NextResponse.json(deletedTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Training', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const { title, slug, imageUrl, description, content, isActive, categoryId } =
    await request.json();

  try {
    const existingTraining = await db.training.findUnique({
      where: { id },
    });
    if (!existingTraining) {
      // const newTraining = await db.training.create({
      //   data: {
      //     title,
      //     slug,
      //     imageUrl,
      //     description,
      //     content,
      //     isActive,
      //     categoryId,
      //   },
      // });
      return NextResponse.json({
        status: 404,
        message: 'There is no Training with this id',
      });
    }
    const updatedTraining = await db.training.update({
      where: { id },
      data: {
        title,
        slug,
        imageUrl,
        description,
        content,
        isActive,
        categoryId,
      },
    });
    return NextResponse.json(updatedTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update Training', error },
      { status: 500 },
    );
  }
}
