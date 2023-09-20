import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ProductType } from '../../../types/ProductType';

type PropType = {
  findProduct: ProductType;
  activeDisplay: number;
  setActiveDisplay: Dispatch<SetStateAction<number>>;
};

const ProductPageImgDisplay = ({ findProduct, activeDisplay, setActiveDisplay }: PropType) => {
  const { company, images, unit } = findProduct;
  const lastSlide = findProduct.images!.length - 1;

  //Magnifier feature
  const primaryImg = useRef<HTMLImageElement>(null);
  const magnifier = useRef<HTMLDivElement>(null);
  const [magnifierEnabled, setMagnifierEnabled] = useState<boolean>(false);
  const [cursorCoordinates, setCursorCoordinates] = useState({ x: 0, y: 0 });
  const [magnification, setMagnification] = useState<number>(1);

  useEffect(() => {
    const userPointerUp = (): void => (magnifierEnabled ? setMagnifierEnabled(false) : setMagnifierEnabled(true));

    const userWheel = (e: WheelEvent): void => {
      if (magnifierEnabled) {
        e.preventDefault(); //Prevent page scroll
        //Increment & Decrement magnification by prefered notch on scroll direction
        const minMaxMagnification = { min: 1, max: 2 }; //Range
        const clampedMagnification = Math.min(minMaxMagnification.max, Math.max(minMaxMagnification.min, magnification + (e.deltaY < 0 ? 0.2 : -0.2)));
        setMagnification(clampedMagnification);
      }
    };

    const userPointerMove = (e: PointerEvent) => (magnifierEnabled ? setCursorCoordinates({ x: e.offsetX, y: e.offsetY }) : null);
    const userPointerLeave = (): void => setMagnifierEnabled(false);

    primaryImg.current?.addEventListener('pointerup', userPointerUp);
    primaryImg.current?.addEventListener('wheel', userWheel);
    primaryImg.current?.addEventListener('pointermove', userPointerMove);
    primaryImg.current?.addEventListener('pointerleave', userPointerLeave);

    return () => {
      primaryImg.current?.removeEventListener('pointerup', userPointerUp);
      primaryImg.current?.removeEventListener('wheel', userWheel);
      primaryImg.current?.removeEventListener('pointermove', userPointerMove);
      primaryImg.current?.removeEventListener('pointerleave', userPointerLeave);
    };
  }, [primaryImg.current, magnifierEnabled, magnification]);

  //Set magnifier background-size
  useEffect(() => {
    if (magnifier.current && primaryImg.current) {
      magnifier.current.style.backgroundSize = `${primaryImg.current.width * magnification}px ${primaryImg.current.height * magnification}px`;
    }
  }, [magnifierEnabled, magnification]);

  //Set magnifier background position
  useEffect(() => {
    if (magnifier.current) magnifier.current.style.backgroundPosition = `-${cursorCoordinates.x}px -${cursorCoordinates.y}px`;
  }, [cursorCoordinates]);

  return (
    <div className='skuPage__grid__display'>
      <div className='skuPage__grid__display__heading'>
        {company} {unit}
      </div>

      <div className='skuPage__grid__display__primaryImg'>
        {/* {magnifierEnabled ? ( */}
        <div
          className='skuPage__grid__display__primaryImg__magnifier'
          ref={magnifier}
          style={{ transform: `translateX(${cursorCoordinates.x}px) translateY(${cursorCoordinates.y}px)`, backgroundImage: `url(${images![activeDisplay]}` }}
        />
        {/* // ) : null} */}
        <picture className='skuPage__grid__display__primaryImg--picture'>
          <img
            src={images![activeDisplay]}
            alt={company + unit}
            loading='lazy'
            role='presentation'
            decoding='async'
            fetchpriority='high'
            ref={primaryImg}
            style={magnifierEnabled ? { cursor: 'none' } : { cursor: 'zoom-in' }}
          />
        </picture>
      </div>
      {images!.length === 1 ? null : (
        <div className='skuPage__grid__display__nav'>
          <button onClick={() => (activeDisplay === 0 ? setActiveDisplay(lastSlide) : setActiveDisplay(activeDisplay - 1))}>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.8em' height='1.8em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='m8.165 11.63l6.63-6.43C15.21 4.799 16 5.042 16 5.57v12.86c0 .528-.79.771-1.205.37l-6.63-6.43a.499.499 0 0 1 0-.74Z'></path>
              </svg>
              <span>Previous Image</span>
            </span>
          </button>
          <button onClick={() => (activeDisplay === lastSlide ? setActiveDisplay(1) : setActiveDisplay(activeDisplay + 1))}>
            <span>
              <span>Next Image</span>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.8em' height='1.8em' viewBox='0 0 24 24'>
                <path fill='currentColor' d='M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 0 0 0-.74Z'></path>
              </svg>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
export default ProductPageImgDisplay;
