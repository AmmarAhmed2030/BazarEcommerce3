import { LayoutDashboard, LogOut, Settings, User2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Image from 'next/image';
import { generateFirstLetter } from '@/lib/generateFirstLetter';
import CustomLink from './frontend/CustomLink';

export default function UserAvatar2({ handleLogout, session }) {
  const [isOpen, setIsOpen] = useState(false);

  const name = session?.user?.name;
  const id = session?.user?.id;
  const role = session?.user?.role;
  const image = session?.user?.image;
  console.log(id);
  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="border-none outline-none">
        <div>
          {image ? (
            <Image
              src={image}
              width={200}
              height={200}
              alt="user profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="bg-lime-700 font-semibold w-10 h-10 rounded-full text-slate-50 text-center text-2xl py-1">
              {generateFirstLetter(name)}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 pr-8 ">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={closeDropdown}>
          <CustomLink
            href={
              role === 'FARMER'
                ? `/farmers/viewProfile/${id}`
                : `/users/viewProfile/${id}`
            }
            className="flex items-center space-x-3 "
          >
            <User2 className="mr-2 h-4 w-4" />
            <span>Your Profile</span>
          </CustomLink>
        </DropdownMenuItem>

        {role !== 'USER' && (
          <DropdownMenuItem onClick={closeDropdown}>
            <CustomLink
              href="/dashboard"
              className="flex items-center space-x-3 "
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CustomLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={closeDropdown}>
          <CustomLink
            href={
              role === 'FARMER'
                ? `/dashboard/farmers/update/${id}`
                : `/users/update/${id}`
            }
            className="flex items-center space-x-3 "
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </CustomLink>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={closeDropdown}>
          <CustomLink href="/orders" className="flex items-center space-x-3 ">
            <Settings className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </CustomLink>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            closeDropdown();
            handleLogout();
          }}
        >
          <button className="flex items-center space-x-3 ">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
