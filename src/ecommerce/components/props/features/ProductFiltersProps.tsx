type ProductFiltersPropsTypes = {
  filterCategory: string;
  filterSubCategory: string;
};

const ProductFiltersProps = ({ filterCategory, filterSubCategory }: ProductFiltersPropsTypes) => {
  return (
    <li role="tablist">
      <div
        className="productFilters flexBox flexColumn"
        role="presentation"
        data-role="collapsible"
        data-collapsible="true"
      >
        <div
          className="productFilters__category flexBox justifyEnd"
          role="tab"
          tab-index=""
          data-role="title"
          aria-selected="false"
          aria-expanded="false"
        >
          <span>
            <a href="">{filterCategory}</a>
          </span>
          <span>
            <i className="fa-solid fa-plus"></i>
            <i className="fa-solid fa-minus"></i>
          </span>
        </div>
        <div
          className="productFilters__subCategory flexBox justifyEnd"
          role="tabpanel"
          data-role="content"
          aria-hidden="false"
        >
          <span>
            <a href="">{filterSubCategory}</a>
          </span>
        </div>
      </div>
    </li>
  );
};

export default ProductFiltersProps;
