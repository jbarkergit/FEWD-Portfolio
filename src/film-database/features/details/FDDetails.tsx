// Deps
import { Link } from 'react-router-dom';
// Composable Hooks
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';
// Composable Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
// Assets
import { TheMovieDatabaseLogo } from '../../assets/google-material-symbols/tmdbSymbols';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

const FDDetails = ({ heroData }: Type_PropDrill) => {
  if (!heroData) return;
  const props = useTmdbProps(heroData);

  return (
    <section className='fdDetails'>
      <div className='fdDetails__apiRef'>
        <Link to='https://www.themoviedb.org/?language=en-US'>
          <TheMovieDatabaseLogo />
        </Link>
      </div>
      <article className='fdDetails__article'>
        <header className='fdDetails__article__header'>
          <h2>{props?.heading}</h2>
        </header>
        <div className='fdDetails__article__info'>
          <p>{props?.overview}</p>
        </div>
      </article>
      <div className='fdDetails__moreInfo'>
        <Link to={`/film-database/${props?.id}`} aria-label={`More details about ${props?.heading}`}>
          More details
        </Link>
      </div>
    </section>
  );
};

export default FDDetails;
