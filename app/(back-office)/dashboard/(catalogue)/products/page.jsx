import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import { columns } from './columns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { adminColumns } from './adminColumns';

export default async function Products() {
  //Heading
  //Table
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const role = session?.user?.role;
  const allProducts = await getData('products');
  const id = session?.user?.id;
  const farmerProducts = allProducts.filter((product) => product.userId === id);
  console.log('role : ', role);
  console.log('farmer product', farmerProducts);
  console.log(id);
  return (
    <div className="flex flex-col gap-6 px-4 mx-auto max-w-[325px] xs:max-w-[480px] sm:max-w-[650px] md:max-w-[1000px]  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl  overflow-auto">
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />
      <div className="py-8">
        {role === 'ADMIN' ? (
          <DataTable
            data={allProducts}
            columns={adminColumns}
            filterKeys={['title']}
          />
        ) : (
          <DataTable
            data={farmerProducts}
            columns={columns}
            filterKeys={['title']}
          />
        )}
      </div>
    </div>
  );
}
