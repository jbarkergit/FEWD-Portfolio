import { useEffect, useRef, useState } from 'react';
import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';

type Type_PropDrill = { paginate: (paginationIndex: number) => void; maxPaginationIndex: number | undefined };

const FDCarouselNav = ({ paginate, maxPaginationIndex }: Type_PropDrill) => {
  const [carouselNavIndex, setCarouselNavIndex] = useState<number>(1);
  useEffect(() => paginate(carouselNavIndex), [carouselNavIndex]);

  const decrement = () => {
    if (maxPaginationIndex)
      setCarouselNavIndex((prevIndex) => {
        const clampedIndex: number = Math.max(1, Math.min(prevIndex - 1, maxPaginationIndex));
        return prevIndex === 1 ? maxPaginationIndex : clampedIndex;
      });
  };

  const increment = () => {
    if (maxPaginationIndex)
      setCarouselNavIndex((prevIndex) => {
        const clampedIndex: number = Math.max(1, Math.min(prevIndex + 1, maxPaginationIndex));
        return prevIndex === maxPaginationIndex ? 1 : clampedIndex;
      });
  };

  const decrementRef = useRef<HTMLButtonElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    decrementRef.current?.addEventListener('pointerup', decrement);
    incrementRef.current?.addEventListener('pointerup', increment);

    return () => {
      decrementRef.current?.removeEventListener('pointerup', decrement);
      incrementRef.current?.removeEventListener('pointerup', increment);
    };
  }, []);

  return (
    <nav className='fdMedia__carousel__wrapper__navigation'>
      <button className='fdMedia__carousel__wrapper__navigation--button' aria-label='Show Previous' ref={decrementRef}>
        <figure>
          <picture>
            <MaterialLeftCaret />
            <figcaption>{'Show Previous Selection'}</figcaption>
          </picture>
        </figure>
      </button>

      <button className='fdMedia__carousel__wrapper__navigation--button' aria-label='Show More' ref={incrementRef}>
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
