import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sales = await db.sale.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Sales', error },
      { status: 500 },
    );
  }
}
