import FormHeader from '@/components/backoffice/FormHeader';
import NewBannerForm from '@/components/backoffice/Forms/NewBannerForm';
import { getData } from '@/lib/getData';

export default async function UpdateBanner({ params: { id } }) {
  const banner = await getData(`banners/${id}`);
  return (
    <div>
      <FormHeader title="Update Banner" />
      <NewBannerForm updateData={banner} />
    </div>
  );
}
