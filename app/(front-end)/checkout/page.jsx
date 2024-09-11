'use client';
import StepForm from '@/components/Checkout/StepForm';
import Steps from '@/components/Checkout/Steps';

export default function page() {
  const steps = [
    {
      number: 1,
      title: 'Personal Details',
    },
    {
      number: 2,
      title: 'Shipping Details',
    },
    {
      number: 3,
      title: 'Payment Method',
    },
    {
      number: 4,
      title: 'Order Summary',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen px-4">
      <div className="max-w-3xl mx-auto my-6 bg-white border border-slate-700 dark:bg-slate-950 p-6 rounded-lg">
        <Steps steps={steps} />
        <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* <CartBanner /> */}
          <StepForm />
        </div>
      </div>
    </div>
  );
}
