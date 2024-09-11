import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import NavButtons from './NavButtons';
import TextInput from '@/components/FormInputs/TextInput';
import {
  setCurrentStep,
  updateOnboardingFormData,
} from '@/redux/slices/onboardingSlice';
import ArrayItemsInput from '@/components/FormInputs/ArrayItemsInput';

export default function FarmDetailsForm() {
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData,
  );
  const [products, setProducts] = useState(
    existingFormData.products ? existingFormData.products : [],
  );
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);

  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });

  async function processData(data) {
    data.products = products;
    dispatch(updateOnboardingFormData(data));

    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Farm Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="What is the Size of You Land In Accres"
          name="landSize"
          register={register('landSize', {
            required: 'This field is required',
            valueAsNumber: true,
            validate: {
              positive: (value) =>
                value >= 0 || 'Only positive numbers are allowed',
            },
          })}
          errors={errors}
          className="w-full"
          type="number"
        />

        <TextInput
          label="What is Your Main Crop that you Cultivate"
          name="mainCrop"
          register={register('mainCrop', {
            required: 'Main Crop is required',
            minLength: {
              value: 3,
              message: 'Main Crop must be at least 3 letters',
            },
          })}
          errors={errors}
          className="w-full"
        />
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemsTitle="Product"
        />
      </div>
      <NavButtons />
    </form>
  );
}
