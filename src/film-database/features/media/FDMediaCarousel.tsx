import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
import FDCarouselSearch from './media-carousel-search/FDCarouselSearch';

type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
  setHeroData: Dispatch<SetStateAction<Type_Tmdb_Api_Union | null>>;
};

const FDMediaCarousel = ({ carouselComponents, isMenuOpen, setHeroData }: Type_PropDrill) => {
  /** Carousel DeltaY scroll logic */
  const fdMediaRef = useRef<HTMLElement>(null);

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (delta: 1 | -1): void => {
    if (!fdMediaRef.current) return;
    const carouselNodesArr: Element[] = [...fdMediaRef.current?.children];

    // Gather indexes
    const activeNodeIndex: number = carouselNodesArr.findIndex((node: Element) => node.getAttribute('data-anim') === 'active');
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + delta, carouselNodesArr.length - 1));

    // Handle attributes
    if (nextActiveNodeIndex !== activeNodeIndex) {
      if (nextActiveNodeIndex > activeNodeIndex) carouselNodesArr[activeNodeIndex].setAttribute('data-anim', 'disabled');
      carouselNodesArr[nextActiveNodeIndex].setAttribute('data-anim', 'active');
    }

    // Scroll
    const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;
    fdMediaRef.current.style.top = `${nextActiveNodeOffsetTop * -1}px`;
  };

  const handleWheel = (event: WheelEvent) => deltaScrollCarousels(event.deltaY > 0 ? 1 : -1);

  useEffect(() => {
    if (isMenuOpen) window.removeEventListener('wheel', handleWheel);
    else window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isMenuOpen]);

  /** Component */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {...carouselComponents}
      <FDCarouselSearch setHeroData={setHeroData} />
    </main>
  );
};

export default FDMediaCarousel;
