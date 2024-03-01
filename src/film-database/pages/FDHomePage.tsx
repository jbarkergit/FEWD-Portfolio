import { useEffect, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Api Data
import { tmdbEndPoints } from '../api/data/tmdbEndPoints';
// Api Types
import {
  Type_Tmdb_ApiCallUnion_Obj,
  Type_Tmdb_DataFetch_Obj,
  Type_Tmdb_Parent_StateObjArr,
  Type_Tmdb_ProcessorReturn_MapSettled_isUndefined,
} from '../api/types/TmdbDataTypes';
// Api Util
import { useTmdbProcessor } from '../api/util/useTmdbProcessor';
// Components
import FDHeader from '../components/navigation/header/FDHeader';
import FDCarouselWrapper from '../components/carousels/carousel-wrapper/FDCarouselWrapper';
import FDFooter from '../components/navigation/footer/FDFooter';

/** Component NOTICE: Fetching and processing of data was designed, with reusability in mind, to allow for the application to grow by fetching only desired data */
const FDHomePage = () => {
  // Initialize a new Map to store our api entries and furthermore data from useTmdbProcessor()
  const [tmdbDataArr, setTmdbDataArr] = useState<Type_Tmdb_Parent_StateObjArr>([]);
  // useEffect(() => console.log(tmdbDataArr), [tmdbDataArr]);

  useEffect(() => {
    // Initialize an AbortController and a signal for aborting the fetch operations
    const controller = new AbortController();

    // Individualize api calls to identify errors within the processor
    const fetchAndProcessEndPoint: Type_Tmdb_ProcessorReturn_MapSettled_isUndefined = useTmdbProcessor({
      tmdbEndPointKeyValuePairArr: tmdbEndPoints.movieLists,
      // controller: controller,
    });

    fetchAndProcessEndPoint.then((lists) => {
      if (Array.isArray(lists)) {
        lists.forEach(async (list) => {
          if (list.status === 'fulfilled') {
            const fulfilledList = list.value;

            if (fulfilledList) {
              const key: string = fulfilledList.key;
              const value: Type_Tmdb_DataFetch_Obj = await fulfilledList.value;
              const resultsArray: Type_Tmdb_ApiCallUnion_Obj[] = value.results;
              setTmdbDataArr([{ key: key, value: resultsArray }]);
            }
          }
        });
      } else console.error('Data type may be unresolved or undefined.');
    });

    // Abort any ongoing fetch operations when component unmounts
    return () => controller.abort();

    // Optional: Ensure data is up to date by watching /api/data/tmdbEndPoints
  }, []);

  /** Component */
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {tmdbDataArr ? tmdbDataArr.map((entry) => <FDCarouselWrapper mapKey={entry.key} mapValue={entry.value} key={uuidv4()} />) : null}
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
