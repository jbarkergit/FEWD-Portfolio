import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../api/data/tmdbEndPoints';
// Api Types
import { Type_Tmdb_ApiCallUnion_Obj, Type_Tmdb_Parent_StateObjArr, Type_Tmdb_Trailer_Obj } from '../api/types/TmdbDataTypes';
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
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_Parent_StateObjArr>([]);
  // Session Storage Data
  const userLocation = useLocation();
  const webStorageData: Type_Tmdb_Parent_StateObjArr | null = useFilmDatabaseWebStorage(userLocation).getData();

  useEffect(() => {
    /** Initialize an AbortController and a signal for aborting the fetch operations
     * I've opted out of Promise.all in favor of allSettled to ensure that we receive data from our custom API call data in the event that a call fails.
     * Unresolved promises will be filtered out once the array of endpoints has been iterated into the fetcher hook.
     * A controller has been employed to pass signals to each endpoint in order to abort fetch operations.
     */
    const controller = new AbortController();

    /** Fetch data */
    const getMergedData = async (): Promise<Type_Tmdb_Parent_StateObjArr> => {
      const movieLists = (await useTmdbApi({ controller, tmdbEndPointKeyValuePairArr: tmdbEndPoints.movieLists })) as Type_Tmdb_Parent_StateObjArr;

      // const moviesDetails = await useTmdbApi({
      //   controller: controller,
      //   tmdbEndPointKeyValuePairArr: tmdbEndPoints.movies.find((obj) => obj.key === 'details'),
      //   movie_id: '1096197-no-way-up',
      // });

      return [...movieLists] as Type_Tmdb_Parent_StateObjArr;
    };

    /** Network Traffic Performance Technique Notes
     * API Memoization may not be the best technique here, given you'd still need to make an API call to ensure data is up to date.
     * To prevent unnecessary API calls, I've employed a solution that utilizes sessionStorage to store data on mount and clear it post-session.
     * This includes a fail safe in the event that React updates components.
     *
     * This application will be an SPA; therefore, we're introducing a trade-off:
     * IF the API presents new data during the session (post-mount), the user won't receive it as a real-time update.
     *
     * A potential solution to this would be to set intervals during session time to check if our data is consistent with the API data.
     * I've currently opted-out of implementing this technique; given this is merely a simple front-end project.
     * If I were to opt-in, I'd use an alternative procedure involving localStorage, given the conditional statements wouldn't affect sessionStorage.
     * if (!webStorageData || (webStorageData && webStorageData.some((webStorageObj) => !mergedData.some((obj) => obj.key === webStorageObj.key))))
     */

    if (!webStorageData) {
      getMergedData()
        .then((mergedData) => {
          useFilmDatabaseWebStorage(userLocation, mergedData).setData();
          setTmdbDataArr(mergedData);
        })
        .catch((error) => console.error(error));
    } else {
      setTmdbDataArr(webStorageData);
    }

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();
  }, []);

  /** Video Player State */
  const [videoPlayerState, setVideoPlayerState] = useState<boolean>(false);
  const [videoPlayerTrailer, setVideoPlayerTrailer] = useState<Type_Tmdb_Trailer_Obj[]>([]);

  const useVideoPlayer = async (propertyId: string): Promise<void> => {
    const trailerObj = (await useTmdbApi({
      tmdbEndPointKeyValuePairArr: tmdbEndPoints.movies.find((obj) => obj.key === 'videos'),
      movie_id: `${propertyId}`,
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
        <FDMediaGrid
          mapKey={entry.key}
          mapValue={entry.value as unknown as Type_Tmdb_ApiCallUnion_Obj[]}
          useVideoPlayer={useVideoPlayer}
          grid={false}
          key={uuidv4()}
        />
      ))}
      <FDVideoPlayer videoPlayerState={videoPlayerState} setVideoPlayerState={setVideoPlayerState} videoPlayerTrailer={videoPlayerTrailer} />
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
