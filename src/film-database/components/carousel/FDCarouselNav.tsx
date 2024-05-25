import { useEffect, useState } from 'react';
import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';

type Type_PropDrill = { paginate: (paginationIndex: number) => void; maxPaginationIndex: number | undefined };

const FDCarouselNav = ({ paginate, maxPaginationIndex }: Type_PropDrill) => {
  const [carouselNavIndex, setCarouselNavIndex] = useState<number>(1);
  useEffect(() => paginate(carouselNavIndex), [carouselNavIndex]);

  return (
    <nav className='fdMedia__carousel__wrapper__navigation'>
      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show Previous'
        onClick={() => {
          if (maxPaginationIndex)
            setCarouselNavIndex((prevIndex) => {
              const clampedIndex: number = Math.max(1, Math.min(prevIndex - 1, maxPaginationIndex));
              return prevIndex === 1 ? maxPaginationIndex : clampedIndex;
            });
        }}>
        <figure>
          <picture>
            <MaterialLeftCaret />
            <figcaption>{'Show Previous Selection'}</figcaption>
          </picture>
        </figure>
      </button>

      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show More'
        onClick={() => {
          if (maxPaginationIndex)
            setCarouselNavIndex((prevIndex) => {
              const clampedIndex: number = Math.max(1, Math.min(prevIndex + 1, maxPaginationIndex));
              return prevIndex === maxPaginationIndex ? 1 : clampedIndex;
            });
        }}>
        <figure>
          <picture>
            <MaterialRightCaret />
            <figcaption>{'Show More'}</figcaption>
          </picture>
        </figure>
      </button>
    </nav>
  );
};

export default FDCarouselNav;
