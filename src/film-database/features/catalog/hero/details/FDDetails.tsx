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
        <div className='fdDetails__article__description'>
          <p>{heroData.overview}</p>
        </div>
        <nav className='fdDetails__article__cta'>
          <Link to={`/film-database/${heroData.id}`} aria-label={`More details about ${heroData.title}`}>
            More details
          </Link>
        </nav>
      </article>
    </section>
  );
};

export default FDDetails;
