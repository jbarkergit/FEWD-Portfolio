import useBreadcrumbs from '../../hooks/useBreadcrumbs';

const ProductDisplayFilter = () => {
  return (
    <section className="productFilters flexBox">
      <div className="productFilters--half">{useBreadcrumbs()}</div>
      <div className="productFilters--half">
        <span className="productFilters--half__button flexBox justifyEnd">
          <button role="button">
            <i className="fa-solid fa-grip-vertical"></i>
          </button>
          <button role="button">
            <i className="fa-solid fa-grip"></i>
          </button>
          <button role="button">
            <i className="fa-solid fa-list"></i>
          </button>
        </span>
      </div>
    </section>
  );
};

export default ProductDisplayFilter;
