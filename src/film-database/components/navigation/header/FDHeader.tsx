import { Link } from 'react-router-dom';
import FDSearchBar from '../../features/search-bar/FDSearchBar';
import FDGenreNavigation from '../../features/genre-navigation/FDGenreNavigation';

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
        <FDGenreNavigation />
      </section>
    </header>
  );
};
export default FDHeader;
