'use client';
import Footer from '@/components/frontend/Footer';
import Navbar from '@/components/frontend/Navbar';
import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../loading';

export default function Layout({ children }) {
  const loading = useSelector((state) => state.loading);
  console.log('from frontend layout', loading);
  return (
    <div className="bg-white dark:bg-slate-950">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-8 ">{children}</div>
      )}
      <Footer />
    </div>
  );
}
