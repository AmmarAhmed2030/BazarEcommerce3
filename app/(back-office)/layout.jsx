'use client';
import Navbar from '@/components/backoffice/Navbar';
import Sidebar from '@/components/backoffice/Sidebar';
import { useSession } from 'next-auth/react';
import Loading from '../loading';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const loading = useSelector((state) => state.loading);
  const { data: session, status } = useSession();
  if (!session) {
    return <Loading />;
  }
  console.log(loading);
  return (
    <div className="flex">
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        session={session}
      />

      <div className={'flex-grow bg-slate-100 min-h-screen'}>
        <Navbar
          status={status}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        {loading ? (
          <Loading />
        ) : (
          <main
            className={
              showSidebar
                ? 'p-0 lg:p-8 py-8 bg-slate-100 dark:bg-slate-900  text-slate-800 dark:text-slate-50 min-h-screen mt-16'
                : 'p-0 lg:p-8 py-8  bg-slate-100 dark:bg-slate-900  text-slate-800 dark:text-slate-50 min-h-screen mt-16'
            }
          >
            {children}
          </main>
        )}
      </div>
    </div>
  );
}
