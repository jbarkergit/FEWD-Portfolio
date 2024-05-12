import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../composables/tmdb-api/data/tmdbEndPoints';
// Api Types
import { useTmdbApi } from '../composables/tmdb-api/hooks/useTmdbApi';
import {
  Type_Tmdb_ApiCallTrailer_Obj,
  Type_Tmdb_ApiCall_Union,
  Type_Tmdb_OptParamTrailer_Obj,
  Type_Tmdb_useApiReturn_Obj,
} from '../composables/tmdb-api/types/TmdbDataTypes';
// Api Hooks
import { Type_useFDWebStorage_Trailer_Obj, useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
// Components
import FDCarousel from '../components/carousel/FDCarousel';
import FDHeader from '../components/header/FDHeader';
import FDFooter from '../components/footer/FDFooter';
import FDHero from '../components/hero/FDHero';
import { useDiscoverGenre } from '../composables/tmdb-api/hooks/useDiscoverGenre';

const FDHomePage = () => {
  // References
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselUlRefReceiver = useRef<HTMLUListElement>(null);
  const carouselUlRef = carouselUlRefReceiver;

  /** Network Traffic Performance technique notes
   * API Memoization may not be the best technique here, given you'd still need to make an API call to ensure data is up to date.
   * To prevent unnecessary API calls, I've employed a solution that utilizes localStorage to store data on mount.
   * If the data does not exist in localStorage || the most recent data is not up to date, the fetched data will replace the cached data.
   * This will prevent React from updating components until data is changed, which will now be exclusively on mount.
   *
   * This application will be an SPA; therefore, we're introducing a trade-off:
   * IF the API presents new data during the session (post-mount), the user won't receive it as a real-time update.
   *
   * A potential solution to this would be to set intervals during session time to check if our data is consistent with the API data.
   * I've currently opted-out of implementing this technique; given this is merely a simple front-end project.
   */

  const userLocationPath = useLocation().pathname;

  // Store cached data in state for component renders && pagination
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);

  useEffect(() => {
    // Controller
    const controller: AbortController = new AbortController();

    // Fetch calls
    (async () => {
      const nowPlaying: Type_Tmdb_useApiReturn_Obj[] = await useTmdbApi({
        controller: controller,
        payload: tmdbEndPoints.movie_lists.nowPlaying,
      });

      const prefabs: Type_Tmdb_useApiReturn_Obj[] = await useTmdbApi({
        controller: controller,
        payload: [tmdbEndPoints.movie_lists.popular, tmdbEndPoints.movie_lists.topRated, tmdbEndPoints.movie_lists.upcoming],
      });

      const trending: Type_Tmdb_useApiReturn_Obj[] = await useTmdbApi({
        controller: controller,
        payload: [tmdbEndPoints.movie_trending.trendingDay, tmdbEndPoints.movie_trending.trendingWeek],
      });

      // const discover: Type_Tmdb_useApiReturn_Obj[] = await useTmdbApi({
      //   controller: controller,
      //   payload: { tmdbEndPointObj: { ...tmdbEndPoints.movie_discover, label: 'Discover Horror' }, discover: useDiscoverGenre({ type: 'movie', genre: 'horror' }) },
      // });

      // Merged fetch calls
      const mergedFetchedData = [...nowPlaying, ...prefabs, ...trending];

      // Get Web Storage Data
      const webStorageData = useFilmDatabaseWebStorage({ userLocation: userLocationPath, cacheKey: ['nowPlaying', 'prefabs', 'trending'] }).getData() as
        | Type_Tmdb_useApiReturn_Obj[]
        | undefined;

      // If fetched data does not exist, set state and Web Storage
      const isMergedDataCached: boolean | undefined = webStorageData?.some((webStorageObj) =>
        mergedFetchedData.some((fetchedDataObj) => fetchedDataObj.key !== webStorageObj.key)
      );

      if (!webStorageData || !isMergedDataCached) {
        // State Setter
        setTmdbDataArr(mergedFetchedData);

        // Web Storage Setter
        [{ nowPlaying, prefabs, trending }].forEach((dataObject) => {
          Object.entries(dataObject).forEach(([key, value]) => {
            useFilmDatabaseWebStorage({ userLocation: userLocationPath, data: value, cacheKey: key }).setData();
          });
        });

        // Else, set state with Web Storage
      } else {
        setTmdbDataArr(webStorageData);
      }
    })();

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();
  }, []);

  /** Carousel Visible Nodes State
   * Employed observers to watch for visible children nodes of carouselUl.current
   * Note: Intersectional Observer does not detect changes that may occur
   * Employment of Mutation Observer is required to ensure our observations are concurrent
   * Note: State may seem unnecessary; however, it's important to update the visible node count due to viewport sizing to refire our logic to force a rerender
   */

  const [visibleNodesCount, setVisibleNodesCount] = useState<number>(8);

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
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);
  const [xAxis, setXAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });
  const [yAxis, setYAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });

  /** Initial tmdbDataArr Pagination
   * On mount, slice values from indexes 0 to visibleNodeCounts (Assists all media device load times)
   * */
  const paginateTmdbDataArrOnMount = () => {
    const paginatedDataArr: typeof paginatedData = tmdbDataArr.map((obj) => {
      const paginatedValue: Type_Tmdb_ApiCall_Union[] = obj.value.slice(0, visibleNodesCount);
      return { key: obj.key, label: obj.label, value: paginatedValue };
    });

    setPaginatedData(paginatedDataArr);
  };

  useEffect(() => paginateTmdbDataArrOnMount(), [tmdbDataArr]);

  /** Carousel Navigation (X-Axis, Y-Axis)
   * Note: An X-Axis state must be created for each carousel; therefore, its state and logic live inside of the mapped component
   * Note: The Y-Axis state only requires a singular fire; therefore, its state and logic live inside this parent
   * */

  const setAxisIndexes = (e: WheelEvent | KeyboardEvent) => {
    // Event Types
    const isWheelEvent: boolean = e instanceof WheelEvent;
    const isKeyboardEvent: boolean = e instanceof KeyboardEvent;

    // Y Axis Events
    const deltaY: number = (e as WheelEvent).deltaY;
    const isArrowUp: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowUp';
    const isArrowDown: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowDown';

    // X Axis Events
    const isArrowRight: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowRight';
    const isArrowLeft: boolean = isKeyboardEvent && (e as KeyboardEvent).key === 'ArrowLeft';

    // Calculations
    const fdMediaCarouselsLength: number = fdMediaRef.current ? fdMediaRef.current.children.length : 0;

    // Logic
    switch (true) {
      case isWheelEvent:
        setYAxis((prevState: typeof yAxis) => {
          return {
            prev: prevState.cur,
            cur: Math.max(0, Math.min(fdMediaCarouselsLength, prevState.cur + deltaY > 0 ? 1 : -1)),
          };
        });
        break;

      case (isKeyboardEvent && isArrowUp) || (isKeyboardEvent && isArrowDown):
        setYAxis((prevState: typeof yAxis) => {
          return {
            prev: prevState.cur,
            cur: Math.max(0, Math.min(fdMediaCarouselsLength, prevState.cur + (isArrowUp ? -1 : 1))),
          };
        });
        break;

      case (isKeyboardEvent && isArrowRight) || (isKeyboardEvent && isArrowLeft):
        setXAxis((prevState: typeof xAxis) => {
          return {
            prev: prevState.cur,
            cur: Math.max(0, Math.min(fdMediaCarouselsLength, prevState.cur + (isArrowRight ? 1 : -1))),
          };
        });
        break;

      default:
        e.preventDefault();
        break;
    }
  };

  // useEffect(() => {
  //   fdMediaRef.current?.addEventListener('wheel', setAxisIndexes);
  //   window.addEventListener('keyup', setAxisIndexes);

  //   return () => {
  //     fdMediaRef.current?.removeEventListener('wheel', setAxisIndexes);
  //     window.removeEventListener('keyup', setAxisIndexes);
  //   };
  // }, []);

  // Y Axis Scroll method
  useEffect(() => {
    if (!fdMediaRef.current || !fdMediaRef.current.children) return;
    const fdMediaCarouselActiveNode = fdMediaRef.current.children[yAxis.cur] as HTMLElement;
    const fdMediaCarouselPrevActiveNode = fdMediaRef.current.children[yAxis.prev] as HTMLElement;

    if (!fdMediaCarouselActiveNode || !fdMediaCarouselPrevActiveNode) return;

    // Calculations
    const activeCarouselOffsetTop: number = fdMediaCarouselActiveNode.offsetTop;
    const fdMediaMarginTop: number = parseInt(fdMediaRef.current.style.marginTop);

    // Scroll method
    fdMediaRef.current.scrollTo({
      top: activeCarouselOffsetTop - fdMediaMarginTop,
      behavior: 'smooth',
    });

    // Data-attribute handler
    fdMediaCarouselActiveNode.setAttribute('data-visibility', 'visible');
    fdMediaCarouselPrevActiveNode.setAttribute('data-visibility', 'hidden');
  }, [yAxis.cur]);

  // X Axis Scroll method
  useEffect(() => {
    if (!fdMediaRef.current || !fdMediaRef.current.children || !carouselUlRef.current || !carouselUlRef.current.children) return;

    // All mapped carousels
    const carouselsArr: Element[] = [...fdMediaRef.current.children];
    const activeCarousel = carouselsArr[yAxis.cur] as HTMLUListElement;
    const prevActiveCarousel = carouselsArr[yAxis.prev] as HTMLUListElement;
    if (!carouselsArr || !activeCarousel || !prevActiveCarousel) return;

    // Inactive && active (active) carousel nodes
    const activeCarouselWrapper = activeCarousel.children[1] as HTMLHeadElement;
    const activeCarouselUL = activeCarouselWrapper.children[0] as HTMLUListElement;
    if (!activeCarouselWrapper || !activeCarouselUL) return;

    const activeCarouselLI = activeCarouselUL.children[xAxis.prev] as HTMLLIElement;
    const prevActiveCarouselNode = activeCarouselUL.children[xAxis.prev] as HTMLLIElement;
    if (!activeCarouselLI || !prevActiveCarouselNode) return;

    // X Axis scroller
    activeCarousel.scrollTo({ left: activeCarouselLI.offsetLeft, behavior: 'smooth' });

    // Data-attributes for active && inactive carousels
    activeCarouselLI.setAttribute('data-activity', 'focused');
    prevActiveCarouselNode.removeAttribute('data-activity');
  }, [xAxis.cur]);

  /** VIDEO PLAYER STATE
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   * */
  const [trailerCache, setTrailerCache] = useState<Type_useFDWebStorage_Trailer_Obj[]>();

  const useFetchTrailer = (index: number) => {
    const controller: AbortController = new AbortController();
    const cachedTrailers = useFilmDatabaseWebStorage({ userLocation: userLocationPath, cacheKey: 'trailerCache' }).getData() as Type_useFDWebStorage_Trailer_Obj[];
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

        const trailerObj: Type_useFDWebStorage_Trailer_Obj[] = [
          {
            trailer_id: index,
            trailer: (trailerObjData as Type_Tmdb_ApiCallTrailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer'),
          },
        ];

        if (trailerObjData && trailerObj) {
          useFilmDatabaseWebStorage({ userLocation: userLocationPath, data: trailerObj, cacheKey: 'trailerCache' }).setData();

          setTrailerCache((prevData: Type_useFDWebStorage_Trailer_Obj[] | undefined) => {
            if (prevData) return [...prevData, ...cachedTrailers];
            else return cachedTrailers;
          });
        }
      })();
    } else {
      setTrailerCache(cachedTrailers);
    }
  };

  /** Determine component's media data */
  const getMapData = (isGridLayout: boolean) => {
    return isGridLayout ? tmdbDataArr : paginatedData;
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {/* <FDHero /> */}
      <section className='fdMedia' ref={fdMediaRef}>
        {getMapData(false).map((obj) => (
          <FDCarousel
            key={uuidv4()}
            // Refs
            fdMediaRef={fdMediaRef}
            ref={carouselUlRefReceiver}
            carouselUlRef={carouselUlRef}
            // State
            visibleNodesCount={visibleNodesCount}
            // Layout
            isGridLayout={false}
            // Data
            tmdbDataObject={obj}
            tmdbDataArr={tmdbDataArr}
            // Hooks
            useFetchTrailer={useFetchTrailer}
          />
        ))}
      </section>
      {/* <FDFooter /> */}
    </div>
  );
};

export default FDHomePage;
