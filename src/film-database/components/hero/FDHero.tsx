import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

const FDHero = ({ heroData }: Type_PropDrill) => {
  if (heroData) {
    const props = useTmdbProps(heroData);
    if (props)
      return (
        <section className='fdHero'>
          <article className='fdHero__article'>
            <header className='fdHero__article__header'>
              <hgroup className='fdHero__article__header__details'>
                <h2>{props.heading}</h2>
                <p>{props.overview}</p>
                <span>{props.vote_average}</span>
              </hgroup>
            </header>
            <figure>
              <picture>
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
