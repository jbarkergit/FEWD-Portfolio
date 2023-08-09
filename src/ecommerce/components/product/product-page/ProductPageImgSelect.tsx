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
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M19 9v6a7 7 0 1 1-14 0V9a7 7 0 0 1 14 0Zm-7-4.75a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"
          />
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
