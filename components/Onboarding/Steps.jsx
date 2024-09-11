'use client';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Steps({ steps }) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  return (
    <nav className="flex text-sm md:text-xl  mb-8 px-3">
      <ol
        role="list"
        className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
      >
        <li>
          <div className="-m-1">
            <h2 className="inline-flex items-center p-1 text-sm md:text-base font-medium text-slate-500 rounded-md focus:outline-none focus:ring-2 focus:text-slate-900 focus:ring-slate-900 hover:text-lime-700">
              Account
            </h2>
          </div>
        </li>

        {steps.map((step, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 w-4 h-4 text-slate-400" />
                <div className={`-m-1`}>
                  <p
                    className={`p-1 ml-1.5 text-sm md:text-base font-medium text-slate-500 rounded-md focus:outline-none focus:ring-2 focus:text-slate-900 focus:ring-slate-900 ${step.number === currentStep && 'text-lime-600'}`}
                  >
                    {' '}
                    {step.title}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
