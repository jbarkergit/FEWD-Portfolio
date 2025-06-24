import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useLoaderData } from 'react-router';
import type { Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountBackground = () => {
  /** @loaderData */
  const { accountData } = useLoaderData();

  /** @state */
  const [visible, setVisible] = useState<boolean>(false);

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

  /**
   * @function counter
   * @description Manual counter helps assist when real world conditions are not ideal for loading images.
   * Example (prior implication): const isLastListItem = setIndex === accountData.length - 1 && liIndex === 3;
   */
  const counter = useRef<number>(0);

  // Simple reset of counter when accountData changes
  useEffect(() => {
    counter.current = 0;
  }, []);

  // Memoize total images to avoid recalculating on every render
  const totalImages = useMemo(() => accountData.reduce((total: number, set: Namespace_Tmdb.BaseMedia_Provider[]) => total + set.length, 0), [accountData]);

  // The magic stuff happens here
  const onLoadCounter = useCallback((): void => {
    counter.current += 1;
    if (counter.current === totalImages) setVisible(true);
  }, [totalImages]);

  /**
   * @function useLayoutEffect
   * @description This effect is used to set the visibility of the backdrop after it has mounted.
   */
  useLayoutEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => setVisible(false), 3200);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <div className='fdAccountBackground'>
      <div className='fdAccountBackground__backdrop' data-visible={String(visible)}>
        {accountData.map((set: Namespace_Tmdb.BaseMedia_Provider[], setIndex: number) => (
          <ul className='fdAccountBackground__backdrop__set' key={`backdrop-set-${setIndex}`}>
            {set.map((article: Namespace_Tmdb.BaseMedia_Provider, index: number) => (
              <li className='fdAccountBackground__backdrop__set__li' key={`backdrop-image-${article.id}`} style={{ '--i': index } as CSSProperties}>
                <picture className='fdAccountBackground__backdrop__set__li__container'>
                  <img
                    className='fdAccountBackground__backdrop__set__li__container--img'
                    src={`https://image.tmdb.org/t/p/${article.id === mostCenteredImageID ? `original` : `w780`}/${article?.backdrop_path}`}
                    alt={article?.title}
                    onLoad={onLoadCounter}
                    onError={onLoadCounter}
                    // style={mostCenteredImageID === article.id ? { border: '2px solid red' } : {}}
                  />
                </picture>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default FDAccountBackground;
