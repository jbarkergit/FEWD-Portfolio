// Deps
import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
// Context
import { useCatalogProvider } from '../../../context/CatalogContext';
// Hooks
import { usePaginateData } from '../../../hooks/usePaginateData';
// Features
import FDCarouselSearch from './media-carousel-search/FDCarouselSearch';
// Components
import FDCarousel from '../../../components/carousel/FDCarousel';

const FDMedia = () => {
  // Context
  const { isMovieModal, maxCarouselNodes } = useCatalogProvider();

  // State
  const { primaryData } = useLoaderData();
  const paginatedData: ReturnType<typeof usePaginateData> = usePaginateData(primaryData, maxCarouselNodes);

  // References
  const fdMediaRef = useRef<HTMLElement>(null);

  /**
   * @function deltaScrollCarousels
   * @returns void
   * Carousel deltaY scroll logic
   * Update previously active and newly active carousel node's data-attr, navigate
   */
  const deltaScrollCarousels = (delta: 1 | -1): void => {
    if (window.innerWidth < 1050 || !fdMediaRef.current) return;
    const carouselNodesArr: Element[] = [...fdMediaRef.current.children];

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

  /** Event Listeners */
  useEffect(() => {
    if (!isMovieModal) window.addEventListener('wheel', handleWheel);
    else window.removeEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isMovieModal]);

  /** JSX */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {paginatedData?.map(([key, value], index) => <FDCarousel type={'movies'} mapIndex={index} heading={key} data={value} key={`carousel-key-${key}-${value}`} />)}
      <FDCarouselSearch />
    </main>
  );
};

export default FDMedia;
