// Deps
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Features
import FDUserAccountArticle from '../../features/account/article/FDUserAccountArticle';
import FDAccountRegistery from '../../features/account/registery/FDAccountRegistery';
// Components
import FDCarousel from '../../components/carousel/FDCarousel';
// Api Hooks
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
// Api Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
import FDAccountCarousel from '../../components/account/carousel/FDAccountCarousel';

const FDUserAccount = () => {
  const [response, setResponse] = useState<{ key: string; endpoint: Type_Tmdb_Api_Union[] }[] | undefined>();
  const pathname: string = useLocation().pathname;

  const fetch = () => {
    // Prevent unnecessary api calls(keyEndpointPair): Store data in place of endpoint if it exists in sessionStorage via mutation
    const sessionSafeKeyEndpointPairArr = [useTmdbUrlBuilder('now_playing')].map((entry) => {
      const getCachedDataByKey: Type_Tmdb_Api_Union[] | undefined = useFilmDatabaseWebStorage(pathname).getData(entry.key);
      const isKeyCached: boolean = !!getCachedDataByKey;

      if (isKeyCached && getCachedDataByKey && getCachedDataByKey.length > 0) {
        return { key: entry.key, endpoint: getCachedDataByKey };
      } else {
        return entry;
      }
    });

    // Fetch, set state
    useFetchTmdbResponse(sessionSafeKeyEndpointPairArr).then((data) => {
      if (data) {
        // Set state
        setResponse(data);
        // Prevent unnecessary api calls(session storage safeguard)
        data.forEach((entry) => useFilmDatabaseWebStorage(pathname).setData(entry.key, entry.endpoint));
      }
    });
  };

  useEffect(() => fetch(), []);

  return (
    <main className='fdUserAccount'>
      <FDAccountCarousel response={response} />
      <FDUserAccountArticle />
      <FDAccountRegistery />
    </main>
  );
};

export default FDUserAccount;
