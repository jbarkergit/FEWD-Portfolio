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
      <div className='fdDetails__cta'>
        <button aria-label='View movie details'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
            <path fill='currentColor' d='M12 7q.425 0 .713-.288T13 6t-.288-.712T12 5t-.712.288T11 6t.288.713T12 7m-1 8h2V9h-2zm-9 7V2h20v16H6z'></path>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default FDDetails;
