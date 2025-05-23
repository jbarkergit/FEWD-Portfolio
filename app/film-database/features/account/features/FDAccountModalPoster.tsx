import { useEffect, useRef, useState } from 'react';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

const FDAccountModalPoster = ({ films }: { films: Namespace_Tmdb.BaseMedia_Provider[] }) => {
  const randomPoster = (): Namespace_Tmdb.BaseMedia_Provider => films[Math.floor(Math.random() * films.length)];

  const [previousPoster, setPreviousPoster] = useState<Namespace_Tmdb.BaseMedia_Provider>(randomPoster);
  const [poster, setPoster] = useState<Namespace_Tmdb.BaseMedia_Provider>(randomPoster);
  const [dissolve, setDissolve] = useState(false);

  const previousRef = useRef<HTMLPictureElement>(null);
  const currentRef = useRef<HTMLPictureElement>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDissolve(false); // Reset dissolve
  //     setPreviousPoster(poster);
  //     setPoster(randomPoster());
  //     setDissolve(true); // Trigger dissolve effect
  //   }, 6000);

  //   setDissolve(true); // Initial dissolve

  //   return () => clearInterval(interval);
  // }, [poster, films]);

  return (
    <div className='fdAccount__container__wrapper'>
      <picture>
        <img
          src={`https://image.tmdb.org/t/p/original/${previousPoster?.poster_path}`}
          alt={`${previousPoster?.title}`}
          fetchPriority={'high'}
          data-dissolve={dissolve}
        />
        <img src={`https://image.tmdb.org/t/p/original/${poster.poster_path}`} alt={`${poster.title}`} fetchPriority={'high'} data-dissolve={!dissolve} />
      </picture>
    </div>
  );
};

export default FDAccountModalPoster;
