import { useEffect, useRef } from 'react';

import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import { TheMovieDatabaseLogo } from '../../assets/googleMaterialSymbols';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

const FDHero = ({ heroData }: Type_PropDrill) => {
  const backdropRef = useRef<HTMLImageElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => headerRef.current?.setAttribute('data-anim', 'fade-in'), [heroData]);
  useEffect(() => backdropRef.current?.setAttribute('data-anim', 'fade-out'), [heroData]);

  if (heroData) {
    const props = useTmdbProps(heroData);

    if (props)
      return (
        <section className='fdHero'>
          <article className='fdHero__article'>
            <header className='fdHero__article__header' ref={headerRef}>
              <TheMovieDatabaseLogo />
              <hgroup className='fdHero__article__header__details'>
                <h2>{props.heading}</h2>
                <p>{props.overview}</p>
                <span>{props.vote_average}</span>
              </hgroup>
            </header>
            <figure>
              <picture ref={backdropRef}>
                <img src={`https://image.tmdb.org/t/p/original/${props.backdrop_path}`} alt={props.heading} />
              </picture>
              <figcaption>{props.heading}</figcaption>
            </figure>
          </article>
        </section>
      );
  }
};

export default FDHero;
