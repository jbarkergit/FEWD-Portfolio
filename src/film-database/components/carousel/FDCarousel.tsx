import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { tmdbEndPoints } from '../../composables/tmdb-api/data/tmdbEndPoints';
import { useTmdbApi } from '../../composables/tmdb-api/hooks/useTmdbApi';
import { Type_Tmdb_ApiCall_Union, Type_Tmdb_OptParamTrailer_Obj, Type_Tmdb_ApiCallTrailer_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
import { Type_useFilmDatabaseWebStorage_Obj, useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';

import FDCarouselHeader from './FDCarouselHeader';
import FDCarouselOverlay from './FDCarouselOverlay';
import FDCarouselPoster from './FDCarouselPoster';

type Type_PropDrill = {
  dataKey: string;
  dataLabel?: string | undefined;
  dataValue: Type_Tmdb_ApiCall_Union[];
  grid: boolean;
  mediaHeight: number;
  setMediaHeight: Dispatch<SetStateAction<number>>;
};

const FDCarousel = ({ dataKey, dataLabel, dataValue, grid, mediaHeight, setMediaHeight }: Type_PropDrill) => {
  // References
  const carouselWrapper = useRef<HTMLDivElement>(null);
  const carouselUl = useRef<HTMLUListElement>(null);

  /** Carousel Visible Nodes State
   * Employed observers to watch for visible children nodes of carouselUl.current
   * Note: Intersectional Observer does not detect changes that may occur
   * Employment of Mutation Observer is required to ensure our observations are concurrent
   */
  const [visibleNodesCount, setVisibleNodesCount] = useState<number>(0);

  useEffect(() => {
    if (!grid) {
      const observer: IntersectionObserver = new IntersectionObserver(
        // Filter entries that are intersecting (visible in DOM), pass length to state
        (entries: IntersectionObserverEntry[]) => setVisibleNodesCount(entries.filter((entry: IntersectionObserverEntry) => entry.isIntersecting).length),
        // Observer OPTS Note: Threshold is set to 1 to ensure we're observing ONLY 100% visible nodes
        { root: carouselUl.current, rootMargin: '0px', threshold: 1 }
      );

      // Create array from our ref's children && observe each node
      const observeNodes = () => {
        if (carouselUl.current) Array.from(carouselUl.current.children).forEach((node) => observer.observe(node));
      };

      // Initial observation
      observeNodes();

      // Re-observe when carouselUl.current changes e.g. when media queries change the amount of visible nodes
      const mutationObserver: MutationObserver = new MutationObserver(observeNodes);
      if (carouselUl.current) mutationObserver.observe(carouselUl.current, { childList: true });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    }
  }, [carouselUl.current]);

  /** Data Pagination: Pushes data into state when setIndex changes (the user navigates) */
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_ApiCall_Union[]>([]);
  const [btnNavIndex, setBtnNavIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 1, currIndex: 1 });

  useEffect(() => {
    if (!grid) {
      setPaginatedData((prevData: Type_Tmdb_ApiCall_Union[]) => {
        const prevDataLength: number = prevData.length - 1;
        const startIndex: number = prevDataLength === 0 ? 0 : prevDataLength + 1;
        const endIndex: number = visibleNodesCount * btnNavIndex.currIndex;
        return [...prevData, ...dataValue.slice(startIndex, endIndex)] as Type_Tmdb_ApiCall_Union[];
      });
    }
  }, [btnNavIndex]);

  /** INFINITE LOOP BUTTON NAVIGATION
   * [EMPLOYED] Animation && End of Loop Wrapping: CSS Scroll-Snapping && JavaScript Scroll Methods
   * Requires perfect min max boundaries for indexing
   * Reduces overall JavaScript logic, doesn't require CSS animations
   *
   * [x] Infinite Loop: Push off-screen elements to end of queue and vise versa. E.g. [(1), 2,3,4,5,6,7,8,9, (1 IF 9 is last index || 10, (1))]
   * Requires intervals to delay the removal of the off-screen elements to provide css animations
   *
   * [x] Infinite Loop: Manipulate the wrapper position manually
   * Set distances require calculations that account for padding, gap and conditions for the first && last index
   * Single child distances require dom node width && gap size
   */

  // Last possible index depends on visible nodes in carouselUl.current (visibleNodesCount)
  useEffect(() => {
    if (!grid) {
      const lastPossibleIndex: number = Math.ceil(dataValue.length - 1 / visibleNodesCount);

      if (carouselUl.current) {
        const posIndex = { isFirstIndex: btnNavIndex.currIndex === 1, isLastIndex: btnNavIndex.currIndex === lastPossibleIndex };
        let nextChildsIndex: number;

        switch (true) {
          case posIndex.isFirstIndex:
            nextChildsIndex = 0;
            break;

          case posIndex.isLastIndex:
            nextChildsIndex = dataValue.length - 1;
            break;

          default:
            nextChildsIndex = (btnNavIndex.currIndex - 1) * visibleNodesCount;
            break;
        }

        const carouselChildren: HTMLCollection = carouselUl.current.children;
        const nextChild = carouselChildren[nextChildsIndex] as HTMLLIElement;

        if (nextChild) {
          const scrollDistance: number = nextChild.offsetLeft - carouselUl.current.offsetLeft;
          carouselUl.current.scrollTo({ left: scrollDistance, behavior: 'smooth' });
        }
      }
    }
  }, [paginatedData]);

  /** VIDEO PLAYER STATE
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   */
  const userLocation = useLocation();
  const [trailerCache, setTrailerCache] = useState<Type_useFilmDatabaseWebStorage_Obj[]>();

  const useFetchTrailer = (index: number) => {
    const controller: AbortController = new AbortController();
    const cachedTrailers = useFilmDatabaseWebStorage({ userLocation: userLocation, cacheKey: 'trailerCache' }).getData() as Type_useFilmDatabaseWebStorage_Obj[];
    const isCachedTrailer: boolean = cachedTrailers?.some((obj) => obj.trailer_id === index);

    if (!isCachedTrailer) {
      (async (): Promise<void> => {
        const trailerObjData = await useTmdbApi({
          controller: controller,
          payload: {
            tmdbEndPointObj: tmdbEndPoints.movie_trailer_videos,
            trailer_id: { typeGuardKey: 'trailer_id', propValue: `${index}` },
          } as unknown as Type_Tmdb_OptParamTrailer_Obj,
        });

        const trailerObj: Type_useFilmDatabaseWebStorage_Obj[] = [
          {
            trailer_id: index,
            trailer: (trailerObjData as Type_Tmdb_ApiCallTrailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer'),
          },
        ];

        if (trailerObjData && trailerObj) {
          useFilmDatabaseWebStorage({ userLocation: userLocation, data: trailerObj, cacheKey: 'trailerCache' }).setData();

          setTrailerCache((prevData: Type_useFilmDatabaseWebStorage_Obj[] | undefined) => {
            if (prevData) return [...prevData, ...cachedTrailers];
            else return cachedTrailers;
          });
        }
      })();
    } else {
      setTrailerCache(cachedTrailers);
    }
  };

  /** Grab fdMediaGrid (arr node 0) height dynamically for parent's padding setter */
  const mediaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mediaRef.current) {
      const nodeHeight = mediaRef.current.offsetHeight;
      if (mediaHeight < nodeHeight) setMediaHeight(nodeHeight);
    }
  }, [mediaRef.current]);

  /** Component */
  return (
    <section className='FDMediaGrid' ref={mediaRef}>
      <FDCarouselHeader dataLabel={dataLabel} dataKey={dataKey} />
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'} ref={carouselWrapper}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
          {grid
            ? dataValue.map((values) => <FDCarouselPoster mapValue={values} grid={grid} useFetchTrailer={useFetchTrailer} key={uuidv4()} />)
            : paginatedData.map((values) => <FDCarouselPoster mapValue={values} grid={grid} useFetchTrailer={useFetchTrailer} key={uuidv4()} />)}
        </ul>
        <FDCarouselOverlay tmdbArrLength={dataValue.length - 1} setBtnNavIndex={setBtnNavIndex} visibleNodesCount={visibleNodesCount} />
      </div>
    </section>
  );
};
export default FDCarousel;
