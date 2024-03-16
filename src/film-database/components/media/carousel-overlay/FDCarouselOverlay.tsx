import { useEffect, useRef } from 'react';
import MaterialLeftCaret from '../../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../../assets/svg-icons/MaterialRightCaret';
import useCreatePicture from '../../../hooks/useCreatePicture';

type Type_PropDrill = {
  posterHeight: string | undefined;
};

const FDCarouselOverlay = ({ posterHeight }: Type_PropDrill) => {
  const navigationOverlay = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (posterHeight && navigationOverlay.current) navigationOverlay.current.style.height = posterHeight;
  }, [posterHeight, navigationOverlay.current]);

  return (
    <nav className='FDMediaGrid__wrapper__ul__navigation' ref={navigationOverlay}>
      <button className='FDMediaGrid__wrapper__ul__navigation--button' aria-label='Show Previous'>
        {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous Selection' })}
      </button>
      <button className='FDMediaGrid__wrapper__ul__navigation--button' aria-label='Show More'>
        {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
      </button>
    </nav>
  );
};
export default FDCarouselOverlay;
