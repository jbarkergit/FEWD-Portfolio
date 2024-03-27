import { Link } from 'react-router-dom';
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
import { useFormatApiKey } from '../../../hooks/formatters/useFormatApiKey';
import FDSearchBar from '../../features/search-bar/FDSearchBar';

const FDHeader = () => {
  return (
    <header className='fdHeader'>
      <section className='fdHeader__row'>
        <section className='fdHeader__row__logo'>
          <Link to='/film-database' target='_blank'>
            <h1>
              <span>FILM</span>
              <span>DATABASE</span>
            </h1>
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
