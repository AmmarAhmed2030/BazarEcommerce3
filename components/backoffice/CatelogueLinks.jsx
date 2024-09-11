import Link from 'next/link';
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronDown, ChevronRight, Slack } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenMenu } from '@/redux/slices/menuSlice';
import { setSidebarVisibility } from '@/redux/slices/sidebarSlice';
import { usePathname } from 'next/navigation';

export default function CatelogueLinks({ catalogueLinks }) {
  const openMenu = useSelector((state) => state.menu.openMenu);
  const dispatch = useDispatch();
  const pathname = usePathname();

  return (
    <Collapsible className="px-6">
      <CollapsibleTrigger onClick={() => dispatch(setOpenMenu(!openMenu))}>
        <div className="flex items-center space-x-6 py-2">
          <div className="flex items-center space-x-3">
            <Slack />
            <span>Catalogue</span>
          </div>
          {openMenu ? <ChevronDown /> : <ChevronRight />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pl-6 py-3 dark:bg-slate-800 rounded-lg">
        {catalogueLinks.map((item, index) => {
          return (
            <Link
              onClick={() => dispatch(setSidebarVisibility(false))}
              key={index}
              href={item.href}
              className={
                item.href === pathname
                  ? 'flex items-center space-x-3 py-1 text-sm text-green-600'
                  : 'flex items-center space-x-3 py-1   '
              }
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
