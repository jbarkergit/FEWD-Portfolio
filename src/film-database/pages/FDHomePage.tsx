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
import { Type_useFilmDatabaseWebStorage_Obj, useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
// Components
import FDCarousel from '../components/carousel/FDCarousel';
import FDHeader from '../components/header/FDHeader';
import FDFooter from '../components/footer/FDFooter';
import FDHero from '../components/hero/FDHero';

type Type_getClampedIndex = { prev: number; cur: number } | undefined;

const FDHomePage = () => {
  // References
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselUl = useRef<HTMLUListElement>(null);

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

  const userLocation = useLocation();

  // Store cached data in state for component renders && pagination
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);

  useEffect(() => {
    const webStorageData = useFilmDatabaseWebStorage({ userLocation: userLocation, cacheKey: 'movieCache' }).getData() as Type_Tmdb_useApiReturn_Obj[] | null;
    const controller: AbortController = new AbortController();

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

      const mergedFetchedData = [...nowPlaying, ...prefabs, ...trending];

      if (!webStorageData || webStorageData.some((webStorageObj) => mergedFetchedData.some((item) => webStorageObj.key === item.key))) {
        setTmdbDataArr(mergedFetchedData);

        [{ nowPlaying, prefabs, trending }].forEach((dataObject) => {
          Object.entries(dataObject).forEach(([key, value]) => {
            useFilmDatabaseWebStorage({ userLocation, data: value, cacheKey: key }).setData();
          });
        });
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
   * Note: State may seem unnecessary; however, it's important to update the visible node count due to viewport sizing
   */

  const visibleNodesCount = useRef<number>(8);

  const observeCarouselNodes = () => {
    const observer: IntersectionObserver = new IntersectionObserver(
      // Filter entries that are intersecting (visible in DOM), pass length to state
      (entries: IntersectionObserverEntry[]) => {
        const filteredEntriesLength: number = entries.filter((entry: IntersectionObserverEntry) => entry.isIntersecting).length;
        if (filteredEntriesLength > 0) visibleNodesCount.current = filteredEntriesLength;
      },
      // Observer OPTS Note: Threshold is set to .2 to ensure we're observing ALL visible nodes; partial or not.
      { root: carouselUl.current, rootMargin: '0px', threshold: 0.2 }
    );

    // Observe each list-item node of the first carousel
    const observeNodes = () => {
      if (carouselUl.current && carouselUl.current.children) {
        Array.from(carouselUl.current.children).forEach((node) => observer.observe(node));
      }
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
  };

  useEffect(() => observeCarouselNodes(), [carouselUl.current?.children]);

  /** SHARED: Carousel Navigation && Pagination (Y-Axis) State */
  const [yAxis, setYAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });

  /** Data Pagination: Pushes data into state when setIndex changes (the user navigates)
   * Note: paginatedData will fire 6x times on mount due to virtual dom, 2x for each dependency mount
   *
   * tmdbDataArr dependency: This data is fetched; therefore, requires a watchful eye
   * btnNavIndex depdendency: This index state is fired by the carousel overlay, our main driver for pagination calculations
   * visibleNodesCount dependency: Repaginates data as the viewport resizes
   *
   * **ALERT!**
   * visibleNodesCount may be firing this too often, will require further inspection
   * visibleNodesCount as a dependency requires error boundaries to ensure our data is RE-paginated on viewport resize
   */
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);
  // useEffect(() => console.log(paginatedData), [paginatedData]);
  const [btnNavIndex, setBtnNavIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 1, currIndex: 1 });

  const getPaginatedData = (): void => {
    if (!tmdbDataArr) return;

    setPaginatedData((prevData: typeof paginatedData) => {
      // If tmdbDataArr hasn't been paginated, paginate all arrays on mount
      if (paginatedData.length === 0) {
        // Create a copy, slice existing values
        const paginatedDataArr: typeof paginatedData = tmdbDataArr.map((obj) => {
          // Starting index is 0 given tmdbDataArr's objects wouldn't have been paginated yet
          // Ending index is based on visibleNodesCount to assist load times on all media devices
          const paginatedValue: Type_Tmdb_ApiCall_Union[] = obj.value.slice(0, visibleNodesCount.current);

          return { key: obj.key, label: obj.label, value: paginatedValue };
        });

        // Return an array with each object's values paginated
        return paginatedDataArr;
      } else {
        // If tmdbDataArr HAS been paginated, isolate the targeted object's value, add new paginated data
        // Target values
        const targetToPaginate: Type_Tmdb_useApiReturn_Obj = tmdbDataArr[yAxis.cur];
        const existingPaginatedTarget: Type_Tmdb_useApiReturn_Obj = prevData[yAxis.cur];

        if (!targetToPaginate || !existingPaginatedTarget) return paginatedData;

        // Calculations
        const sliceStartIndex: number = existingPaginatedTarget.value.length + 1;
        const sliceEndIndex: number = visibleNodesCount.current * btnNavIndex.currIndex;

        // Slice new data (Slice creates a new arr; therefore, we won't need to create a copy of tmdbDataArr)
        const newValues: Type_Tmdb_ApiCall_Union[] = targetToPaginate.value.slice(sliceStartIndex, sliceEndIndex);

        // Merge existing paginated data with new paginated data
        const mergedValues: Type_Tmdb_ApiCall_Union[] = [...existingPaginatedTarget.value, ...newValues];

        // Create a new object with our paginated data
        const paginatedObj: Type_Tmdb_useApiReturn_Obj = { key: targetToPaginate.key, label: targetToPaginate.label, value: mergedValues };

        // Replace the targeted object with our new object
        const newPaginatedArr: typeof paginatedData = paginatedData.map((obj) => {
          if (obj.key === paginatedObj.key) return paginatedObj;
          else return obj;
        });

        // Return our new paginatedData copy with updated paginated data
        return newPaginatedArr;
      }
    });
  };

  useEffect(() => getPaginatedData(), [tmdbDataArr, btnNavIndex, visibleNodesCount]);

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

  /** Carousel Navigation (X-Axis, Y-Axis)
   * Note: An X-Axis state must be created for each carousel; therefore, its state and logic live inside of the mapped component
   * Note: The Y-Axis state only requires a singular fire; therefore, its state and logic live inside this parent
   */
  const [xAxis, setXAxis] = useState<{ prev: number; cur: number }>({ prev: 0, cur: 0 });
  // useEffect(() => console.log(xAxis), [xAxis]);

  // Clamped state getter
  const getClampedIndex = (prevIndex: number, curIndex: number, increment: number): Type_getClampedIndex => {
    if (!fdMediaRef.current || !fdMediaRef.current.children) return;

    // Calculations
    const fdMediaCarouselsLength: number = fdMediaRef.current.children.length - 1;

    return {
      prev: Math.max(0, Math.min(fdMediaCarouselsLength, prevIndex + increment)),
      cur: Math.max(0, Math.min(fdMediaCarouselsLength, curIndex + increment)),
    };
  };

  // X-Axis && Y-Axis State setter
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

    // Logic
    switch (true) {
      case isWheelEvent:
        setYAxis((prevState: typeof yAxis) => {
          const clampedIndex: Type_getClampedIndex = getClampedIndex(prevState.prev, prevState.cur, deltaY > 0 ? 1 : -1);
          return clampedIndex as Exclude<Type_getClampedIndex, undefined>;
        });
        break;

      case (isKeyboardEvent && isArrowUp) || (isKeyboardEvent && isArrowDown):
        setYAxis((prevState: typeof yAxis) => {
          const clampedIndex: Type_getClampedIndex = getClampedIndex(prevState.prev, prevState.cur, isArrowUp ? -1 : 1);
          return clampedIndex as Exclude<Type_getClampedIndex, undefined>;
        });
        break;

      case (isKeyboardEvent && isArrowRight) || (isKeyboardEvent && isArrowLeft):
        setXAxis((prevState: typeof xAxis) => {
          const clampedIndex: Type_getClampedIndex = getClampedIndex(prevState.prev, prevState.cur, isArrowRight ? 1 : -1);
          return clampedIndex as Exclude<Type_getClampedIndex, undefined>;
        });
        break;

      default:
        e.preventDefault();
        break;
    }
  };

  useEffect(() => {
    fdMediaRef.current?.addEventListener('wheel', setAxisIndexes);
    window.addEventListener('keyup', setAxisIndexes);

    return () => {
      fdMediaRef.current?.removeEventListener('wheel', setAxisIndexes);
      window.removeEventListener('keyup', setAxisIndexes);
    };
  }, []);

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

  // X Axis Scroll method
  // useEffect(() => {
  //   if (!fdMediaCarousel.current || !fdMediaCarousel.current.children || !carouselUl.current || !carouselUl.current.children) return;

  //   // All mapped carousels
  //   const carouselsArr: Element[] = [...fdMediaCarousel.current.children];
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

  /** Component */

  const getMapData = (isGridLayout: boolean) => {
    return isGridLayout ? tmdbDataArr : paginatedData;
  };

  return (
    <div className='filmDatabase'>
      <FDHeader />
      <FDHero />
      <section className='fdMedia' ref={fdMediaRef}>
        {getMapData(false).map((tmdbDataObject) => (
          <FDCarousel
            key={uuidv4()}
            // Refs
            carouselUl={carouselUl}
            // State
            visibleNodesCount={visibleNodesCount}
            btnNavIndex={btnNavIndex}
            setBtnNavIndex={setBtnNavIndex}
            // Layout
            isGridLayout={false}
            // Data
            tmdbDataObject={tmdbDataObject}
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
