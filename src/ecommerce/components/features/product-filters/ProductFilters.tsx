import useBreadcrumbs from '../../../hooks/useBreadcrumbs';
import BrandFilter from './BrandFilter';
import PolarPatternFilter from './PolarPatternFilter';
import StyleFilter from './StyleFilter';

const ProductFilters = (): JSX.Element => {
  return (
    <section className="productFilters">
      <div className="productFilters__panel">{useBreadcrumbs()}</div>
      <div className="productFilters__panel">
        <PolarPatternFilter />
        <StyleFilter />
        <BrandFilter />
      </div>
    </section>
  );
};

export default ProductFilters;
