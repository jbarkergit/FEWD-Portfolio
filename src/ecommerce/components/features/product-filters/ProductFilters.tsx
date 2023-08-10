import useBreadcrumbs from '../../../hooks/useBreadcrumbs';
import BrandFilter from './BrandFilter';
import PolarPatternFilter from './PolarPatternFilter';
import WearStyleFilter from './WearStyleFilter';

const ProductFilters = (): JSX.Element => {
  return (
    <section className="productFilters">
      <div className="productFilters__panel">{useBreadcrumbs()}</div>
      <div className="productFilters__panel">
        <PolarPatternFilter />
        <WearStyleFilter />
        <BrandFilter />
      </div>
    </section>
  );
};

export default ProductFilters;
