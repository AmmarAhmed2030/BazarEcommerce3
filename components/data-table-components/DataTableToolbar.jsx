'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import DataTableViewOptions from './DataTableViewOptions';
import { X } from 'lucide-react';

export default function DataTableToolbar({ table, filterKeys }) {
  const isFiltered = filterKeys.some(
    (key) => table.getState().columnFilters[key]?.length > 0,
  );

  const handleInputChange = (key, value) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue('');
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-wrap space-y-4 items-center space-x-2">
        {filterKeys.map((key) => (
          <Input
            key={key}
            placeholder={`Filter ${key}...`}
            value={table.getColumn(key)?.getFilterValue() ?? ''}
            onChange={(event) => handleInputChange(key, event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
