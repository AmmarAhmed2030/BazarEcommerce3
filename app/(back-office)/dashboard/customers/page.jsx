import { columns } from './columns';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';

export default async function Customers() {
  //Heading
  //Table

  const users = await getData('customers');
  const customers = users.filter((user) => user.role === 'USER');
  return (
    <div className="flex flex-col gap-6 px-4 mx-auto max-w-[325px] xs:max-w-[480px] sm:max-w-[650px] md:max-w-[1000px]  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl  overflow-auto">
      <div className="py-8">
        <DataTable
          data={customers}
          columns={columns}
          filterKeys={['name', 'email']}
        />
      </div>
    </div>
  );
}
