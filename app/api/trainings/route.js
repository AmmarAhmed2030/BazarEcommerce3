import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const {
      title,
      slug,
      imageUrl,
      description,
      content,
      isActive,
      categoryId,
    } = await request.json();
    const existingTraining = await db.training.findUnique({
      where: {
        slug,
      },
    });
    if (existingTraining) {
      return NextResponse.json(
        {
          data: null,
          message: 'Training already exists',
        },
        { status: 409 },
      );
    }
    const newTraining = await db.training.create({
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
    console.log(newTraining);
    return NextResponse.json(newTraining);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create Training', error },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    const trainings = await db.training.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(trainings);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Trainings', error },
      { status: 500 },
    );
  }
}
