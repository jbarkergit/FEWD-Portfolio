import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

// Find the visual center of an array's length
const getCenteredIndex = (length: number) => Math.round((length - 1) / 2);

const FDAccountAnimation = ({ accountRef }: { accountRef: React.RefObject<HTMLDivElement | null> }) => {
  const { primaryData } = useFLoader();
  const [posters, setPosters] = useState<TmdbMovieProvider[][]>();
  const animationRef = useRef<HTMLDivElement>(null);

  /** Aims to abstract logic from map scope in order to leverage TMDB image paths with numerous dimensions to improve image load times */
  const mostCenteredImageID: number = useMemo(() => {
    if (!primaryData[0]) return -1;

    const nowPlaying = primaryData[0].response.results;
    let posters: TmdbMovieProvider[][] = [];

    for (let i = 0; i < Math.ceil(nowPlaying.length / 4); i++) {
      posters.push(nowPlaying.slice(i * 4, i * 4 + 4));
    }

    if (!posters.length) return -1;

    setPosters(posters);

    const middleSet = posters[getCenteredIndex(posters.length)];
    if (!middleSet?.length) return -1;

    const middleItem = middleSet?.[getCenteredIndex(middleSet.length)];
    return middleItem?.id ?? -1;
  }, [primaryData[0]]);

  /** Mount animator */
  useEffect(() => animationRef.current?.setAttribute('data-visible', 'true'), []);

  /** Unmount animator */
  const unmountAnimation = (): void => {
    if (!animationRef.current || !accountRef.current) return;
    const attribute: string = 'data-visible';
    animationRef.current.setAttribute(attribute, 'false');
    accountRef.current.setAttribute(attribute, 'true');
  };

  return (
    <div className='fdAccountAnimation'>
      <div
        className='fdAccountAnimation__backdrop'
        ref={animationRef}
        data-visible='false'
        onAnimationEnd={unmountAnimation}>
        {posters?.map((set: TmdbMovieProvider[], setIndex: number) => (
          <ul
            className='fdAccountAnimation__backdrop__set'
            key={`backdrop-set-${setIndex}`}>
            {set.map((article: TmdbMovieProvider, index: number) => (
              <li
                className='fdAccountAnimation__backdrop__set__li'
                key={`backdrop-image-${article.id}`}
                style={{ '--i': index } as CSSProperties}>
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
};

export default FDAccountAnimation;
