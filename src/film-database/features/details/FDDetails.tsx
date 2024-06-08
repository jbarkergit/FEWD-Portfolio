import { useEffect, useRef } from 'react';

import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import { TheMovieDatabaseLogo } from '../../assets/tmdbSymbols';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

const FDDetails = ({ heroData }: Type_PropDrill) => {
  const backdropRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => headerRef.current?.setAttribute('data-anim', 'fade-in'), [heroData]);
  useEffect(() => backdropRef.current?.setAttribute('data-anim', 'fade-out'), [heroData]);

  if (heroData) {
    const props = useTmdbProps(heroData);

    if (props)
      return (
        <section className='fdDetails'>
          <article className='fdDetails__article'>
            <header className='fdDetails__article__header' ref={headerRef}>
              <TheMovieDatabaseLogo />
              <hgroup className='fdDetails__article__header__hgroup'>
                <h2>{props.heading}</h2>
                <p>{props.overview}</p>
                <span>{props.vote_average}</span>
              </hgroup>
            </header>
          </article>
        </section>
      );
  }
};

export default FDDetails;
