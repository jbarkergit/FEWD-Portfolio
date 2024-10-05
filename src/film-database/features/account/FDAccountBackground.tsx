// Deps
import { Dispatch, useEffect, useRef } from 'react';
// Hooks
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useLocation } from 'react-router-dom';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
// Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

type Type_PropDrill = {
  responseSets: Type_Tmdb_Api_Union[][];
  setResponseSets: Dispatch<React.SetStateAction<Type_Tmdb_Api_Union[][]>>;
};

const FDAccountBackground = ({ responseSets, setResponseSets }: Type_PropDrill): JSX.Element => {
  const pathname: string = useLocation().pathname;

  /** Reference dependencies */
  const backdropRef = useRef<HTMLDivElement>(null);
  const ulRefs = useRef<HTMLUListElement[]>([]);

  const ulRef = (ref: HTMLUListElement): void => {
    if (ref && !ulRefs.current.includes(ref)) ulRefs.current.push(ref);
  };

  /** Fetch data */
  const fetchData = async (): Promise<void> => {
    try {
      const sessionSafeKeyEndpointPairArr = [useTmdbUrlBuilder('now_playing')].map((entry) => {
        const cachedData = useFilmDatabaseWebStorage(pathname).getData(entry.key);
        return cachedData && cachedData.length > 0 ? { key: entry.key, endpoint: cachedData } : entry;
      });

      const data: { key: string; endpoint: Type_Tmdb_Api_Union[] }[] | undefined = await useFetchTmdbResponse(sessionSafeKeyEndpointPairArr);
      if (!data) throw new Error('An error occured while fetching data.');
      createResponseSets(data);
      data.forEach((entry) => useFilmDatabaseWebStorage(pathname).setData(entry.key, entry.endpoint));
    } catch (Error) {
      console.error(Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /** Create sets from response data */
  const createResponseSets = (data: { key: string; endpoint: Type_Tmdb_Api_Union[] }[]): void => {
    const responseArr = data.flatMap((obj) => obj.endpoint);
    let responseSetArr: Type_Tmdb_Api_Union[][] = [];
    for (let i = 0; i < Math.ceil(responseArr.length / 4); i++) responseSetArr.push(responseArr.slice(i * 4, i * 4 + 4));
    setResponseSets(responseSetArr);
  };

  /** Mount animations */
  const animator = (): void => {
    if (!backdropRef.current || !ulRefs.current) return;
    backdropRef.current.setAttribute('data-anim', 'mount');
    ulRefs.current.forEach((ul) => ul.setAttribute('data-anim', 'mount'));
  };

  /** Component */
  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop' ref={backdropRef} data-anim='false'>
        {responseSets.map((set: Type_Tmdb_Api_Union[], setIndex: number) => {
          return (
            <ul className='fdAccountBackground__backdrop__set' key={`backdropset${setIndex}`} ref={ulRef} data-anim='false'>
              {set.map((article: Type_Tmdb_Api_Union, liIndex: number) => {
                const props = useTmdbProps(article);
                const isCenteredListItem: boolean = setIndex === 2 && liIndex === 1;
                const isLastListItem: boolean = setIndex === responseSets.length - 1 && liIndex === 3;
                return (
                  <li className='fdAccountBackground__backdrop__set__li' key={article.id}>
                    <picture>
                      <img
                        src={`https://image.tmdb.org/t/p/${isCenteredListItem ? `original` : `w780`}/${props?.backdrop_path}`}
                        alt={`${props?.alt}`}
                        onLoad={() => (isLastListItem ? animator() : null)}
                      />
                      <figcaption>{`${props?.alt}`}</figcaption>
                    </picture>
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
