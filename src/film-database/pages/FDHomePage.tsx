import { ReactElement, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { Type_Tmdb_Movie_Endpoints, Type_Tmdb_Movie_Keys_Union, tmdbMovieEndpoints } from '../composables/tmdb-api/data/tmdbEndPoints';
// Api Types
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_ApiCall_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Api Hooks
import { Type_useFetchTmdbResponse_KeyValuePairArr, useFetchTmdbResponse } from '../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { Type_useFDWebStorage_Trailer_Obj, useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
// Components
import FDCarousel from '../components/carousel/FDCarousel';
import FDHeader from '../components/header/FDHeader';
import FDFooter from '../components/footer/FDFooter';
import FDHero from '../components/hero/FDHero';
// Types
type Type_paginatedDataMap = Map<string, Type_Tmdb_ApiCall_Union[]>;

const FDHomePage = () => {
  // References
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselUlRefReceiver = useRef<HTMLUListElement>(null);
  const carouselUlRef = carouselUlRefReceiver;

  // Global Variables
  const useLocationPathname = useLocation().pathname;

  /** Fetch and set data */
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_useFetchTmdbResponse_KeyValuePairArr>([]);

  useEffect(() => {
    // Fetch data based on the user's location (will change when state navigation is implemented)
    let keyValuePairArr: [string, string][] = [];

    switch (useLocationPathname) {
      case '/film-database/genre/horror':
        keyValuePairArr = [];
        break;

      default:
        keyValuePairArr = Array.from(tmdbMovieEndpoints.hot.entries());
        break;
    }

    // Initialize fetch, set state
    useFetchTmdbResponse({ endPoint_keyValuePairArr: keyValuePairArr }).then((data) => {
      if (data) setTmdbDataArr(data);
    });
  }, []);

  /** Initial data pagination */
  const [paginatedData, setPaginatedData] = useState<Type_paginatedDataMap>(new Map());
  const [visibleNodesCount, setVisibleNodesCount] = useState<number>(8);

  const paginateTmdbDataArrOnMount = () => {
    let dataMap: Type_paginatedDataMap = new Map();

    tmdbDataArr.forEach(([key, dataArr]) => {
      dataMap.set(key, dataArr.slice(0, visibleNodesCount));
    });

    setPaginatedData(dataMap);
  };

  useEffect(() => paginateTmdbDataArrOnMount(), [tmdbDataArr]);

  /** Carousel Visible Nodes State
   * Employed observers to watch for visible children nodes of carouselUl.current
   * Note: Intersectional Observer does not detect changes that may occur
   * Employment of Mutation Observer is required to ensure our observations are concurrent
   * Note: State may seem unnecessary; however, it's important to update the visible node count due to viewport sizing to refire our logic to force a rerender
   */

  const observeCarouselNodes = () => {
    const observer: IntersectionObserver = new IntersectionObserver(
      // Filter entries that are intersecting (visible in DOM), pass length to state
      (entries: IntersectionObserverEntry[]) => {
        const filteredEntriesLength: number = entries.filter((entry: IntersectionObserverEntry) => entry.isIntersecting).length;
        if (filteredEntriesLength > 0) setVisibleNodesCount(filteredEntriesLength);
      },
      // Observer OPTS Note: Threshold is set to .2 to ensure we're observing ALL visible nodes; partial or not.
      { root: carouselUlRef.current, rootMargin: '0px', threshold: 0.2 }
    );

    // Observe each list-item node of the first carousel
    const observeNodes = () => {
      if (carouselUlRef.current && carouselUlRef.current.children) {
        Array.from(carouselUlRef.current.children).forEach((node) => observer.observe(node));
      }
    };

    // Initial observation
    observeNodes();

    // Re-observe when carouselUlRef.current changes e.g. when media queries change the amount of visible nodes
    const mutationObserver: MutationObserver = new MutationObserver(observeNodes);
    if (carouselUlRef.current) mutationObserver.observe(carouselUlRef.current, { childList: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  };

  useEffect(() => observeCarouselNodes(), [carouselUlRef.current?.children]);

  /** SHARED STATE:
   * Carousel Media Pagination
   * Carousel Navigation X-Axis,
   * Carousel Navigation Y-Axis
   * */

  // const [xAxis, setXAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });
  // const [yAxis, setYAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });

  /** Carousel Navigation (X-Axis, Y-Axis)
   * Note: An X-Axis state must be created for each carousel; therefore, its state and logic live inside of the mapped component
   * Note: The Y-Axis state only requires a singular fire; therefore, its state and logic live inside this parent
   * */

  // const setAxisIndexes = (e: WheelEvent | KeyboardEvent) => {
  //   // Event Types
  //   const isWheelEvent: boolean = e instanceof WheelEvent;
  //   const isKeyboardEvent: boolean = e instanceof KeyboardEvent;

  //   // Y Axis Events
  //   const deltaY: number = (e as WheelEvent).deltaY;
  //   const isArrowUp: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowUp';
  //   const isArrowDown: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowDown';

  //   // X Axis Events
  //   const isArrowRight: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowRight';
  //   const isArrowLeft: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowLeft';

  //   // Calculations
  //   const fdMediaCarouselsLength: number = fdMediaRef.current ? fdMediaRef.current.children.length : 0;

  //   // Logic
  //   switch (true) {
  //     case isWheelEvent:
  //       setYAxis((prevState: typeof yAxis) => {
  //         return {
  //           prev: prevState.cur,
  //           cur: Math.max(0, Math.min(fdMediaCarouselsLength, prevState.cur + deltaY > 0 ? 1 : -1)),
  //         };
  //       });
  //       break;

  //     case (isKeyboardEvent && isArrowUp) || (isKeyboardEvent && isArrowDown):
  //       setYAxis((prevState: typeof yAxis) => {
  //         return {
  //           prev: prevState.cur,
  //           cur: Math.max(0, Math.min(fdMediaCarouselsLength, prevState.cur + (isArrowUp ? -1 : 1))),
  //         };
  //       });
  //       break;

  //     case (isKeyboardEvent && isArrowRight) || (isKeyboardEvent && isArrowLeft):
  //       setXAxis((prevState: typeof xAxis) => {
  //         return {
  //           prev: prevState.cur,
  //           cur: Math.max(0, Math.min(fdMediaCarouselsLength, prevState.cur + (isArrowRight ? 1 : -1))),
  //         };
  //       });
  //       break;

  //     default:
  //       e.preventDefault();
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   fdMediaRef.current?.addEventListener('wheel', setAxisIndexes);
  //   window.addEventListener('keyup', setAxisIndexes);

  //   return () => {
  //     fdMediaRef.current?.removeEventListener('wheel', setAxisIndexes);
  //     window.removeEventListener('keyup', setAxisIndexes);
  //   };
  // }, []);

  // Y Axis Scroll method
  // useEffect(() => {
  //   if (!fdMediaRef.current || !fdMediaRef.current.children) return;
  //   const fdMediaCarouselActiveNode = fdMediaRef.current.children[yAxis.cur] as HTMLElement;
  //   const fdMediaCarouselPrevActiveNode = fdMediaRef.current.children[yAxis.prev] as HTMLElement;

  //   if (!fdMediaCarouselActiveNode || !fdMediaCarouselPrevActiveNode) return;

  //   // Calculations
  //   const activeCarouselOffsetTop: number = fdMediaCarouselActiveNode.offsetTop;
  //   const fdMediaMarginTop: number = parseInt(fdMediaRef.current.style.marginTop);

  //   // Scroll method
  //   fdMediaRef.current.scrollTo({
  //     top: activeCarouselOffsetTop - fdMediaMarginTop,
  //     behavior: 'smooth',
  //   });

  //   // Data-attribute handler
  //   fdMediaCarouselActiveNode.setAttribute('data-visibility', 'visible');
  //   fdMediaCarouselPrevActiveNode.setAttribute('data-visibility', 'hidden');
  // }, [yAxis.cur]);

  // // X Axis Scroll method
  // useEffect(() => {
  //   if (!fdMediaRef.current || !fdMediaRef.current.children || !carouselUlRef.current || !carouselUlRef.current.children) return;

  //   // All mapped carousels
  //   const carouselsArr: Element[] = [...fdMediaRef.current.children];
  //   const activeCarousel = carouselsArr[yAxis.cur] as HTMLUListElement;
  //   const prevActiveCarousel = carouselsArr[yAxis.prev] as HTMLUListElement;
  //   if (!carouselsArr || !activeCarousel || !prevActiveCarousel) return;

  //   // Inactive && active (active) carousel nodes
  //   const activeCarouselWrapper = activeCarousel.children[1] as HTMLHeadElement;
  //   const activeCarouselUL = activeCarouselWrapper.children[0] as HTMLUListElement;
  //   if (!activeCarouselWrapper || !activeCarouselUL) return;

  //   const activeCarouselLI = activeCarouselUL.children[xAxis.prev] as HTMLLIElement;
  //   const prevActiveCarouselNode = activeCarouselUL.children[xAxis.prev] as HTMLLIElement;
  //   if (!activeCarouselLI || !prevActiveCarouselNode) return;

  //   // X Axis scroller
  //   activeCarousel.scrollTo({ left: activeCarouselLI.offsetLeft, behavior: 'smooth' });

  //   // Data-attributes for active && inactive carousels
  //   activeCarouselLI.setAttribute('data-activity', 'focused');
  //   prevActiveCarouselNode.removeAttribute('data-activity');
  // }, [xAxis.cur]);

  /** VIDEO PLAYER STATE
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   * */
  // const [trailerCache, setTrailerCache] = useState<Type_useFDWebStorage_Trailer_Obj[]>();

  // const useFetchTrailer = (index: number) => {
  //   const controller: AbortController = new AbortController();
  //   const cachedTrailers = useFilmDatabaseWebStorage({
  //     userLocation: useLocationPathname,
  //     cacheKey: 'trailerCache',
  //   }).getData() as Type_useFDWebStorage_Trailer_Obj[];
  //   const isCachedTrailer: boolean = cachedTrailers?.some((obj) => obj.trailer_id === index);

  //   if (!isCachedTrailer) {
  //     (async (): Promise<void> => {
  //       const trailerObjData = await useTmdbApi({
  //         controller: controller,
  //         payload: {
  //           tmdbEndPointObj: tmdbEndPoints.movie_trailer_videos,
  //           trailer_id: { typeGuardKey: 'trailer_id', propValue: `${index}` },
  //         } as unknown as Type_Tmdb_OptParamTrailer_Obj,
  //       });

  //       const trailerObj: Type_useFDWebStorage_Trailer_Obj[] = [
  //         {
  //           trailer_id: index,
  //           trailer: (trailerObjData as Type_Tmdb_ApiCallTrailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer'),
  //         },
  //       ];

  //       if (trailerObjData && trailerObj) {
  //         useFilmDatabaseWebStorage({ userLocation: useLocationPathname, data: trailerObj, cacheKey: 'trailerCache' }).setData();

  //         setTrailerCache((prevData: Type_useFDWebStorage_Trailer_Obj[] | undefined) => {
  //           if (prevData) return [...prevData, ...cachedTrailers];
  //           else return cachedTrailers;
  //         });
  //       }
  //     })();
  //   } else {
  //     setTrailerCache(cachedTrailers);
  //   }
  // };

  /** Component props context */
  const componentProps = {
    fdMediaRef: fdMediaRef,
    ref: carouselUlRefReceiver,
    carouselUlRef: carouselUlRef,
    visibleNodesCount: visibleNodesCount,
  };

  const ComponentPropsContext = createContext<typeof componentProps>(componentProps);

  const ComponentPropsProvider = ({ children }: { children?: ReactNode }): ReactElement => {
    return <ComponentPropsContext.Provider value={componentProps}>{children}</ComponentPropsContext.Provider>;
  };

  const useComponentProps = useContext(ComponentPropsContext);

  /** Get paginated data by key (autofill provided) */
  const getPaginatedDataByKey = (key: Type_Tmdb_Movie_Keys_Union) => {
    const keyValuePair = [key, paginatedData.get(key)];
    return keyValuePair;
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {/* <FDHero /> */}
      <section className='fdMedia' ref={fdMediaRef}>
        <ComponentPropsProvider>
          {getPaginatedDataByKey('now_playing')?.map((data) => <FDCarousel key={uuidv4()} data={data} isGridLayout={false} useComponentProps={useComponentProps} />)}
        </ComponentPropsProvider>
      </section>
      {/* <FDFooter /> */}
    </div>
  );
};

export default FDHomePage;
