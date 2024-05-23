import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';

const FDCarouselNav = () => {
  return (
    <nav className='fdMedia__carousel__wrapper__navigation'>
      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show Previous'
        onClick={() => {
          // setCarouselNavIndex((prevIndex) => {
          //   const clampedIndex: number = Math.max(1, Math.min(prevIndex - 1, mapObjMaxIndex));
          //   return prevIndex === 1 ? mapObjMaxIndex : clampedIndex;
          // });
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
          // setCarouselNavIndex((prevIndex) => {
          //   const clampedIndex: number = Math.max(1, Math.min(prevIndex + 1, mapObjMaxIndex));
          //   return prevIndex === mapObjMaxIndex ? 1 : clampedIndex;
          // });
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
