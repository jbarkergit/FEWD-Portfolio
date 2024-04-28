import { Dispatch, SetStateAction, useRef, useState, useEffect, RefObject } from 'react';
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
  fdMedia: RefObject<HTMLElement>;
};

type Type_getClampedIndex = { prev: number; cur: number } | undefined;

const FDCarousel = ({ dataKey, dataLabel, dataValue, grid, mediaHeight, setMediaHeight, fdMedia }: Type_PropDrill) => {
  // References
  const carouselWrapper = useRef<HTMLDivElement>(null);
  const carouselUl = useRef<HTMLUListElement>(null);

  /** Carousel Visible Nodes State
   * Employed observers to watch for visible children nodes of carouselUl.current
   * Note: Intersectional Observer does not detect changes that may occur
   * Employment of Mutation Observer is required to ensure our observations are concurrent
   */

  const [visibleNodesCount, setVisibleNodesCount] = useState<number>(8);

  useEffect(() => {
    if (!grid) {
      const observer: IntersectionObserver = new IntersectionObserver(
        // Filter entries that are intersecting (visible in DOM), pass length to state
        (entries: IntersectionObserverEntry[]) => {
          const filteredEntriesLength: number = entries.filter((entry: IntersectionObserverEntry) => entry.isIntersecting).length + 1;
          setVisibleNodesCount(filteredEntriesLength);
        },
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
      const lastPossibleIndex: number = Math.ceil(dataValue.length / visibleNodesCount);

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

  /** Carousel Navigation (Y Axis) */
  const [yAxis, setYAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });
  // useEffect(() => console.log(yAxis), [yAxis]);

  // Clamped state getter
  const getClampedIndex = (prevIndex: number, curIndex: number, increment: number): Type_getClampedIndex => {
    if (!fdMedia.current) return;
    const nodeLength: number = fdMedia.current.children.length - 1;

    return {
      prev: Math.max(0, Math.min(nodeLength, prevIndex + increment)),
      cur: Math.max(0, Math.min(nodeLength, curIndex + increment)),
    };
  };

  // State setter
  const setYAxisIndexes = (e: WheelEvent | KeyboardEvent) => {
    // Wheel Events
    const isWheelEvent: boolean = e instanceof WheelEvent;
    const deltaY: number = (e as WheelEvent).deltaY;

    // Keyboard Events
    const isKeyboardEvent: boolean = e instanceof KeyboardEvent;
    const isArrowUp: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowUp';
    const isArrowDown: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowDown';
    const isArrowRight: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowRight';
    const isArrowLeft: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowLeft';

    // Logic
    switch (true) {
      case isWheelEvent || (isKeyboardEvent && isArrowUp) || (isKeyboardEvent && isArrowDown):
        setYAxis((prevState: typeof yAxis) => {
          const clampedIndex: Type_getClampedIndex = getClampedIndex(prevState.prev, prevState.cur, deltaY > 0 ? 1 : -1);
          return clampedIndex as Exclude<Type_getClampedIndex, undefined>;
        });
        break;

      case isKeyboardEvent && isArrowRight:
        break;

      case isKeyboardEvent && isArrowLeft:
        break;

      default:
        e.preventDefault();
        break;
    }
  };

  useEffect(() => {
    fdMedia.current?.addEventListener('wheel', setYAxisIndexes);
    fdMedia.current?.addEventListener('keyup', setYAxisIndexes);

    return () => {
      fdMedia.current?.removeEventListener('wheel', setYAxisIndexes);
      fdMedia.current?.removeEventListener('keyup', setYAxisIndexes);
    };
  }, []);

  // Scroll method
  useEffect(() => {
    if (!fdMedia.current) return;

    const fdMediaNodes: HTMLCollection = fdMedia.current.children;
    if (!fdMediaNodes) return;

    const fdMediaActiveNode = fdMediaNodes[yAxis.cur] as HTMLElement;
    if (!fdMediaActiveNode) return;

    fdMedia.current.scrollTo({
      top: fdMediaActiveNode.offsetTop - parseInt(fdMedia.current.style.paddingTop),
      behavior: 'smooth',
    });

    // Data-attribute handler
    fdMedia.current.children[yAxis.prev].setAttribute('data-status', 'hidden');
    fdMedia.current.children[yAxis.cur].setAttribute('data-status', 'active');
  }, [yAxis.cur]);

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
