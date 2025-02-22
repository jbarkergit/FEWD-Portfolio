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
  const { primaryData } = useLoaderData();
  const { route } = useCatalogProvider();
  const [paginatedData, setPaginatedData] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  function paginatePrimaryData() {
    if (primaryData) {
      const paginatedData = usePaginateData(primaryData);
      setPaginatedData(paginatedData);
    }
  }

  useEffect(() => paginatePrimaryData(), []);

  /** Carousel DeltaY scroll logic */
  const { isModalOpen } = useCatalogProvider();
  const fdMediaRef = useRef<HTMLElement>(null);

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (delta: 1 | -1): void => {
    if (window.innerWidth < 1050 || !fdMediaRef.current) return;
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
    if (!isModalOpen) window.addEventListener('wheel', handleWheel);
    else window.removeEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isModalOpen]);

  /** Component */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {paginatedData?.map(([key, value], index) => (
        <FDCarousel type={'movies'} mapIndex={index} heading={key === 'discover' ? route : key} data={value} key={`carousel-key-${key}-${value}`} />
      ))}
      <FDCarouselSearch />
    </main>
  );
};

export default FDMedia;
