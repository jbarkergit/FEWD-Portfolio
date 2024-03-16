import { useEffect, useRef } from 'react';
import MaterialLeftCaret from '../../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../../assets/svg-icons/MaterialRightCaret';
import useCreatePicture from '../../../hooks/useCreatePicture';

type Type_PropDrill = {
  posterHeight: string | undefined;
};

const FDCarouselOverlay = ({ posterHeight }: Type_PropDrill) => {
  const navigationLeft = useRef<HTMLButtonElement>(null);
  const navigationRight = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (posterHeight && navigationLeft.current && navigationRight.current) {
      [navigationLeft.current, navigationRight.current].forEach((button) => {
        button.style.height = posterHeight;
      });
    }
  }, [posterHeight, navigationLeft, navigationRight]);

  return (
    <nav className='FDMediaGrid__wrapper__ul__navigation'>
      <button className='FDMediaGrid__wrapper__ul__navigation--button' aria-label='Show Previous' ref={navigationLeft}>
        {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous Selection' })}
      </button>
      <button className='FDMediaGrid__wrapper__ul__navigation--button' aria-label='Show More' ref={navigationRight}>
        {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
      </button>
    </nav>
  );
};
export default FDCarouselOverlay;
