// Deps
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// Hooks
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
// Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

const FDAccountBackground = (): JSX.Element => {
  const pathname = useLocation().pathname;
  const [responseSets, setResponseSets] = useState<Type_Tmdb_Api_Union[][]>([]);
  const liRefs = useRef<HTMLLIElement[]>([]);

  /** Fetch data */
  const fetchData = async (): Promise<void> => {
    try {
      const sessionSafeKeyEndpointPairArr = [useTmdbUrlBuilder('now_playing')].map((entry) => {
        const cachedData = useFilmDatabaseWebStorage(pathname).getData(entry.key);
        return cachedData && cachedData.length > 0 ? { key: entry.key, endpoint: cachedData } : entry;
      });

      const data = await useFetchTmdbResponse(sessionSafeKeyEndpointPairArr);
      if (!data) throw new Error('An error occured while fetching data.');
      createResponseSets(data);
      data.forEach((entry) => useFilmDatabaseWebStorage(pathname).setData(entry.key, entry.endpoint));
    } catch (Error) {
      console.error(Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathname]);

  /** Create sets from response data */
  const createResponseSets = (data: { key: string; endpoint: Type_Tmdb_Api_Union[] }[]): void => {
    const responseArr = data.flatMap((obj) => obj.endpoint);
    let responseSetArr: Type_Tmdb_Api_Union[][] = [];
    for (let i = 0; i < Math.ceil(responseArr.length / 4); i++) responseSetArr.push(responseArr.slice(i * 4, i * 4 + 4));
    setResponseSets(responseSetArr);
  };

  /** Gather list item refs */
  const liRef = (ref: HTMLLIElement) => {
    if (ref && !liRefs.current.includes(ref)) liRefs.current.push(ref);
  };

  /** Handle list items animations */
  const animateListItems = (): void => {
    if (liRefs.current.length === responseSets.flat().length) {
      liRefs.current.forEach((li: HTMLLIElement) => li.setAttribute('data-anim', 'mount'));
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => animateListItems());
  }, [responseSets]);

  /** Component */
  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop' data-anim='false'>
        {responseSets.map((set: Type_Tmdb_Api_Union[]) => {
          return (
            <ul className='fdAccountBackground__backdrop__set' key={uuidv4()}>
              {set.map((article: Type_Tmdb_Api_Union) => {
                const props = useTmdbProps(article);
                return (
                  <li className='fdAccountBackground__backdrop__set__li' ref={liRef} key={uuidv4()} data-anim='false'>
                    <article className='fdAccountBackground__backdrop__set__li__article'>
                      <figure className='fdAccountBackground__backdrop__set__li__article__graphic'>
                        <picture>
                          <img src={`https://image.tmdb.org/t/p/w780/${props?.backdrop_path}`} alt={`${props?.alt}`} />
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
    </div>
  );
};

export default FDAccountBackground;
