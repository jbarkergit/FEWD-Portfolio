import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';

const FDAccountModalPoster = ({ films }: { films: TmdbMovieProvider[] }) => {
  /** @state */
  const [posters, setPosters] = useState<TmdbMovieProvider[]>([]);

  /** @ref */
  const indexQueue = useRef<number[]>([]);

  /**
   * @function generateOrShuffleIndexes()
   * @description Generate or shuffle randomly selected indexes within bounds of the films array.
   */
  const generateOrShuffleIndexes = (): void => {
    let nextQueue: number[] = [...indexQueue.current];

    // If index queue length is equal to or greater than the even films length, shuffle the queue via Fisher-Yates shuffle algorithm
    if (indexQueue.current.length >= films.length) {
      for (let i = nextQueue.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));

        const valI: number | undefined = nextQueue[i];
        const valJ: number | undefined = nextQueue[j];

        if (typeof valI === 'number' && typeof valJ === 'number') {
          nextQueue[i] = valJ;
          nextQueue[j] = valI;
        }
      }
    }
    // Generate unique indexes until the queue length matches the even films length
    else {
      while (nextQueue.length < films.length) {
        const randomIndex = Math.floor(Math.random() * films.length);
        if (!nextQueue.includes(randomIndex)) nextQueue.push(randomIndex);
      }
    }

    indexQueue.current = nextQueue;
  };

  /**
   * @function createPosters
   * @description Generate a random queue of film posters for the fade effect.
   */
  const createPosters = (): void => {
    generateOrShuffleIndexes();
    let tempPosterQueue: typeof posters = [];

    for (let i = 0; i < films.length; i++) {
      const j: number | undefined = indexQueue.current[i];
      if (j && films[j]) tempPosterQueue.push(films[j]);
    }

    setPosters(tempPosterQueue);
  };

  useEffect(() => {
    createPosters();
    const totalDuration: number = films.length * 6500;
    const interval: NodeJS.Timeout = setInterval(() => createPosters(), totalDuration);
    return () => clearInterval(interval);
  }, [films]);

  /** @JSX */
  return (
    <div className='fdAccount__container__wrapper'>
      <picture>
        {posters.map((poster, index) => (
          <img
            key={poster.poster_path}
            fetchPriority={index === 0 ? 'high' : 'low'}
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
