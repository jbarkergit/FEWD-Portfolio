import { useFilmDatabaseWebStorage } from '../../web-storage-api/useFilmDatabaseWebStorage';
import { tmdbEndPoints } from '../data/tmdbEndPoints';
import { Type_Tmdb_useApiReturn_Obj } from '../types/TmdbDataTypes';
import { useTmdbApi } from './useTmdbApi';

export const useHomeData = async (controller: AbortController, userLocationPath: string): Promise<Type_Tmdb_useApiReturn_Obj[]> => {
  // Fetch calls
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

  // If fetched data does not exist, return for state and Web Storage
  const isMergedDataCached: boolean | undefined = webStorageData?.some((webStorageObj) =>
    mergedFetchedData.some((fetchedDataObj) => fetchedDataObj.key !== webStorageObj.key)
  );

  if (!webStorageData || !isMergedDataCached) {
    // Web Storage Setter
    [{ nowPlaying, prefabs, trending }].forEach((dataObject) => {
      Object.entries(dataObject).forEach(([key, value]) => {
        useFilmDatabaseWebStorage({ userLocation: userLocationPath, data: value, cacheKey: key }).setData();
      });
    });

    // State Return
    return mergedFetchedData;

    // Else, return Web Storage for state
  } else {
    return webStorageData;
  }
};
