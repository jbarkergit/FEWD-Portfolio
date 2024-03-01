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
import FDCarouselWrapper from '../components/carousels/carousel-wrapper/FDCarouselWrapper';
import FDFooter from '../components/navigation/footer/FDFooter';

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
      const data = await useTmdbApi({ controller, tmdbEndPointKeyValuePairArr: tmdbEndPoints.movieLists });
      setTmdbDataArr(data);
    })();

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();

    // Optional: Ensure data is up to date by watching /api/data/tmdbEndPoints
  }, []);

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {tmdbDataArr.map((entry) => (
        <FDCarouselWrapper mapKey={entry.key} mapValue={entry.value} key={uuidv4()} />
      ))}
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
