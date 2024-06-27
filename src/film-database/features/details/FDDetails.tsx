import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import { TheMovieDatabaseLogo } from '../../assets/google-material-symbols/tmdbSymbols';
import { Link } from 'react-router-dom';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

const FDDetails = ({ heroData }: Type_PropDrill) => {
  if (heroData) {
    const props = useTmdbProps(heroData);

    if (props)
      return (
        <section className='fdDetails'>
          <article className='fdDetails__article'>
            <header className='fdDetails__article__header'>
              <Link to='https://www.themoviedb.org/?language=en-US'>
                <TheMovieDatabaseLogo />
              </Link>
              <hgroup className='fdDetails__article__header__hgroup'>
                <h2>{props.heading}</h2>
                <p>{props.overview}</p>
              </hgroup>
            </header>
          </article>
        </section>
      );
  }
};

export default FDDetails;
