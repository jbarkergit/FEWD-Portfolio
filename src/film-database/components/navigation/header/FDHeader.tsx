import { Link } from 'react-router-dom';
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
import { useFormatApiKey } from '../../../hooks/useFormatApiKey';
import useCreatePicture from '../../../hooks/useCreatePicture';
import TmdbLogoShort from '../../../assets/logo/TmdbLogoShort';
import FDSearchBar from '../../features/search-bar/FDSearchBar';

const FDHeader = () => {
  return (
    <header className='fdHeader'>
      <section className='fdHeader__row'>
        <section className='fdHeader__row__logo'>
          <Link to='https://www.themoviedb.org/' target='_blank'>
            {useCreatePicture({ svg: <TmdbLogoShort />, alt: 'TMDB API Logo' })}
          </Link>
        </section>
        <section className='fdHeader__row__searchBar'>
          <FDSearchBar />
        </section>
        <section className='fdHeader__row__features'></section>
      </section>

      <section className='fdHeader__row'>
        <nav className='fdHeader__row__navigation'>
          <ul className='fdHeader__row__navigation__ul' aria-labelledby='navigate-to-genre'>
            {Object.entries(tmdbEndPoints).map(([key, value]) => {
              if (['movieLists', 'movies', 'trending'].includes(key)) {
                return (
                  <li id='navigate-to-genre' key={key}>
                    <Link to={`/film-database/${key}`} aria-label={useFormatApiKey(key)}>
                      {useFormatApiKey(key)}
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </section>
    </header>
  );
};
export default FDHeader;
