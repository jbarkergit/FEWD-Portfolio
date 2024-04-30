import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../composables/tmdb-api/data/tmdbEndPoints';
// Api Types
import { useTmdbApi } from '../composables/tmdb-api/hooks/useTmdbApi';
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_OptParamTrailer_Obj, Type_Tmdb_useApiReturn_Obj } from '../composables/tmdb-api/types/TmdbDataTypes';
// Api Hooks
import { Type_useFilmDatabaseWebStorage_Obj, useFilmDatabaseWebStorage } from '../composables/web-storage-api/useFilmDatabaseWebStorage';
// Components
import FDCarousel from '../components/carousel/FDCarousel';
import FDHeader from '../components/header/FDHeader';
import FDFooter from '../components/footer/FDFooter';
import FDHero from '../components/hero/FDHero';

const FDHomePage = () => {
  const mediaRef = useRef<HTMLElement>(null);

  // Store cached data in state for component renders && pagination
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);

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

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      <FDHero />
      <section className='fdMedia' ref={mediaRef}>
        {tmdbDataArr.map((entry) => (
          <FDCarousel dataKey={entry.key} dataLabel={entry.label} dataValue={entry.value} isGridLayout={false} useFetchTrailer={useFetchTrailer} key={uuidv4()} />
        ))}
      </section>
      {/* <FDFooter /> */}
    </div>
  );
};

export default FDHomePage;
