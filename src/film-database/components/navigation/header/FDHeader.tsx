import { Link } from 'react-router-dom';
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
import FDSearchBar from '../../features/search-bar/FDSearchBar';

const FDHeader = () => {
  return (
    <header className='fdHeader'>
      <section className='fdHeader__row'>
        <div className='fdLogo'>
          <Link to='/film-database' target='_blank'>
            <h1>
              <span>FILM</span>
              <span>DATABASE</span>
            </h1>
          </Link>
        </div>
      </section>

      <section className='fdHeader__row'>
        <FDSearchBar />
      </section>

      <section className='fdHeader__row'>
        <nav className='fdHeader__row__navigation'>
          <ul className='fdHeader__row__navigation__ul' aria-labelledby='navigate-to-genre'>
            {Object.entries(tmdbEndPoints).map(([key]) => {
              return (
                <li id='navigate-to-genre' key={key}>
                  <Link to={`/film-database/${key}`} aria-label={key}>
                    {key}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>
    </header>
  );
};
export default FDHeader;
