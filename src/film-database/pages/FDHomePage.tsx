import { useEffect, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../api/data/tmdbEndPoints';
// Api Types
import { Type_Tmdb_Parent_StateObjArr } from '../api/types/TmdbDataTypes';
// Api Hooks
import { useTmdbApi } from '../api/hooks/useTmdbApi';
// Components
import FDHeader from '../components/navigation/header/FDHeader';
import FDFooter from '../components/navigation/footer/FDFooter';
import FDVideoPlayer from '../components/features/iframes/TDVideoPlayer';
import FDMediaGrid from '../components/media/FDMediaGrid';

/** Component NOTICE: Fetching and processing of data was designed, with reusability in mind, to allow for the application to grow by fetching only desired data */
const FDHomePage = () => {
  // Initialize a new Map to store our api entries and furthermore data
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_Parent_StateObjArr>([]);
  // useEffect(() => console.log(tmdbDataArr), [tmdbDataArr]);

  useEffect(() => {
    // Initialize an AbortController and a signal for aborting the fetch operations
    const controller = new AbortController();

    // Fetch, Process && Store Desired Data
    (async () => {
      const movieLists = await useTmdbApi({ controller, tmdbEndPointKeyValuePairArr: tmdbEndPoints.movieLists });

      // const moviesDetails = await useTmdbApi({
      //   controller: controller,
      //   tmdbEndPointKeyValuePairArr: tmdbEndPoints.movies.find((obj) => obj.key === 'details'),
      //   movie_id: '1096197-no-way-up',
      // });

      // Set state with merged desired data
      setTmdbDataArr([...movieLists]);
    })();

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();

    // Optional: Ensure data is up to date by watching /api/data/tmdbEndPoints
  }, []);

  /** Video Player State */
  const [videoPlayerState, setVideoPlayerState] = useState<boolean>(false);
  const [videoPlayerVideos, setVideoPlayerVideos] = useState<Type_Tmdb_Parent_StateObjArr>([]);

  const useVideoPlayer = async (propertyId: string): Promise<void> => {
    const videosArray = await useTmdbApi({ tmdbEndPointKeyValuePairArr: tmdbEndPoints.movies.find((obj) => obj.key === 'videos'), movie_id: `${propertyId}` });

    if (videosArray) {
      setVideoPlayerVideos(videosArray);
      setVideoPlayerState(true);
    }
  };

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {tmdbDataArr.map((entry) => (
        // <FDCarouselWrapper mapKey={entry.key} mapValue={entry.value} key={uuidv4()} />
        <FDMediaGrid mapKey={entry.key} mapValue={entry.value} key={uuidv4()} useVideoPlayer={useVideoPlayer} grid={true} />
      ))}
      <FDVideoPlayer videoPlayerState={videoPlayerState} setVideoPlayerState={setVideoPlayerState} videoPlayerVideos={videoPlayerVideos} />
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
