'use client';

import { Checkbox } from '@/components/ui/checkbox';

import DateColumn from '@/components/DataTableColumns/DateColumn';
import ImageColumn from '@/components/DataTableColumns/ImageColumn';
import SortableColumn from '@/components/DataTableColumns/SortableColumn';
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
    accessorKey: 'logoUrl',
    header: 'Market Logo',
    cell: ({ row }) => <ImageColumn row={row} imageTitle="logoUrl" />,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  {
    accessorKey: 'isActive',
    header: 'Active',
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
      const market = row.original;
      return (
        <ActionColumn
          title="market"
          row={row}
          editable={true}
          view={false}
          endpoint={`markets/${market.id}`}
          editEndpoint={`markets/update/${market.id}`}
        />
      );
    },
  },
];
