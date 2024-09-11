'use client';
import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';
import MultipleImageInput from '@/components/FormInputs/MultipleImageInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import TextInput from '@/components/FormInputs/TextInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { generateSlug } from '@/lib/generateSlug';
import { generateUserCode } from '@/lib/generateUserCode';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewProductForm({
  categories,
  farmers,
  updateData = {},
}) {
  //Heading
  //Table
  const id = updateData?.id ?? '';
  const initialImageUrls = updateData?.imageUrls ?? '';
  const initialTags = updateData?.tags?.length > 0 ? updateData?.tags : [];
  const [productImages, setProductImages] = useState(initialImageUrls);
  const [tags, setTags] = useState(initialTags);

  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });
  const isActive = watch('isActive');
  const isWholesale = watch('isWholesale');
  const router = useRouter();
  function redirect() {
    router.push('/dashboard/products');
  }
  async function onSubmit(data) {
    setLoading(true);
    const slug = generateSlug(data.title);
    const productCode = generateUserCode('ALP', data.title);
    data.slug = slug;
    data.productImages = productImages;
    data.tags = tags;
    data.productCode = productCode;
    data.qty = 1;
    if (id) {
      data.id = id;
      makePutRequest(
        setLoading,
        `/api/products/${id}`,
        data,
        'Product',
        redirect,
      );
      console.log('update Request : ', data);
    } else {
      makePostRequest(
        setLoading,
        '/api/products',
        data,
        'Product',

        reset,
        redirect,
      );
      setProductImages([]);
      setTags([]);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Product Title"
            name="title"
            register={register('title', {
              required: 'Product Title is required',
              minLength: {
                value: 3,
                message: 'Product Title must be at least 3 letters',
              },
            })}
            errors={errors}
          />
          <TextInput
            label="Product SKU"
            name="sku"
            register={register('sku', {
              required: 'SKU is required',
              minLength: {
                value: 3,
                message: 'SKU must be at least 3 letters',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register('barcode', {
              required: 'Barcode is required',
              pattern: {
                value: /^[0-9]{12,13}$/, // Validates 12 or 13 digit numeric barcode
                message: 'Please enter a valid 12 or 13 numeric digit barcode',
              },
            })}
            errors={errors}
            type="number"
            className="w-full"
          />
          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            type="number"
            register={register('productPrice', {
              required: 'This field is required',
              valueAsNumber: true,
              validate: {
                positive: (value) =>
                  value >= 0 || 'Only positive numbers are allowed',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Sale Price (Discounted)"
            name="salePrice"
            type="number"
            register={register('salePrice', {
              required: 'This field is required',
              valueAsNumber: true,
              validate: {
                positive: (value) =>
                  value >= 0 || 'Only positive numbers are allowed',
              },
            })}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Stock"
            name="productStock"
            type="number"
            register={register('productStock', {
              required: 'This field is required',
              valueAsNumber: true,
              validate: {
                positive: (value) =>
                  value >= 0 || 'Only positive numbers are allowed',
              },
            })}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <SelectInput
            label="Select Farmer"
            name="farmerId"
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
          />
          <ToggleInput
            label="Supports Wholesale Selling"
            name="isWholesale"
            isActive={isWholesale}
            trueTitle="Supported"
            falseTitle="Not Supported"
            register={register}
          />
          {isWholesale ? (
            <>
              {' '}
              <TextInput
                label="Wholesale Price"
                name="wholesalePrice"
                type="number"
                register={register('wholesalePrice', {
                  required: 'This field is required',
                  valueAsNumber: true,
                  validate: {
                    positive: (value) =>
                      value >= 0 || 'Only positive numbers are allowed',
                  },
                })}
                errors={errors}
                className="w-full"
              />
              <TextInput
                label="Minimum Wholesale Qty"
                name="wholesaleQty"
                type="number"
                register={register('wholesaleQty', {
                  required: 'This field is required',
                  valueAsNumber: true,
                  validate: {
                    positive: (value) =>
                      value >= 0 || 'Only positive numbers are allowed',
                  },
                })}
                errors={errors}
                className="w-full"
              />
              <TextInput
                label="Unit of Measurement(eg kilograms)"
                name="unit"
                register={register('unit', {
                  required: 'Unit is required',
                  minLength: {
                    value: 3,
                    message: 'Unit must be at least 3 letters',
                  },
                })}
                errors={errors}
              />
            </>
          ) : null}

          <MultipleImageInput
            label="Product Images"
            imageUrls={productImages}
            setImageUrls={setProductImages}
            endpoint="multipleImageUploader"
          />
          <ArrayItemsInput items={tags} setItems={setTags} itemsTitle="Tags" />
          <TextareaInput
            label="Product Description"
            name="description"
            register={register('description', {
              required: 'Description is required',
              minLength: {
                value: 30,
                message: 'Description must be at least 30 letters',
              },
            })}
            errors={errors}
          />
          <ToggleInput
            label="Publish your Product"
            name="isActive"
            isActive={isActive}
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? 'Update Product' : 'Create Product'}
          loadingButtonTitle={`${id ? 'Updating' : 'Creating'} Product please wait...`}
        />
      </form>
    </div>
  );
}
