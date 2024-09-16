// Deps
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Hooks
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useLocation } from 'react-router-dom';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
// Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

const FDAccountBackground = (): JSX.Element => {
  const pathname: string = useLocation().pathname;
  const [responseSets, setResponseSets] = useState<Type_Tmdb_Api_Union[][]>([]);
  const [isLastUlMounted, setIsLastUlMounted] = useState<boolean>(false);
  useEffect(() => console.log(isLastUlMounted), [isLastUlMounted]);

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

  /** Reference dependencies */
  const backdropRef = useRef<HTMLDivElement>(null);

  /** Mutation observer tracking responseSets mapping in DOM */
  const observer = new MutationObserver((entries) => {
    if (!backdropRef.current) return undefined;

    const flattenedEntries: MutationRecord[] = entries.flat();
    const sets: HTMLUListElement[] = [...backdropRef.current.children] as HTMLUListElement[];
    const listItems: HTMLLIElement[] = sets?.flatMap((set: HTMLElement) => [...set.children]) as HTMLLIElement[];
    const lastListItem: HTMLLIElement = listItems[listItems.length - 1];

    const isLastItemAdded: boolean = flattenedEntries.some((entry: MutationRecord) => {
      const ul = entry.addedNodes[0] as HTMLElement;
      const ulLis: Element[] = [...ul.children];
      return ulLis.includes(lastListItem);
    });

    if (isLastItemAdded) setIsLastUlMounted(true);
    else setIsLastUlMounted(false);
  });

  useEffect(() => {
    if (backdropRef.current) observer.observe(backdropRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [responseSets]);

  /** Handle list items animations */
  useEffect(() => {
    if (!isLastUlMounted || !backdropRef.current) return;
    const sets: HTMLUListElement[] = [...backdropRef.current.children] as HTMLUListElement[];
    const listItems: HTMLLIElement[] = sets?.flatMap((set: HTMLElement) => [...set.children]) as HTMLLIElement[];
    listItems.forEach((li: HTMLLIElement) => li.setAttribute('data-anim', 'mount'));
    backdropRef.current?.setAttribute('data-anim', 'mount');
  }, [isLastUlMounted]);

  /** Component */
  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop' ref={backdropRef} data-anim='false'>
        {responseSets.map((set: Type_Tmdb_Api_Union[]) => {
          return (
            <ul className='fdAccountBackground__backdrop__set' key={uuidv4()}>
              {set.map((article: Type_Tmdb_Api_Union) => {
                const props = useTmdbProps(article);
                return (
                  <li className='fdAccountBackground__backdrop__set__li' key={uuidv4()} data-anim='false'>
                    <article className='fdAccountBackground__backdrop__set__li__article'>
                      <figure className='fdAccountBackground__backdrop__set__li__article__graphic'>
                        <picture>
                          <img src={`https://image.tmdb.org/t/p/w300/${props?.backdrop_path}`} alt={`${props?.alt}`} />
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
