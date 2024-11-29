// Deps
import { useEffect, useRef, useState } from 'react';
// Libs
import { v4 as uuidv4 } from 'uuid';
// Context
import { Type_heroData, useCatalogProvider } from '../../../context/CatalogContext';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
// Hooks
import { usePaginateData } from '../../../hooks/usePaginateData';
// Features
import FDCarouselSearch from './media-carousel-search/FDCarouselSearch';
// Components
import FDCarousel from '../../../components/carousel/FDCarousel';

const FDMedia = () => {
  const { route, itemsPerPage, setHeroData } = useCatalogProvider();
  const [paginatedData, setPaginatedData] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  /** Fetch data when user requests a route, pass to usePaginateData() hook */
  const fetchDataByRoute = async (): Promise<void> => {
    let processedData: Namespace_Tmdb.Prefabs_Obj[] | Namespace_Tmdb.Discover_Obj = [];

    if (route === 'home') {
      processedData = (await useTmdbFetcher([
        { now_playing: undefined },
        { upcoming: undefined },
        { trending_today: undefined },
        { trending_this_week: undefined },
      ])) as Namespace_Tmdb.Prefabs_Obj[];
    } else {
      processedData = (await useTmdbFetcher({ discover: route })) as Namespace_Tmdb.Discover_Obj;
    }

    if (!processedData) return;
    const data = usePaginateData(processedData, itemsPerPage);

    if (data) {
      setPaginatedData(data);
      setHeroData(data[0][1][0][0] as Type_heroData);
    }
  };

  useEffect(() => {
    fetchDataByRoute();
  }, [route, itemsPerPage]);

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
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current]);

  /** Component */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {paginatedData?.map(([key, value], index) => (
        <FDCarousel type={'movies'} mapIndex={index} heading={key === 'discover' ? route : key} data={value} key={uuidv4()} />
      ))}
      <FDCarouselSearch />
    </main>
  );
};

export default FDMedia;
