// Deps
import { useEffect, useRef } from 'react';
// Types
import type { Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountBackground = ({ responseSetArr }: { responseSetArr: Namespace_Tmdb.BaseMedia_Provider[][] }) => {
  /** Reference dependencies */
  const backdropRef = useRef<HTMLDivElement>(null),
    ulRefs = useRef<HTMLUListElement[]>([]);

  const ulRef = (ref: HTMLUListElement): void => {
    if (ref && !ulRefs.current.includes(ref)) ulRefs.current.push(ref);
  };

  /** Mount animations */
  const animator = (): void => {
    if (!backdropRef.current || !ulRefs.current) return;
    backdropRef.current.setAttribute('data-visible', 'mount');
    ulRefs.current.forEach((ul) => ul.setAttribute('data-visible', 'mount'));
  };

  /** Post mount visibility */
  useEffect(() => {
    setTimeout(() => backdropRef.current?.setAttribute('data-visible', 'false'), 3200);
  }, []);

  /** Component */
  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop' ref={backdropRef} data-visible='false'>
        {responseSetArr.map((set: Namespace_Tmdb.BaseMedia_Provider[], setIndex: number) => {
          return (
            <ul className='fdAccountBackground__backdrop__set' key={`backdropset${setIndex}`} ref={ulRef} data-visible='false'>
              {set.map((article: Namespace_Tmdb.BaseMedia_Provider, liIndex: number) => {
                const isCenteredListItem: boolean = setIndex === 2 && liIndex === 1;
                const isLastListItem: boolean = setIndex === responseSetArr.length - 1 && liIndex === 3;
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
