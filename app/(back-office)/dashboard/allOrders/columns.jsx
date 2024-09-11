'use client';

import { Checkbox } from '@/components/ui/checkbox';

import DateColumn from '@/components/DataTableColumns/DateColumn';
import SortableColumn from '@/components/DataTableColumns/SortableColumn';
import ActionColumn from '@/components/DataTableColumns/ActionColumn';
import OrderStatus from '@/components/DataTableColumns/OrderStatusColumn';
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
    accessorKey: 'firstName',
    header: ({ column }) => (
      <SortableColumn column={column} title="Customer Name" />
    ),
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order Number',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },

  {
    accessorKey: 'orderStatus',
    header: 'Pending',
    cell: ({ row }) => <OrderStatus row={row} accessorKey="orderStatus" />,
  },
  {
    accessorKey: 'createdAt',
    header: 'Order Date',
    cell: ({ row }) => <DateColumn row={row} title="createdAt" />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const order = row.original;

      return (
        <ActionColumn
          title="Order"
          row={row}
          view={false}
          editable={false}
          endpoint={`orders/${order.id}`}
        />
      );
    },
  },
];
