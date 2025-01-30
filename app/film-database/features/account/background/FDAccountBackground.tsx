// Deps
import { useEffect, useRef, useState } from 'react';
// Types
import { useTmdbFetcher } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import type { Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountBackground = () => {
  const [responseSets, setResponseSets] = useState<Namespace_Tmdb.BaseMedia_Provider[][]>([]);

  /** Reference dependencies */
  const backdropRef = useRef<HTMLDivElement>(null);
  const ulRefs = useRef<HTMLUListElement[]>([]);

  const ulRef = (ref: HTMLUListElement): void => {
    if (ref && !ulRefs.current.includes(ref)) ulRefs.current.push(ref);
  };

  /** Fetch && create sets from response data */
  const createResponseSets = async (): Promise<void> => {
    const data = (await useTmdbFetcher({ now_playing: undefined })) as Namespace_Tmdb.Prefabs_Obj;
    const results = data.now_playing.results;

    let responseSetArr: Array<typeof results> = [];
    for (let i = 0; i < Math.ceil(results.length / 4); i++) responseSetArr.push(results.slice(i * 4, i * 4 + 4));
    setResponseSets(responseSetArr);
  };

  useEffect(() => {
    createResponseSets();
  }, []);

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
        {responseSets.map((set: Namespace_Tmdb.BaseMedia_Provider[], setIndex: number) => {
          return (
            <ul className='fdAccountBackground__backdrop__set' key={`backdropset${setIndex}`} ref={ulRef} data-anim='false'>
              {set.map((article: Namespace_Tmdb.BaseMedia_Provider, liIndex: number) => {
                const isCenteredListItem: boolean = setIndex === 2 && liIndex === 1;
                const isLastListItem: boolean = setIndex === responseSets.length - 1 && liIndex === 3;
                return (
                  <li className='fdAccountBackground__backdrop__set__li' key={article.id}>
                    <div className='fdAccountBackground__backdrop__set__li__container'>
                      <img
                        className='fdAccountBackground__backdrop__set__li__container--img'
                        src={`https://image.tmdb.org/t/p/${isCenteredListItem ? `original` : `w780`}/${article?.backdrop_path}`}
                        alt={`${article?.title}`}
                        onLoad={() => (isLastListItem ? animator() : null)}
                      />
                    </div>
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
