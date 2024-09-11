'use client';
import { AlignJustify, Library } from 'lucide-react';
import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
import Link from 'next/link';
import UserAvatar from './UserAvatar'; // Function to toggle the state
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/redux/slices/sidebarSlice';

export default function Navbar({ status }) {
  const dispatch = useDispatch();
  const showSidebar = useSelector((store) => store.sidebar.showSidebar);
  const toggle = () => dispatch(toggleSidebar());

  return (
    <div
      className={
        showSidebar
          ? ' flex items-center justify-between px-6 dark:bg-slate-800 bg-white text-slate-50 h-20 py-8 fixed top-0  w-full z-40'
          : ' flex items-center justify-between px-6 dark:bg-slate-800 bg-white text-slate-50 h-20 py-8 fixed top-0 w-full  z-40 '
      }
    >
      <div className="flex space-x-4">
        <button onClick={toggle} className="text-lime-700 dark:text-lime-500">
          {showSidebar ? (
            <Library className="text-lime-600 w-8 h-8" />
          ) : (
            <AlignJustify className="text-lime-600 w-8 h-8" />
          )}
        </button>
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
      </div>
      <div className="flex space-x-4 ">
        <ThemeSwitcherBtn />

        {status === 'authenticated' && <UserAvatar />}
      </div>
    </div>
  );
}
