import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import DeleteBtn from '../Actions/DeleteBtn';
import EditBtn from '../Actions/EditBtn';
import ViewBtn from '../Actions/viewBtn';

export default function ActionColumn({
  title,
  endpoint,
  editEndpoint,
  editable = false,
  view = false,
  viewEndpoint,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteBtn title={title} endpoint={endpoint} />
        </DropdownMenuItem>
        {editable && view ? (
          <>
            <DropdownMenuItem>
              <EditBtn title={title} editEndpoint={editEndpoint} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ViewBtn title={title} viewEndpoint={viewEndpoint} />
            </DropdownMenuItem>
          </>
        ) : editable && !view ? (
          <DropdownMenuItem>
            <EditBtn title={title} editEndpoint={editEndpoint} />
          </DropdownMenuItem>
        ) : !editable && view ? (
          <DropdownMenuItem>
            <ViewBtn title={title} viewEndpoint={viewEndpoint} />
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
