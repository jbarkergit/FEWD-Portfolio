// Deps
import { useEffect, useMemo, useRef, useState } from 'react';
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

  const objArr: Type_Tmdb_Api_Union[] | undefined = useMemo(() => {
    if (response) {
      return [...response].flatMap((obj) => obj.endpoint);
    } else {
      return undefined;
    }
  }, [response]);

  /** Background cursor follow */
  const ulRef = useRef<HTMLUListElement>(null);

  const followCursor = (e: PointerEvent) => {
    const { clientX: cursorX, clientY: cursorY } = e;

    if (!ulRef.current) return;
    const ulRefChildren = [...ulRef.current.children] as HTMLLIElement[];

    ulRefChildren.forEach((child: HTMLLIElement, index: number) => {
      const { left, top, width, height } = child.getBoundingClientRect();
      const elemCenter = { x: left + width / 2, y: top + height / 2 };
      const deltas = { x: cursorX - elemCenter.x, y: cursorY - elemCenter.y };
      child.style.transform = `translate(${deltas.x * Math.random()}px, ${deltas.y * Math.random()}px)`;
    });
  };

  useEffect(() => {
    window.addEventListener('pointermove', followCursor);
    return () => window.removeEventListener('pointermove', followCursor);
  }, []);

  return (
    <ul className='fdAccountBackground' ref={ulRef}>
      {objArr
        ? objArr.map((article) => {
            const props = useTmdbProps(article);
            return (
              <li className='fdAccountBackground__li' key={uuidv4()}>
                <article className='fdAccountBackground__li__article'>
                  <figure className='fdAccountBackground__li__article__graphic'>
                    <picture>
                      <img src={`https://image.tmdb.org/t/p/original/${props?.poster_path}`} alt={`${props?.alt}`} />
                      <figcaption>{`${props?.alt}`}</figcaption>
                    </picture>
                  </figure>
                </article>
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default FDAccountBackground;
