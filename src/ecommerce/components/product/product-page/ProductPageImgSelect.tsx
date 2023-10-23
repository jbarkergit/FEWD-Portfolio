import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../../../types/ProductType';

type PropType = {
  findProduct: ProductType;
  setActiveDisplay: Dispatch<SetStateAction<number>>;
};

const ProductPageImgSelect = ({ findProduct, setActiveDisplay }: PropType) => {
  const { company, images, unit } = findProduct;

  return (
    <aside className='skuPage__grid__imgSelection'>
      <figure>
        {images?.small.map((image, index) => (
          <picture key={image}>
            <img src={image} alt={company + unit} decoding='async' fetchpriority='high' onClick={() => setActiveDisplay(index)} />
            <figcaption>{`${company} ${unit}`}</figcaption>
          </picture>
        ))}
      </figure>
    </aside>
  );
};

export default ProductPageImgSelect;
