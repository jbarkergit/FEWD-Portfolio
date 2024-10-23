// Deps
import { Link } from 'react-router-dom';
// Composable Hook Types
import { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
// Assets
import { TheMovieDatabaseLogo } from '../../assets/google-material-symbols/tmdbSymbols';

type Type_PropDrill = {
  heroData: Namespace_Tmdb.BaseMedia_Provider | undefined;
};

const FDDetails = ({ heroData }: Type_PropDrill) => {
  if (!heroData) return;

  return (
    <section className='fdDetails'>
      <div className='fdDetails__apiRef'>
        <Link to='https://www.themoviedb.org/?language=en-US'>
          <TheMovieDatabaseLogo />
        </Link>
      </div>
      <article className='fdDetails__article'>
        <header className='fdDetails__article__header'>
          <h2>{heroData.title}</h2>
        </header>
        <div className='fdDetails__article__info'>
          <p>{heroData.overview}</p>
        </div>
      </article>
      <div className='fdDetails__moreInfo'>
        <Link to={`/film-database/${heroData.id}`} aria-label={`More details about ${heroData.title}`}>
          More details
        </Link>
      </div>
    </section>
  );
};

export default FDDetails;
