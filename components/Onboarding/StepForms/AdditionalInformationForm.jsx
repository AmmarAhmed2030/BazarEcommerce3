import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import NavButtons from './NavButtons';
import {
  setCurrentStep,
  updateOnboardingFormData,
} from '@/redux/slices/onboardingSlice';
import ImageInput from '@/components/FormInputs/ImageInput';
import TextareaInput from '@/components/FormInputs/TextAreaInput';

export default function AdditionalInformationForm() {
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData,
  );
  const [imageUrl, setImageUrl] = useState(
    existingFormData?.imageUrl ? existingFormData.imageUrl : '',
  );
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);

  console.log('existingFormData from additional ', existingFormData);
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
    console.log('data from additional', data);
    data.profileImageUrl = imageUrl;
    dispatch(updateOnboardingFormData(data));

    dispatch(setCurrentStep(currentStep + 1));
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Additional Information
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerImageUploader"
          label="Farmer Profile Image"
        />
        <TextareaInput
          label="Farmer's Payment Terms"
          name="terms"
          register={register('terms', {
            required: false,
            minLength: {
              value: 30,
              message: 'Terms must be at least 30 letters',
            },
          })}
          errors={errors}
          isRequired={false}
        />
        <TextareaInput
          label="Notes"
          name="notes"
          register={register('notes', {
            required: false,
            minLength: {
              value: 30,
              message: 'Notes must be at least 30 letters',
            },
          })}
          errors={errors}
          isRequired={false}
        />
      </div>
      <NavButtons />
    </form>
  );
}
