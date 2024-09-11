import db from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET(request, { params: { id } }) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to get Product', error },
      { status: 500 },
    );
  }
}
export async function DELETE(request, { params: { id } }) {
  //console.log(id);
  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: 'Product Not Found',
        },
        { status: 404 },
      );
    }
    const deletedProduct = await db.product.delete({
      where: { id },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to delete Product', error },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params: { id } }) {
  console.log(id);
  const {
    title,
    slug,
    imageUrl,
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
  } = await request.json();

  try {
    const existingProduct = await db.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      const newProduct = await db.product.create({
        data: {
          title,
          slug,
          imageUrl,
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
      return NextResponse.json({
        data: newProduct,
        message: 'There is no product with this id so we created a new one ',
      });
    }
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        title,
        slug,
        imageUrl,
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
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Failed to update Product', error },
      { status: 500 },
    );
  }
}
