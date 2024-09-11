import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: { role: 'USER' },
      // include: { profile: true },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Customers', error },
      { status: 500 },
    );
  }
}
