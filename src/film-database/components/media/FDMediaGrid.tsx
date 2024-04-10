import { useEffect, useRef, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// API Data
import { tmdbEndPoints } from '../../api/data/tmdbEndPoints';
// API Types
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_ApiCall_Union, Type_Tmdb_OptParamloadTrailer_Obj } from '../../api/types/TmdbDataTypes';
// API Hooks
import { useTmdbApi } from '../../api/hooks/useTmdbApi';
// Components
import FDCarouselOverlay from './carousel-overlay/FDCarouselOverlay';
import FDPosterProp from './poster/FDPosterProp';
import { Type_useFilmDatabaseWebStorage_Obj, useFilmDatabaseWebStorage } from '../../hooks/web-storage-api/useFilmDatabaseWebStorage';
import { useLocation } from 'react-router-dom';

type Type_PropDrill = {
  dataKey: string;
  dataLabel?: string | undefined;
  dataValue: Type_Tmdb_ApiCall_Union[];
  grid: boolean;
};

const FDMediaGrid = ({ dataKey, dataLabel, dataValue, grid }: Type_PropDrill) => {
  const userLocation = useLocation();

  /** Refs */
  const carouselWrapper = useRef<HTMLDivElement>(null);
  const carouselUl = useRef<HTMLUListElement>(null);

  /** Button Navigation State Index */
  const [btnNavIndex, setBtnNavIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 1, currIndex: 1 });

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

  /** Update navigation overlay button height dynamically
   * Due to the informational footer, I'm opting to use JavaScript to set heights of the buttons in order to prevent any potential visual mishaps.
   * Due to HTML structure, there isn't an easy way to pass refs upwards; therefore, I opted to drill dom nodes (I understand this isn't the best practice)
   * Note: Temporary until I finish HTML structure -- WILL replace with resize Observer OR forwardRef
   */
  const [posterDimensions, setPosterDimensions] = useState<{ width: number | undefined; height: number | undefined }>({ width: undefined, height: undefined });

  useEffect(() => {
    const updatePosterDimensions = () => {
      if (carouselUl.current) {
        const childrenNestOne = carouselUl.current.children[0] as HTMLLIElement | undefined;
        if (!childrenNestOne) return;

        const childrenNestTwo = childrenNestOne.children[0] as HTMLElement | undefined;
        if (!childrenNestTwo) return;

        const childrenNestThree = childrenNestTwo.children[0] as HTMLDivElement | undefined;
        if (!childrenNestThree) return;

        const posterOverlayRect: DOMRect = childrenNestThree.getBoundingClientRect();
        setPosterDimensions({ width: posterOverlayRect?.width, height: posterOverlayRect?.height });
      }
    };

    updatePosterDimensions(); // Initial height
    window.addEventListener('resize', updatePosterDimensions);
    return () => window.removeEventListener('resize', updatePosterDimensions);
  }, [carouselUl.current]);

  /** Data Pagination: Pushes data into state when setIndex changes (the user navigates) */
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_ApiCall_Union[]>([]);

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
      const isFirstIndex: boolean = btnNavIndex.currIndex === 1;
      const isLastIndex: boolean = btnNavIndex.currIndex === lastPossibleIndex;

      let nextChildsIndex: number;

      switch (true) {
        case isFirstIndex:
          nextChildsIndex = 0;
          break;

        case isLastIndex:
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

  /** KEYBOARD NAVIGATION
   * #1. Index handler
   * #2. Dom manipulation
   */
  const [activeChild, setActiveChild] = useState<number>(0);

  useEffect(() => {
    const keyboardStrokeHandler = (event: KeyboardEvent) => {
      switch (true) {
        case event.key === 'ArrowLeft':
          setActiveChild(activeChild === 0 ? paginatedData.length : activeChild - 1);
          break;

        case event.key === 'ArrowRight':
          setActiveChild(activeChild === paginatedData.length ? 0 : activeChild + 1);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', keyboardStrokeHandler);
    return () => window.removeEventListener('keydown', keyboardStrokeHandler);
  }, []);

  useEffect(() => {
    const carouselChildren: HTMLCollection | undefined = carouselUl.current?.children;
    const activeNode = carouselChildren ? (carouselChildren[activeChild] as HTMLLIElement) : null;

    if (carouselUl.current && carouselChildren && activeNode) {
      activeNode.scrollTo({ left: activeNode.offsetLeft - carouselUl.current?.offsetLeft, behavior: 'smooth' });
      activeNode.setAttribute('data-trailer-status', 'active');
    }
  }, [activeChild]);

  /** VIDEO PLAYER STATE
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   */
  const [trailerCache, setTrailerCache] = useState<Type_useFilmDatabaseWebStorage_Obj[]>();

  useEffect(() => {
    const controller: AbortController = new AbortController();
    const cachedTrailers = useFilmDatabaseWebStorage({ userLocation: userLocation, cacheKey: 'trailerCache' }).getData() as Type_useFilmDatabaseWebStorage_Obj[];
    const isCachedTrailer: boolean = cachedTrailers?.some((obj) => obj.trailer_id === dataValue[activeChild].id);

    if (!isCachedTrailer) {
      (async (): Promise<void> => {
        const trailerObjData = await useTmdbApi({
          controller: controller,
          payload: {
            tmdbEndPointObj: tmdbEndPoints.movie_trailer_videos,
            trailer_id: { typeGuardKey: 'trailer_id', propValue: `${dataValue[activeChild].id}` },
          } as unknown as Type_Tmdb_OptParamloadTrailer_Obj,
        });

        const trailerObj: Type_useFilmDatabaseWebStorage_Obj[] = [
          {
            trailer_id: dataValue[activeChild].id,
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
  }, [activeChild]);

  /** Component */
  return (
    <section className='FDMediaGrid'>
      <div className='FDMediaGrid__header'>
        <h2 className='FDMediaGrid__header--h2'>{dataLabel ? dataLabel : dataKey.replace('_', ' ')}</h2>
      </div>
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'} ref={carouselWrapper}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
          {grid
            ? dataValue.map((values) => <FDPosterProp mapValue={values} grid={grid} trailerCache={trailerCache} key={uuidv4()} />)
            : paginatedData.map((values) => <FDPosterProp mapValue={values} grid={grid} trailerCache={trailerCache} key={uuidv4()} />)}
        </ul>
        {grid ? null : (
          <FDCarouselOverlay
            posterDimensions={posterDimensions}
            tmdbArrLength={dataValue.length - 1}
            setBtnNavIndex={setBtnNavIndex}
            visibleNodesCount={visibleNodesCount}
          />
        )}
      </div>
    </section>
  );
};
export default FDMediaGrid;
