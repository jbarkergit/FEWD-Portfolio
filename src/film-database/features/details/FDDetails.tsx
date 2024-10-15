// Deps
import { Link } from 'react-router-dom';
// Composable Hook Types
import { Type_Tmdb_Api_Union, Type_Tmdb_ApiMovieList_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
// Assets
import { TheMovieDatabaseLogo } from '../../assets/google-material-symbols/tmdbSymbols';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

const FDDetails = ({ heroData }: Type_PropDrill) => {
  if (!heroData) return;
  const props = heroData as Type_Tmdb_ApiMovieList_Obj;

  return (
    <section className='fdDetails'>
      <div className='fdDetails__apiRef'>
        <Link to='https://www.themoviedb.org/?language=en-US'>
          <TheMovieDatabaseLogo />
        </Link>
      </div>
      <article className='fdDetails__article'>
        <header className='fdDetails__article__header'>
          <h2>{props?.title}</h2>
        </header>
        <div className='fdDetails__article__info'>
          <p>{props?.overview}</p>
        </div>
      </article>
      <div className='fdDetails__moreInfo'>
        <Link to={`/film-database/${props?.id}`} aria-label={`More details about ${props?.title}`}>
          More details
        </Link>
      </div>
    </section>
  );
};

export default FDDetails;
