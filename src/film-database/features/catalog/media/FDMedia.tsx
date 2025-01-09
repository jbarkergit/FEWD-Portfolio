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
  const { route, setHeroData } = useCatalogProvider();
  const [paginatedData, setPaginatedData] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetchDataByRoute = async (): Promise<void> => {
    let fetchedData: Namespace_Tmdb.Response_Union | Namespace_Tmdb.Response_Union[];

    if (route === 'home') {
      const data = (await useTmdbFetcher([
        { now_playing: undefined },
        { upcoming: undefined },
        { trending_today: undefined },
        { trending_this_week: undefined },
        { discover: 'action' },
        { discover: 'adventure' },
        { discover: 'animation' },
        { discover: 'comedy' },
        { discover: 'crime' },
        { discover: 'documentary' },
        { discover: 'drama' },
        { discover: 'family' },
        { discover: 'fantasy' },
        { discover: 'history' },
        { discover: 'horror' },
        { discover: 'music' },
        { discover: 'mystery' },
        { discover: 'romance' },
        { discover: 'science_fiction' },
        { discover: 'thriller' },
        { discover: 'tv_movie' },
        { discover: 'war' },
        { discover: 'western' },
      ])) as Namespace_Tmdb.Response_Union[];
      fetchedData = data;
    } else {
      const data = (await useTmdbFetcher({ discover: route })) as Namespace_Tmdb.Response_Union;
      fetchedData = data;
    }

    if (fetchedData) {
      const data = usePaginateData(fetchedData);
      setPaginatedData(data);
      setHeroData(data[0][1][0][0] as Type_heroData);
    }
  };

  useEffect(() => {
    fetchDataByRoute();
  }, [route]);

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
        <FDCarousel type={'movies'} mapIndex={index} heading={key === 'discover' ? route : key} data={value} key={uuidv4()} />
      ))}
      <FDCarouselSearch />
    </main>
  );
};

export default FDMedia;
