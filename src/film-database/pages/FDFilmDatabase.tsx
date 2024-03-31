import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../api/data/tmdbEndPoints';
// Api Types
import {
  Type_Tmdb_Discover_Obj_isUndefined,
  Type_Tmdb_Trailer_Obj,
  Type_Tmdb_useApiReturn_Obj,
  Type_Tmdb_useApiReturn_Obj_isUndefined,
} from '../api/types/TmdbDataTypes';
// Api Hooks
import { useTmdbApi } from '../api/hooks/useTmdbApi';
// Components
import FDHeader from '../components/navigation/header/FDHeader';
import FDFooter from '../components/navigation/footer/FDFooter';
import FDVideoPlayer from '../components/features/iframes/TDVideoPlayer';
import FDMediaGrid from '../components/media/FDMediaGrid';
import { useFilmDatabaseWebStorage } from '../hooks/web-storage-api/useFilmDatabaseWebStorage';

const FDHomePage = () => {
  // Store cached data in state for component renders && pagination
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);
  // Session Storage Data
  const userLocation = useLocation();
  const webStorageData: Type_Tmdb_useApiReturn_Obj[] | null = useFilmDatabaseWebStorage(userLocation).getData();

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

  useEffect(() => {
    const controller: AbortController = new AbortController();

    (async () => {
      const dataArr: Type_Tmdb_useApiReturn_Obj[] = await useTmdbApi({
        controller: controller,
        tmdbKeyValuePairUnion: [
          // tmdbEndPoints.movie_lists.nowPlaying,
          // tmdbEndPoints.movie_lists.popular,
          // tmdbEndPoints.movie_lists.topRated,
          // tmdbEndPoints.movie_lists.upcoming,
          // tmdbEndPoints.movie_trending.trendingDay,
          // tmdbEndPoints.movie_trending.trendingWeek,
          // { tmdbEndPointObj: tmdbEndPoints.movie_discover, discover: { type: 'movie', category: 'Horror' } },
        ],
      });

      if (!webStorageData || (dataArr && webStorageData.some((webStorageObj) => dataArr.some((dataArrObj) => dataArrObj?.key === webStorageObj?.key)))) {
        setTmdbDataArr(dataArr);
        useFilmDatabaseWebStorage(userLocation, dataArr).setData();
      } else {
        setTmdbDataArr(webStorageData);
      }
    })();

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();
  }, []);

  /** Video Player State
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerState handles the component visibility
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   */
  const [videoPlayerState, setVideoPlayerState] = useState<boolean>(false);
  const [videoPlayerTrailer, setVideoPlayerTrailer] = useState<Type_Tmdb_Trailer_Obj[]>([]);

  const useVideoPlayer = async (propertyId: string): Promise<void> => {
    const controller: AbortController = new AbortController();

    const trailerObj = (await useTmdbApi({
      controller: controller,
      tmdbKeyValuePairUnion: { tmdbEndPointObj: tmdbEndPoints.movie_trailer_videos, movie_id: `${propertyId}` },
    })) as Type_Tmdb_Trailer_Obj[];

    if (trailerObj) {
      setVideoPlayerTrailer(trailerObj);
      setVideoPlayerState(true);
    }
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {tmdbDataArr.map((entry) => (
        <FDMediaGrid dataKey={entry.key} dataLabel={entry.label} dataValue={entry.value} useVideoPlayer={useVideoPlayer} grid={false} key={uuidv4()} />
      ))}
      <FDVideoPlayer videoPlayerState={videoPlayerState} setVideoPlayerState={setVideoPlayerState} videoPlayerTrailer={videoPlayerTrailer} />
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
