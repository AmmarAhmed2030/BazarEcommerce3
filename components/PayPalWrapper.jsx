'use client';
import PayPalButton from '@/components/PayPalButton';

export default function PayPalWrapper({ amount }) {
  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-50 p-8 flex items-center justify-center min-h-screen">
      <PayPalButton amount={amount} />
    </div>
  );
}
