import FormHeader from '@/components/backoffice/FormHeader';
import NewFarmerForm from '@/components/backoffice/Forms/NewFarmerForm';
import React from 'react';

export default function NewFarmer() {
  return (
    <div>
      <FormHeader title="New Farmer" />
      <NewFarmerForm />
    </div>
  );
}
