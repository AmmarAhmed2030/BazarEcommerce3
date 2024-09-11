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
    accessorKey: 'imageUrl',
    header: 'Product Image',
    cell: ({ row }) => <ImageColumn row={row} imageTitle="imageUrl" />,
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
      const product = row.original;
      return (
        <ActionColumn
          title="Product"
          row={row}
          editable={true}
          endpoint={`products/${product.id}`}
          editEndpoint={`products/update/${product.id}`}
        />
      );
    },
  },
];
