import { useEffect, useMemo, useRef } from 'react';
import { useFLoader } from '~/film-database/routes/FilmDatabase';
import { useCatalogProvider } from '../../../context/CatalogContext';
import FDCarousel from './media-carousel/FDCarousel';
import FDSearch from '~/film-database/features/catalog/media/search/FDSearch';
import { tmdbChunk } from '~/film-database/utility/tmdbChunk';

const FDMedia = () => {
  // Context
  const { isModal, viewportChunkSize } = useCatalogProvider();

  // State
  const { primaryData } = useFLoader();
  const chunkedData = useMemo(
    () =>
      primaryData.map((r) => {
        return { key: r.key, response: tmdbChunk(r.response.results, viewportChunkSize) };
      }),
    [primaryData, viewportChunkSize]
  );

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
    const activeNodeIndex: number = carouselNodesArr.findIndex(
      (node: Element) => node.getAttribute('data-anim') === 'active'
    );
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + delta, carouselNodesArr.length - 1));

    // Handle attributes
    if (nextActiveNodeIndex !== activeNodeIndex) {
      if (carouselNodesArr[activeNodeIndex] && nextActiveNodeIndex > activeNodeIndex) {
        carouselNodesArr[activeNodeIndex].setAttribute('data-anim', 'disabled');
      }
      if (carouselNodesArr[nextActiveNodeIndex])
        carouselNodesArr[nextActiveNodeIndex].setAttribute('data-anim', 'active');
    }

    // Scroll
    const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;
    fdMediaRef.current.style.top = `${nextActiveNodeOffsetTop * -1}px`;
  };

  const handleWheel = (event: WheelEvent) => deltaScrollCarousels(event.deltaY > 0 ? 1 : -1);

  /** Event Listeners */
  useEffect(() => {
    if (!isModal) window.addEventListener('wheel', handleWheel);
    else window.removeEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isModal]);

  /** JSX */
  return (
    <main
      className='fdMedia'
      ref={fdMediaRef}
      style={{ top: '0px' }}>
      {chunkedData?.map(({ key, response }, index) => (
        <FDCarousel
          mapIndex={index}
          heading={key}
          data={response}
          key={`media-carousel-index-${index}-key-${key}`}
        />
      ))}
      <FDSearch orientation='desktop' />
    </main>
  );
};

export default FDMedia;
