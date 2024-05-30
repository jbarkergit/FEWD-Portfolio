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
          <div className='fdHero__infographic'>
            <div className='fdHero__infographic__slide'>
              <hgroup className='fdHero__infographic__details'>
                <h2>{props.heading}</h2>
                <p>{props.overview}</p>
                <span>{props.vote_average}</span>
              </hgroup>
              <figure>
                <picture>
                  <img src={`https://image.tmdb.org/t/p/original/${props.backdrop_path}`} alt={props.heading} />
                </picture>
                <figcaption></figcaption>
              </figure>
            </div>
          </div>
        </section>
      );
  }
};

export default FDHero;
