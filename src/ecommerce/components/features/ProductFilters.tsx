import { ProductDatabase } from '../../data/ProductDatabase';

const companyFilters = () => {
  const getCompanies = [...new Set(ProductDatabase.map((product) => product.company))];
  return (
    <>
      {getCompanies
        .sort((a, b) => (a > b ? 1 : -1))
        .map((company) => (
          <button className="flexBox" key={company}>
            {company}
          </button>
        ))}
    </>
  );
};

const ProductFilters = () => {
  return (
    <div role="tablist">
      <div className="productFilters flexBox flexColumn" role="presentation" data-role="collapsible" data-collapsible="true">
        <div
          className="productFilters__category flexBox flexColumn justifyEnd"
          role="tab"
          tab-index=""
          data-role="title"
          aria-selected="false"
          aria-expanded="false"
        >
          <h3>Sort By</h3>
          <span>
            <h4>Company</h4>
            {companyFilters()}
          </span>
          <span>
            <button>Price ($ - $$$$)</button>
          </span>
          <span>
            <button>Price ($$$$ - $)</button>
          </span>
          <span>
            <button></button>
          </span>
        </div>
        <div className="productFilters__subCategory flexBox justifyEnd" role="tabpanel" data-role="content" aria-hidden="false">
          <span>
            <a href=""></a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
