'use client';
import React from 'react';
import SearchForm from './SearchForm';
import Link from 'next/link';
import { User2 } from 'lucide-react';
import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
import CartCount from './CartCount';
import UserAvatar from '../backoffice/UserAvatar';

import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { status } = useSession();
  return (
    <div className="bg-white dark:bg-slate-700 pb-3 md:pb-0  px-4  flex-col">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto gap-2 md:gap-8">
        {' '}
        <Link href="/" className="items-center py-2  flex">
          <p
            style={{
              fontFamily: 'Pacifico, cursive',
              fontWeight: 400,
              fontStyle: 'normal',
            }}
            className="tracking-[2px]  pr-2 text-xl items-center text-lime-600 hover:text-lime-800 transition-all duration-500"
          >
            BAZAR
          </p>
        </Link>
        <div className="flex-grow hidden md:block">
          <SearchForm />
        </div>
        {/* <HelpModal /> */}
        <div className="flex gap-2 md:gap-4">
          <CartCount />
        </div>
        <ThemeSwitcherBtn />
        {status === 'authenticated' ? (
          <UserAvatar />
        ) : (
          <Link
            href="/login"
            className="flex items-center space-x-1 text-green-950 dark:text-slate-100"
          >
            <User2 />
            <span>Login</span>
          </Link>
        )}
      </div>
      <div className="md:hidden ">
        <SearchForm />
      </div>
    </div>
  );
}
