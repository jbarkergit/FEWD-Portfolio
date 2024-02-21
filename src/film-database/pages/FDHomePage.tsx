import { useEffect, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../api/data/tmdbEndPoints';
// Api Hooks
import { useTmdbProcessor } from '../api/hooks/useTmdbProcessor';
// Components
import FDHeader from '../components/navigation/header/FDHeader';
import FDCarouselWrapper from '../components/carousels/carousel-wrapper/FDCarouselWrapper';
import FDFooter from '../components/navigation/footer/FDFooter';
import { Type_Tmdb_ApiCallUnion_Obj, Type_Tmdb_ProcessorReturn_MapEntriesPromise_isUndefined } from '../api/types/TmdbDataTypes';

/** Component NOTICE: Fetching and processing of data was designed, with reusability in mind, to allow for the application to grow by fetching only desired data */
const FDHomePage = () => {
  // Initialize a new Map to store our data from useTmdbProcessor()
  // const tmdbDataMap = new Map<string, Type_Tmdb_ProcessorReturn_ObjPromise>();
  const [tmdbDataMap, setTmdbDataMap] = useState<Map<string, Type_Tmdb_ApiCallUnion_Obj[]>>(new Map());
  // useEffect(() => console.log(tmdbDataMap), [tmdbDataMap]);

  useEffect(() => {
    // Initialize an AbortController and a signal for aborting the fetch operations
    const controller = new AbortController();
    const signal = controller.signal;

    // Individualize api calls to identify errors within the processor
    const movieListsPromise: Type_Tmdb_ProcessorReturn_MapEntriesPromise_isUndefined = useTmdbProcessor({
      tmdbEndPointKeyValuePairArr: tmdbEndPoints.movieLists,
      // signal: signal,
    });

    // Resolve key-value pair promise
    movieListsPromise.then((movieLists) => {
      movieLists?.forEach(async (list) => {
        // Resolve the key-value pair's promise value (fetched data)
        const resolvedValue = await list.value;
        // Store data in the event that there are no errors fetching and processing data
        if (list.key && resolvedValue) setTmdbDataMap((stateMap) => stateMap.set(list.key, resolvedValue.results as unknown as Type_Tmdb_ApiCallUnion_Obj[]));
        // If the data is undefined, signal a fetch abort
        else controller.abort();
      });
    });

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();

    // Optional: Ensure data is up to date by watching /api/data/tmdbEndPoints
  }, []);

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {[...tmdbDataMap].map(([key, value]) => (
        <FDCarouselWrapper mapKey={key} mapValue={value} key={uuidv4()} />
      ))}
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
