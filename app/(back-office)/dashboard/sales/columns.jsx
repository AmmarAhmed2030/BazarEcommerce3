'use client';

import { Checkbox } from '@/components/ui/checkbox';

import SortableColumn from '@/components/DataTableColumns/SortableColumn';
import DateColumn from '@/components/DataTableColumns/DateColumn';
import ImageColumn from '@/components/DataTableColumns/ImageColumn';

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
    accessorKey: 'productImage',
    header: 'Product Image',
    cell: ({ row }) => <ImageColumn row={row} imageTitle="productImage" />,
  },
  {
    accessorKey: 'productTitle',
    header: ({ column }) => (
      <SortableColumn column={column} title="Product Title" />
    ),
  },
  {
    accessorKey: 'productPrice',
    header: 'Price',
  },

  {
    accessorKey: 'productQty',
    header: 'Quantity',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },

  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => <DateColumn row={row} title="createdAt" />,
  },
];
