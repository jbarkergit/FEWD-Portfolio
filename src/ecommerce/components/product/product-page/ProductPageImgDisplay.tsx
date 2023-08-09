import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../../../types/ProductType';

type PropType = {
  findProduct: ProductType;
  activeDisplay: number;
  setActiveDisplay: Dispatch<SetStateAction<number>>;
};

const ProductPageImgDisplay = ({ findProduct, activeDisplay, setActiveDisplay }: PropType) => {
  const { company, images, unit } = findProduct;
  const lastSlide = findProduct.images!.length - 1;

  return (
    <div className="skuPage__grid__display">
      <div className="skuPage__grid__display__heading">
        {company} {unit}
      </div>
      <picture>
        <img src={images![activeDisplay]} alt={company + unit} loading="lazy" role="presentation" decoding="async" fetchpriority="high" />
      </picture>
      {images!.length === 1 ? null : (
        <div className="skuPage__grid__display__nav">
          <button onClick={() => (activeDisplay === 0 ? setActiveDisplay(lastSlide) : setActiveDisplay(activeDisplay - 1))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m8.165 11.63l6.63-6.43C15.21 4.799 16 5.042 16 5.57v12.86c0 .528-.79.771-1.205.37l-6.63-6.43a.499.499 0 0 1 0-.74Z"
              ></path>
            </svg>
            Previous Image
          </button>
          <button onClick={() => (activeDisplay === lastSlide ? setActiveDisplay(1) : setActiveDisplay(activeDisplay + 1))}>
            Next Image
            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 0 0 0-.74Z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
export default ProductPageImgDisplay;
