type ProductFilterDisplayTypes = {
  pageTitle: string;
};

const ProductFilterDisplay = ({ pageTitle }: ProductFilterDisplayTypes) => {
  return (
    <div className="btnFilters flexBox">
      <span className="btnFilters__icon">
        <h2>{pageTitle}</h2>
      </span>
      <span className="btnFilters__icon flexBox justifyEnd">
        <i className="fa-solid fa-grip-vertical"></i>
        <i className="fa-solid fa-grip"></i>
        <i className="fa-solid fa-bars"></i>
      </span>
    </div>
  );
};
export default ProductFilterDisplay;
