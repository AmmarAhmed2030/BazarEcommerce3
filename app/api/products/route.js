import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const {
      title,
      slug,

      sku,
      barcode,
      description,
      isActive,
      productPrice,
      salePrice,
      tags,
      isWholesale,
      unit,
      wholesalePrice,
      wholesaleQty,
      productStock,
      qty,
      productCode,
      farmerId,
      categoryId,
      productImages,
    } = await request.json();

    const existingProduct = await db.product.findUnique({
      where: {
        slug,
      },
    });
    if (existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: 'Product already exists',
        },
        { status: 409 },
      );
    }
    const newProduct = await db.product.create({
      data: {
        title,
        slug,
        productImages,
        imageUrl: productImages[0],
        sku,
        barcode,
        description,
        isActive,
        productPrice: parseFloat(productPrice),
        salePrice: parseFloat(salePrice),
        tags,
        isWholesale,
        unit,
        wholesalePrice: parseFloat(wholesalePrice),
        wholesaleQty: parseInt(wholesaleQty),
        productStock: parseInt(productStock),
        qty: parseInt(qty),
        productCode,
        userId: farmerId,
        categoryId,
      },
    });
    console.log(newProduct);
    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to create Product', error },
      { status: 500 },
    );
  }
}
export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Products', error },
      { status: 500 },
    );
  }
}
