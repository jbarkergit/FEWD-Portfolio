import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { array } from 'zod/v4';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountModalPoster = ({ films }: { films: Namespace_Tmdb.BaseMedia_Provider[] }) => {
  /** @state */
  const [posters, setPosters] = useState<Namespace_Tmdb.BaseMedia_Provider[]>([]);

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
        const j = Math.floor(Math.random() * (i + 1));
        [nextQueue[i], nextQueue[j]] = [nextQueue[j], nextQueue[i]];
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
    for (let i = 0; i < films.length; i++) tempPosterQueue.push(films[indexQueue.current[i]]);
    setPosters(tempPosterQueue);
  };

  useEffect(() => {
    createPosters();
    setInterval(() => createPosters(), films.length * 7500);
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
