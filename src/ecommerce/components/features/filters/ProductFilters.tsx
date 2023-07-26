import useBreadcrumbs from './Breadcrumbs';
import BrandFilter from './BrandFilter';
import StyleFilter from './StyleFilter';

const ProductFilters = (): JSX.Element => {
  return (
    <section className="productFilters">
      <div className="productFilters__panel">{useBreadcrumbs()}</div>
      <div className="productFilters__panel">
        {StyleFilter()}
        {BrandFilter()}
      </div>
    </section>
  );
};

export default ProductFilters;
