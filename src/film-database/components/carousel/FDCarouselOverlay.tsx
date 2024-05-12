import { Dispatch, SetStateAction } from 'react';
import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';
import useCreatePicture from '../../hooks/useCreatePicture';

type Type_PropDrill = {
  setCarouselNavIndex: Dispatch<SetStateAction<number>>;
  mapObjMaxIndex: number;
};

const FDCarouselOverlay = ({ setCarouselNavIndex, mapObjMaxIndex }: Type_PropDrill) => {
  return (
    <nav className='fdMedia__carousel__wrapper__navigation'>
      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show Previous'
        onClick={() => {
          setCarouselNavIndex((prevIndex) => {
            const clampedIndex: number = Math.max(1, Math.min(prevIndex - 1, mapObjMaxIndex));
            return prevIndex === 1 ? mapObjMaxIndex : clampedIndex;
          });
        }}>
        {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous Selection' })}
      </button>

      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show More'
        onClick={() => {
          setCarouselNavIndex((prevIndex) => {
            const clampedIndex: number = Math.max(1, Math.min(prevIndex + 1, mapObjMaxIndex));
            return prevIndex === mapObjMaxIndex ? 1 : clampedIndex;
          });
        }}>
        {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
      </button>
    </nav>
  );
};
export default FDCarouselOverlay;
