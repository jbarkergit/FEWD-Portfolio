// Deps
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// Hooks
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
// Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

const FDAccountBackground = () => {
  const [response, setResponse] = useState<{ key: string; endpoint: Type_Tmdb_Api_Union[] }[] | undefined>();
  const pathname: string = useLocation().pathname;

  /** Fetch */
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

  const responseSetArr: Type_Tmdb_Api_Union[][] | undefined = useMemo(() => {
    if (!response) return undefined;

    const responseArr: Type_Tmdb_Api_Union[] = [...response].flatMap((obj) => obj.endpoint);
    let responseSetArr: Type_Tmdb_Api_Union[][] = [];

    for (let i = 0; i < Math.ceil(responseArr.length / 4); i++) {
      responseSetArr.push(responseArr.slice(i * 4, i * 4 + 4));
    }

    return responseSetArr;
  }, [response]);

  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop'>
        {responseSetArr?.map((set: Type_Tmdb_Api_Union[]) => {
          return (
            <ul className='fdAccountBackground__backdrop__set' key={uuidv4()}>
              {set.map((article: Type_Tmdb_Api_Union) => {
                const props = useTmdbProps(article);
                return (
                  <li className='fdAccountBackground__backdrop__set__li' key={uuidv4()}>
                    <article className='fdAccountBackground__backdrop__set__li__article'>
                      <figure className='fdAccountBackground__backdrop__set__li__article__graphic'>
                        <picture>
                          <img src={`https://image.tmdb.org/t/p/original/${props?.backdrop_path}`} alt={`${props?.alt}`} />
                          <figcaption>{`${props?.alt}`}</figcaption>
                        </picture>
                      </figure>
                    </article>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>

      {/* <ul className='fdAccountBackground__selection' key={uuidv4()}>
        {response?.map((obj) =>
          obj.endpoint.map((item) => {
            const props = useTmdbProps(item);
            return (
              <li className='fdAccountBackground__selection__li' key={uuidv4()}>
                <article className='fdAccountBackground__selection__li__article'>
                  <figure className='fdAccountBackground__selection__li__article__graphic'>
                    <picture>
                      <img src={`https://image.tmdb.org/t/p/original/${props?.backdrop_path}`} alt={`${props?.alt}`} />
                      <figcaption>{`${props?.alt}`}</figcaption>
                    </picture>
                  </figure>
                </article>
              </li>
            );
          })
        )}
      </ul> */}
    </div>
  );
};

export default FDAccountBackground;
