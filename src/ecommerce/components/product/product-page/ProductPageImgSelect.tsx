import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../../../types/ProductType';
import { v4 as uuidv4 } from 'uuid';

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
          <picture key={uuidv4()}>
            <img src={image} alt={company + unit} decoding='async' fetchPriority='high' onClick={() => setActiveDisplay(index)} tabIndex={0} />
            <figcaption>{`${company} ${unit}`}</figcaption>
          </picture>
        ))}
      </figure>
    </aside>
  );
};

export default ProductPageImgSelect;
