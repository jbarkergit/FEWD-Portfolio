import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import MaterialLeftCaret from '../../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../../assets/svg-icons/MaterialRightCaret';
import useCreatePicture from '../../../hooks/useCreatePicture';

type Type_PropDrill = {
  posterDimensions: {
    width: number | undefined;
    height: number | undefined;
  };
  dataLength: number;
  setSetIndex: Dispatch<
    SetStateAction<{
      prevIndex: number;
      currIndex: number;
    }>
  >;
};

const FDCarouselOverlay = ({ posterDimensions, dataLength, setSetIndex }: Type_PropDrill) => {
  const navigationOverlay = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (posterDimensions.height && navigationOverlay.current) {
      navigationOverlay.current.style.height = `${posterDimensions.height}px`;
    }
  }, [posterDimensions]);

  return (
    <nav className='FDMediaGrid__wrapper__navigation' ref={navigationOverlay}>
      <button
        className='FDMediaGrid__wrapper__navigation--button'
        aria-label='Show Previous'
        onClick={() =>
          setSetIndex((prevState) => ({ prevIndex: prevState.currIndex, currIndex: prevState.currIndex === 0 ? dataLength - 1 : prevState.currIndex - 1 }))
        }>
        {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous Selection' })}
      </button>
      <button
        className='FDMediaGrid__wrapper__navigation--button'
        aria-label='Show More'
        onClick={() =>
          setSetIndex((prevIndex) => ({ prevIndex: prevIndex.currIndex, currIndex: prevIndex.currIndex === dataLength - 1 ? 0 : prevIndex.currIndex + 1 }))
        }>
        {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
      </button>
    </nav>
  );
};
export default FDCarouselOverlay;
