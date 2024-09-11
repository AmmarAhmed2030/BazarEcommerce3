'use client';

import { Checkbox } from '@/components/ui/checkbox';

import SortableColumn from '@/components/DataTableColumns/SortableColumn';
import ActionColumn from '@/components/DataTableColumns/ActionColumn';
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
    accessorKey: 'imageUrl',
    header: 'Category Image',
    cell: ({ row }) => <ImageColumn row={row} imageTitle="imageUrl" />,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const link = row.getValue('link');

      return <div className="line-clamp-1">{link}</div>;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'IsActive',
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
      const banner = row.original;
      return (
        <ActionColumn
          title="banner"
          row={row}
          view={false}
          editable={true}
          endpoint={`banners/${banner.id}`}
          editEndpoint={`banners/update/${banner.id}`}
        />
      );
    },
  },
];
