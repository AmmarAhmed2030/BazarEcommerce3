import { columns } from './columns';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function Sales() {
  //Heading
  //Table

  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const role = session?.user?.role;

  const id = session?.user?.id;
  const allSales = await getData('/sales');
  const farmerSales = allSales.filter((sale) => sale.vendorId === id);
  return (
    <div className="flex flex-col gap-6 px-4 mx-auto max-w-[325px] xs:max-w-[480px] sm:max-w-[650px] md:max-w-[1000px]  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl  overflow-scroll">
      <div className="py-8">
        {role === 'ADMIN' ? (
          <DataTable
            data={allSales}
            columns={columns}
            filterKeys={['productTitle', 'productPrice', 'productQty']}
          />
        ) : (
          <DataTable
            data={farmerSales}
            columns={columns}
            filterKeys={['productTitle', 'productPrice', 'productQty']}
          />
        )}
      </div>
    </div>
  );
}
