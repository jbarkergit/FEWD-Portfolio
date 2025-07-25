import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

const FDAccountModalPoster = () => {
  /** @loaderData */
  const { primaryData } = useFLoader();
  const nowPlaying = primaryData[0]?.response.results;
  if (!nowPlaying) return;

  /** @state */
  const [posters, setPosters] = useState<TmdbMovieProvider[]>([]);

  /** @ref */
  const indexQueue = useRef<number[]>([]);

  /**
   * @function shuffleIndexes()
   * @description Randomly shuffle indexQueue within bounds of the films array.
   */
  const shuffleIndexes = (): void => {
    const nextQueue: number[] =
      indexQueue.current.length - 1 >= nowPlaying.length ? [...indexQueue.current] : [...nowPlaying.keys()];

    // Fisher-Yates shuffle
    for (let i = nextQueue.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));

      const valI: number | undefined = nextQueue[i];
      const valJ: number | undefined = nextQueue[j];

      if (typeof valI === 'number' && typeof valJ === 'number') {
        [nextQueue[i], nextQueue[j]] = [valJ, valI];
      }
    }

    indexQueue.current = nextQueue;
  };

  /**
   * @function createPosters
   * @description Generate a random queue of film posters for the fade effect.
   */
  const createPosters = (): void => {
    shuffleIndexes();
    let tempPosterQueue: typeof posters = [];

    for (let i = 0; i < nowPlaying.length - 1; i++) {
      const j: number | undefined = indexQueue.current[i];
      if (j && nowPlaying[0]) tempPosterQueue.push(nowPlaying[j]!);
    }

    setPosters(tempPosterQueue);
  };

  useEffect(() => {
    createPosters();
    const totalDuration: number = (nowPlaying.length - 2) * 5700;
    const interval: NodeJS.Timeout = setInterval(() => createPosters(), totalDuration);
    return () => clearInterval(interval);
  }, [primaryData]);

  /** @JSX */
  return (
    <div className='fdAccount__container__wrapper'>
      <picture>
        {posters.map((poster, index) => (
          <img
            key={poster.poster_path}
            fetchPriority={index === posters.length - 1 ? 'high' : 'low'}
            src={`https://image.tmdb.org/t/p/original/${poster.poster_path}`}
            alt={poster.title}
            style={{ '--i': posters.length - index } as CSSProperties}
          />
        ))}
      </picture>
    </div>
  );
};

export default FDAccountModalPoster;
