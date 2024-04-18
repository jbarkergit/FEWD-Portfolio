import { Dispatch, ForwardedRef, RefObject, SetStateAction, forwardRef, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import { v4 as uuidv4 } from 'uuid';
// API Data
import { tmdbEndPoints } from '../../api/data/tmdbEndPoints';
// API Types
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_ApiCall_Union, Type_Tmdb_OptParamTrailer_Obj } from '../../api/types/TmdbDataTypes';
// API Hooks
import { useTmdbApi } from '../../api/hooks/useTmdbApi';
import { Type_useFilmDatabaseWebStorage_Obj, useFilmDatabaseWebStorage } from '../../hooks/web-storage-api/useFilmDatabaseWebStorage';
// Components
import FDCarouselOverlay from './carousel-overlay/FDCarouselOverlay';
import FDPosterProp from './poster/FDPosterProp';

type Type_PropDrill = {
  dataKey: string;
  dataLabel?: string | undefined;
  dataValue: Type_Tmdb_ApiCall_Union[];
  grid: boolean;
  mediaHeight: number;
  setMediaHeight: Dispatch<SetStateAction<number>>;
};

const FDMediaGrid = ({ dataKey, dataLabel, dataValue, grid, mediaHeight, setMediaHeight }: Type_PropDrill) => {
  const userLocation = useLocation();
  const carouselWrapper = useRef<HTMLDivElement>(null);
  const carouselUl = useRef<HTMLUListElement>(null);

  /** Carousel Visible Nodes State
   * Employed observers to watch for visible children nodes of carouselUl.current
   * Note: Intersectional Observer does not detect changes that may occur
   * Employment of Mutation Observer is required to ensure our observations are concurrent
   */
  const [visibleNodesCount, setVisibleNodesCount] = useState<number>(8);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      // Filter entries that are intersecting (visible in DOM), pass length to state
      (entries) => setVisibleNodesCount(entries.filter((entry) => entry.isIntersecting).length),
      // Observer OPTS Note: Threshold is set to 1 to ensure we're observing ONLY 100% visible nodes
      { root: carouselUl.current, rootMargin: '0px', threshold: 1 }
    );

    const observeNodes = () => {
      // Create array from our ref's children && observe each node
      if (carouselUl.current) Array.from(carouselUl.current.children).forEach((node) => observer.observe(node));
    };

    // Initial observation
    observeNodes();
    // Re-observe when carouselUl.current changes e.g. when media queries change the amount of visible nodes
    const mutationObserver: MutationObserver = new MutationObserver(observeNodes);
    mutationObserver.observe(carouselUl.current!, { childList: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

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
  const lastIndexCalc: number = Math.ceil(dataValue.length / visibleNodesCount);
  const [lastPossibleIndex, setLastPossibleIndex] = useState<number>(lastIndexCalc);
  useEffect(() => setLastPossibleIndex(lastIndexCalc), [visibleNodesCount]);

  useEffect(() => {
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
          nextChildsIndex = (btnNavIndex.currIndex - 1) * lastPossibleIndex - 1;
          break;
      }

      const carouselChildren: HTMLCollection = carouselUl.current.children;
      const nextChild = carouselChildren[nextChildsIndex] as HTMLLIElement;

      if (nextChild) {
        const scrollDistance: number = nextChild.offsetLeft - carouselUl.current.offsetLeft;
        carouselUl.current.scrollTo({ left: scrollDistance, behavior: 'smooth' });
      }
    }
  }, [paginatedData]);

  /** VIDEO PLAYER STATE
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   */
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
      <div className='FDMediaGrid__header'>
        <h2 className='FDMediaGrid__header--h2'>{dataLabel ? dataLabel : dataKey.replace('_', ' ')}</h2>
      </div>
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'} ref={carouselWrapper}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
          {grid
            ? dataValue.map((values) => <FDPosterProp mapValue={values} grid={grid} trailerCache={trailerCache} useFetchTrailer={useFetchTrailer} key={uuidv4()} />)
            : paginatedData.map((values) => (
                <FDPosterProp mapValue={values} grid={grid} trailerCache={trailerCache} useFetchTrailer={useFetchTrailer} key={uuidv4()} />
              ))}
        </ul>
        {grid ? null : <FDCarouselOverlay tmdbArrLength={dataValue.length - 1} setBtnNavIndex={setBtnNavIndex} visibleNodesCount={visibleNodesCount} />}
      </div>
    </section>
  );
};
export default FDMediaGrid;
