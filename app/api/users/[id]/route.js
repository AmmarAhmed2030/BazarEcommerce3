import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        email: true,
        role: true,
        name: true,
        id: true,
        emailVerified: true,
        profile: true,
        createdAt: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get User', error },
      { status: 500 },
    );
  }
}
