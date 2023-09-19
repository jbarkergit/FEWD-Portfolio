import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../../../../types/ProductType';
import { v4 as uuidv4 } from 'uuid';

type PropType = {
  findProduct: ProductType;
  setActiveDisplay: Dispatch<SetStateAction<number>>;
};

const ProductPageImgSelect = ({ findProduct, setActiveDisplay }: PropType) => {
  const { company, images, unit } = findProduct;

  return (
    <aside className='skuPage__grid__imgSelection'>
      <div className='skuPage__grid__imgSelection__images'>
        <picture>
          {images!.map((image, index) => (
            <img src={image} alt={company + unit} role='presentation' decoding='async' fetchpriority='high' onClick={() => setActiveDisplay(index)} key={uuidv4()} />
          ))}
        </picture>
      </div>
    </aside>
  );
};

export default ProductPageImgSelect;
