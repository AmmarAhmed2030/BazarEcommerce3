import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const sortBy = request.nextUrl.searchParams.get('sort') || 'asc';
  const minPrice = request.nextUrl.searchParams.get('min') || 0;
  const maxPrice = request.nextUrl.searchParams.get('max');
  const page = request.nextUrl.searchParams.get('page') || 1;
  const searchTerm = request.nextUrl.searchParams.get('search');
  console.log(searchTerm);
  let products = [];
  const pageSize = 3;
  let totalLength;
  // console.log(categoryId, sortBy, minPrice, maxPrice);

  let where = {};
  let orderBy = {};
  if (sortBy) {
    orderBy.salePrice = sortBy;
  }
  if (!sortBy) {
    orderBy = { createdAt: 'desc' };
  }
  // Add conditions to the where object based on query parameters
  if (minPrice) {
    where.salePrice = { ...where.salePrice, gte: parseFloat(minPrice) };
  }
  if (maxPrice) {
    where.salePrice = { ...where.salePrice, lte: parseFloat(maxPrice) };
  }

  try {
    totalLength = await db.product.count({
      where: {
        ...where,
        OR: [
          {
            title: { contains: searchTerm, mode: 'insensitive' },
          },
        ],
      },
    });

    products = await db.product.findMany({
      where: {
        ...where,
        OR: [
          {
            title: { contains: searchTerm, mode: 'insensitive' },
          },
        ],
      },
      skip: (parseInt(page) - 1) * parseInt(pageSize),
      take: parseInt(pageSize),
      orderBy,
    });

    return NextResponse.json({ products, totalLength });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Products', error },
      { status: 500 },
    );
  }
}
