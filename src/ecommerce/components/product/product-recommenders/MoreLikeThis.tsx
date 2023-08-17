import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from '../../../types/ProductType';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { useEffect, useRef, useState } from 'react';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

type MoreLikeThisType = {
  findProduct: ProductType;
};

const MoreLikeThis = ({ findProduct }: MoreLikeThisType): JSX.Element => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();
  const filteredRecommenders = ProductDatabase.filter((product) => product.sku !== findProduct.sku).splice(0, 8); //Product for product page
  const [imageArrayLengths, setImageArrayLengths] = useState<number[]>([]); //Image array max index
  const [imageIndexes, setImageIndexes] = useState<number[]>(new Array(filteredRecommenders.length).fill(0)); //Current image indexes for iteration
  const imageRefs = useRef<Array<HTMLImageElement | null>>(new Array(filteredRecommenders.length).fill(null)); //Reference to image refs for animation

  //Get image array lengths to reset image index when the last index is met
  useEffect(() => {
    const newImageLengths: number[] = []; //Immutibility best practice
    filteredRecommenders.forEach((product) => newImageLengths.push(product.images!.length)); //Push lengths into new array
    setImageArrayLengths(newImageLengths); //Set newImageLengths to useState when finished with for loop
  }, [categoryFilter]);

  //Animations
  const fadeOutAnimation = () =>
    imageRefs.current.forEach((image) => {
      image?.classList.add('fadeOut');
    });
  const fadeInAnimation = () =>
    imageRefs.current.forEach((image) => {
      image?.classList.remove('fadeOut');
    });

  //Update image indexes
  const updateImageIndex = () =>
    setImageIndexes((prevIndexes) => {
      const newIndexes = prevIndexes.map((prevIndex, index) => {
        return prevIndex === imageArrayLengths[index] - 1 ? 0 : prevIndex + 1;
      });
      return newIndexes;
    });

  //Fire animations and index updates on loop
  useEffect(() => {
    const interval = setInterval(() => {
      fadeOutAnimation();
      setTimeout(() => updateImageIndex(), 450);
      setTimeout(() => fadeInAnimation(), 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, [imageIndexes, imageArrayLengths]);

  return (
    <section className="recommenders" style={{ backgroundColor: 'transparent' }}>
      <h2 className="recommenders__header">
        More {findProduct.category}s like <span className="highlight">{findProduct.unit}</span>
      </h2>
      <ul className="recommenders__unorderedList">
        {filteredRecommenders.map((product, index) => (
          <li key={uuidv4()} className="recommenders__unorderedList__item">
            <Link to={`/ecommerce/product/${product.sku}`} onClick={() => window.scrollTo({ top: 0 })}>
              <article>
                <picture>
                  <img
                    className=""
                    src={product.images![imageIndexes[index]]}
                    alt={`${product.company} ${product.unit}`}
                    ref={(element) => (imageRefs.current[index] = element)}
                    decoding="async"
                    fetchpriority="high"
                    loading="lazy"
                  />
                </picture>
                <hgroup>
                  <h3>{product.company}</h3>
                  <h2>{product.unit}</h2>
                  <h4>Starting at {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
                </hgroup>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default MoreLikeThis;
