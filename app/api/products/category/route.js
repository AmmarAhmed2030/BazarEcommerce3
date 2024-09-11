import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const categoryId = request.nextUrl.searchParams.get('catId');
  const sortBy = request.nextUrl.searchParams.get('sort');
  const minPrice = request.nextUrl.searchParams.get('min');
  const maxPrice = request.nextUrl.searchParams.get('max');
  const page = request.nextUrl.searchParams.get('page');
  const pageSize = 3;
  console.log(categoryId, sortBy, minPrice, maxPrice);
  let products = [];
  let where = {};
  // Add conditions to the where object based on query parameters
  if (minPrice) {
    where.salePrice = { ...where.salePrice, gte: parseFloat(minPrice) };
  }
  if (maxPrice) {
    where.salePrice = { ...where.salePrice, lte: parseFloat(maxPrice) };
  }
  if (categoryId !== undefined) {
    where.categoryId = categoryId;
  }
  try {
    if (sortBy && page) {
      products = await db.product.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: { salePrice: sortBy },
      });
    } else if (page && !sortBy) {
      products = await db.product.findMany({
        where,
        skip: (parseInt(page) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
        orderBy: { createdAt: 'desc' },
      });
    } else if (sortBy && !page) {
      products = await db.product.findMany({
        where,
        orderBy: { salePrice: sortBy },
      });
    } else {
      products = await db.product.findMany({
        orderBy: { createdAt: 'desc' },
        where,
      });
    }
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Products', error },
      { status: 500 },
    );
  }
}
