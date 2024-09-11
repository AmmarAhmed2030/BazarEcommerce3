import PriceFilter from './PriceFilter';

export default function Filters({ slug, isSearch }) {
  return (
    <div>
      <PriceFilter slug={slug} isSearch={isSearch} />
    </div>
  );
}
