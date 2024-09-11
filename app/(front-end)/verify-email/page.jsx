import { getData } from '@/lib/getData';
import { Info } from 'lucide-react';
import React from 'react';

export default async function page({ searchParams }) {
  const { userId } = searchParams;
  const user = await getData(`users/${userId}`);
  console.log(userId, user);

  const { email } = user;
  return (
    <div className="max-w-2xl mx-auto min-h-screen mt-8 ">
      <div
        id="alert-additional-content-1"
        className="p-4 mb-4 text-lime-800 border border-lime-300 rounded-lg bg-lime-50 dark:bg-slate-800 dark:text-lime-400 dark:border-lime-800"
        role="alert"
      >
        <div className="flex items-center">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Email Sent-Verify your account
          </h3>
        </div>
        <div className="my-2 text-sm  py-4 ">
          Thank you for creating an account with US, we have sent you an email
          to <span className="font-bold">{email}</span>, check in you inbox and
          click on the link to complete your onboarding process
          <button className="mx-4 text-white">Change email</button>
        </div>
      </div>
    </div>
  );
}
