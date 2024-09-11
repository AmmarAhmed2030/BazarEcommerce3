import PageHeader from '@/components/backoffice/PageHeader';
import { columns } from './columns';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';

export default async function page() {
  //Heading
  //Table
  const categories = await getData('categories');
  return (
    <div className="flex flex-col gap-6 px-4 mx-auto max-w-[325px] xs:max-w-[480px] sm:max-w-[650px] md:max-w-[1000px]  lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-3xl 4xl:max-w-4xl 5xl:max-w-5xl 6xl:max-w-6xl  overflow-auto">
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />

      <div className="py-8">
        <DataTable data={categories} columns={columns} filterKeys={['title']} />
      </div>
    </div>
  );
}
