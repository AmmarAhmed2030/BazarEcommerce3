import FormHeader from '@/components/backoffice/FormHeader';
import NewBannerForm from '@/components/backoffice/Forms/NewBannerForm';

export default function NewBanner() {
  return (
    <div>
      <FormHeader title="New Banner" />
      <NewBannerForm />
    </div>
  );
}
