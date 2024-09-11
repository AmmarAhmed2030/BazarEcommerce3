import FormHeader from '@/components/backoffice/FormHeader';
import NewCategoryForm from '@/components/backoffice/Forms/NewCategoryForm';

export default function NewCategory() {
  return (
    <div>
      <FormHeader title="New Category" />
      <NewCategoryForm />
    </div>
  );
}
