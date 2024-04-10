import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import MaterialLeftCaret from '../../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../../assets/svg-icons/MaterialRightCaret';
import useCreatePicture from '../../../hooks/component-creation/useCreatePicture';

type Type_PropDrill = {
  posterDimensions: {
    width: number | undefined;
    height: number | undefined;
  };
  tmdbArrLength: number;
  setBtnNavIndex: Dispatch<
    SetStateAction<{
      prevIndex: number;
      currIndex: number;
    }>
  >;
  visibleNodesCount: number;
};

const FDCarouselOverlay = ({ posterDimensions, tmdbArrLength, setBtnNavIndex, visibleNodesCount }: Type_PropDrill) => {
  const navigationOverlay = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (posterDimensions.height && navigationOverlay.current) {
      navigationOverlay.current.style.height = `${posterDimensions.height}px`;
    }
  }, [posterDimensions]);

  const minMaxIndex = { min: 1, max: Math.ceil(tmdbArrLength / visibleNodesCount) };

  return (
    <nav className='FDMediaGrid__wrapper__navigation' ref={navigationOverlay}>
      <button
        className='FDMediaGrid__wrapper__navigation--button'
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
        className='FDMediaGrid__wrapper__navigation--button'
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
