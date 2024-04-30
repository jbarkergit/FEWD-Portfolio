import { Dispatch, SetStateAction } from 'react';
import MaterialLeftCaret from '../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../assets/svg-icons/MaterialRightCaret';
import useCreatePicture from '../../hooks/useCreatePicture';

type Type_PropDrill = {
  tmdbArrLength: number;
  setBtnNavIndex: Dispatch<
    SetStateAction<{
      prevIndex: number;
      currIndex: number;
    }>
  >;
  visibleNodesCount: number;
};

const FDCarouselOverlay = ({ tmdbArrLength, setBtnNavIndex, visibleNodesCount }: Type_PropDrill) => {
  const minMaxIndex = { min: 1, max: Math.ceil(tmdbArrLength / visibleNodesCount) };

  return (
    <nav className='fdMedia__carousel__wrapper__navigation'>
      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show Previous'
        onClick={() => {
          setBtnNavIndex((prevState) => {
            return {
              prevIndex: prevState.currIndex,
              currIndex: prevState.currIndex === minMaxIndex.min ? minMaxIndex.max : prevState.currIndex - 1,
            };
          });
        }}>
        {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous Selection' })}
      </button>

      <button
        className='fdMedia__carousel__wrapper__navigation--button'
        aria-label='Show More'
        onClick={() => {
          setBtnNavIndex((prevState) => {
            return {
              prevIndex: prevState.currIndex,
              currIndex: prevState.currIndex === minMaxIndex.max ? minMaxIndex.min : prevState.currIndex + 1,
            };
          });
        }}>
        {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
      </button>
    </nav>
  );
};
export default FDCarouselOverlay;
