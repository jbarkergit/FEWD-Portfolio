import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, type CSSProperties } from 'react';
import { useLoaderData } from 'react-router';
import type { Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountAnimation = forwardRef<HTMLDivElement, { unmountAnimation: () => void }>(({ unmountAnimation }, animationRef) => {
  /**
   * @function useEffect
   * @description Handles animation on mount
   */
  const exposedRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(animationRef, () => exposedRef.current!, []);
  useEffect(() => console.log(exposedRef), []);
  useEffect(() => exposedRef.current?.setAttribute('data-visible', 'true'), []);

  /** @loaderData */
  const { accountData } = useLoaderData();

  /**
   * @function getCenteredIndex
   * @description Finds the visual center of an array's length
   */
  const getCenteredIndex = (length: number) => Math.round((length - 1) / 2);

  /**
   * @function mostCenteredImageID
   * @description Aims to abstract logic from map scope in order to leverage TMDB image paths with numerous dimensions to improve image load times
   */
  const mostCenteredImageID: number = useMemo(() => {
    if (!accountData.length) return -1;

    const middleSet = accountData[getCenteredIndex(accountData.length)];
    if (!middleSet?.length) return -1;

    const middleItem = middleSet?.[getCenteredIndex(middleSet.length)];
    return middleItem?.id ?? -1;
  }, [accountData]);

  return (
    <div className='fdAccountAnimation'>
      <div className='fdAccountAnimation__backdrop' ref={exposedRef} data-visible='false' onAnimationEnd={unmountAnimation}>
        {accountData.map((set: Namespace_Tmdb.BaseMedia_Provider[], setIndex: number) => (
          <ul className='fdAccountAnimation__backdrop__set' key={`backdrop-set-${setIndex}`}>
            {set.map((article: Namespace_Tmdb.BaseMedia_Provider, index: number) => (
              <li className='fdAccountAnimation__backdrop__set__li' key={`backdrop-image-${article.id}`} style={{ '--i': index } as CSSProperties}>
                <picture className='fdAccountAnimation__backdrop__set__li__container'>
                  <img
                    className='fdAccountAnimation__backdrop__set__li__container--img'
                    src={`https://image.tmdb.org/t/p/${article.id === mostCenteredImageID ? `original` : `w780`}/${article?.backdrop_path}`}
                    alt={article?.title}
                  />
                </picture>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default FDAccountAnimation;
