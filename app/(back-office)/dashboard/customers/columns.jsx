'use client';

import { Checkbox } from '@/components/ui/checkbox';

import SortableColumn from '@/components/DataTableColumns/SortableColumn';
import DateColumn from '@/components/DataTableColumns/DateColumn';
import ActionColumn from '@/components/DataTableColumns/ActionColumn';

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
    header: 'Email',
  },

  {
    accessorKey: 'role',
    header: 'Role',
  },

  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => <DateColumn row={row} title="createdAt" />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <ActionColumn
          title="customer"
          row={row}
          editable={false}
          view={true}
          endpoint={`customers/${customer.id}`}
          viewEndpoint={`customers/view/${customer.id}`}
        />
      );
    },
  },
];
