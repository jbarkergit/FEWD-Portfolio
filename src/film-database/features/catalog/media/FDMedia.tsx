// Deps
import { useEffect, useRef, useState } from 'react';
// Context
import { useCatalogProvider } from '../../../context/CatalogContext';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
// Hooks
import { usePaginateData } from '../../../hooks/usePaginateData';
// Features
import FDCarouselSearch from './media-carousel-search/FDCarouselSearch';
// Components
import FDCarousel from '../../../components/carousel/FDCarousel';

const FDMedia = () => {
  const { route, isMenuOpen, itemsPerPage, setHeroData } = useCatalogProvider();
  const [paginatedData, setPaginatedData] = useState<Map<string, Namespace_Tmdb.BaseMedia_Provider[][]> | undefined>(undefined);

  /** Fetch data when user requests a route, pass to usePaginateData() hook */
  const fetchDataByRoute = async (): Promise<void> => {
    if (route === 'home') {
      const routeData = (await useTmdbFetcher([
        { now_playing: undefined },
        { upcoming: undefined },
        { trending_today: undefined },
        { trending_this_week: undefined },
      ])) as Namespace_Tmdb.Prefabs_Obj[] | Array<Namespace_Tmdb.Prefabs_Obj | undefined>;

      const filteredHomeData = routeData.filter((obj) => obj !== undefined) as Namespace_Tmdb.Prefabs_Obj[];
      const data = usePaginateData(filteredHomeData, itemsPerPage, setHeroData);
      setPaginatedData(data);
    } else {
      const routeData = (await useTmdbFetcher({ discover: route })) as Namespace_Tmdb.Discover_Obj;
      const data = usePaginateData(routeData, itemsPerPage, setHeroData);
      setPaginatedData(data);
    }
  };

  useEffect(() => {
    fetchDataByRoute();
  }, [route]);

  /** Carousel DeltaY scroll logic */
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
    if (isMenuOpen) window.removeEventListener('wheel', handleWheel);
    else window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isMenuOpen]);

  /** Component */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {paginatedData &&
        Array.from(paginatedData.entries()).map(([key, value], index) => (
          <FDCarousel type={'movies'} mapIndex={index} heading={key === 'discover' ? route : key} data={value} key={key === 'discover' ? route : key} />
        ))}
      <FDCarouselSearch setHeroData={setHeroData} />
    </main>
  );
};

export default FDMedia;
