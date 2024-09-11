'use client';

import { Checkbox } from '@/components/ui/checkbox';

import DateColumn from '@/components/DataTableColumns/DateColumn';
import SortableColumn from '@/components/DataTableColumns/SortableColumn';
import ActionColumn from '@/components/DataTableColumns/ActionColumn';
import Status from '@/components/DataTableColumns/StatusColumn';
export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
  },

  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Approved',
    cell: ({ row }) => <Status row={row} accessorKey="status" />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Joining Date',
    cell: ({ row }) => <DateColumn row={row} title="createdAt" />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const farmer = row.original;

      return (
        <ActionColumn
          title="Farmer"
          row={row}
          view={true}
          endpoint={`farmers/${farmer.id}`}
          viewEndpoint={`farmers/view/${farmer.id}`}
        />
      );
    },
  },
];
