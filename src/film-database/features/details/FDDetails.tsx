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
                {/* <span>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='m8 18l4-3.05L16 18l-1.5-4.95l4-2.85h-4.9L12 5l-1.6 5.2H5.5l4 2.85zm4 4q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8'></path>
                  </svg>
                  {props.vote_average}
                </span> */}
              </hgroup>
            </header>
          </article>
        </section>
      );
  }
};

export default FDDetails;
