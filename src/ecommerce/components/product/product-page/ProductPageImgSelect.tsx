import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../../../types/ProductType';

type PropType = {
  findProduct: ProductType;
  setActiveDisplay: Dispatch<SetStateAction<number>>;
};

const ProductPageImgSelect = ({ findProduct, setActiveDisplay }: PropType) => {
  const { company, images, unit } = findProduct;

  return (
    <aside className="skuPage__grid__imgSelection">
      <div className="skuPage__grid__imgSelection__nav">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path
            fill="#ffffff"
            d="M19 8.974v6.012C19 18.86 15.866 22 12 22s-7-3.14-7-7.014V8.974A7.01 7.01 0 0 1 11.25 2v3.385c-.591.282-1 .886-1 1.585v2.004c0 .969.784 1.754 1.75 1.754s1.75-.785 1.75-1.754V6.97c0-.7-.409-1.303-1-1.585V2A7.01 7.01 0 0 1 19 8.974Z"
          ></path>
        </svg>
      </div>
      <div className="skuPage__grid__imgSelection__images">
        {images!.map((image, index) => (
          <picture key={image} onClick={() => setActiveDisplay(index)}>
            <img src={image} alt={company + unit} role="presentation" decoding="async" fetchpriority="high" />
          </picture>
        ))}
      </div>
    </aside>
  );
};

export default ProductPageImgSelect;
