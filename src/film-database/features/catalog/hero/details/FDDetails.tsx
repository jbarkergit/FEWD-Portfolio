// Deps
import { Link } from 'react-router-dom';
// Context
import { useCatalogProvider } from '../../../../context/CatalogContext';
// Assets
import { TheMovieDatabaseLogo } from '../../../../assets/google-material-symbols/tmdbSymbols';

const FDDetails = () => {
  const { heroData } = useCatalogProvider();
  if (!heroData) return;

  return (
    <section className='fdDetails'>
      <article className='fdDetails__article'>
        <footer className='fdDetails__article__footer'>
          <Link to='https://www.themoviedb.org/?language=en-US'>
            <TheMovieDatabaseLogo />
          </Link>
        </footer>
        <header className='fdDetails__article__header'>
          <h2>{heroData.title}</h2>
        </header>
        <div className='fdDetails__article__details'>
          <div className='fdDetails__article__details__release'>
            <span>{`${Math.round(heroData.vote_average)}/10`}</span>
            <span>{heroData.release_date}</span>
          </div>
          <nav className='fdDetails__article__details__cta'>
            <Link to={`/film-database/${heroData.id}`} aria-label={`More details about ${heroData.title}`}>
              View more details
            </Link>
          </nav>
        </div>
        <div className='fdDetails__article__description'>
          <p>{heroData.overview}</p>
        </div>
      </article>
    </section>
  );
};

export default FDDetails;
