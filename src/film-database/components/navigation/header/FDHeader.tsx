import { Link } from 'react-router-dom';
import FDSearchBar from '../../features/search-bar/FDSearchBar';
import FDGenreNavigation from '../../features/genre-navigation/FDGenreNavigation';
import { ForwardedRef, RefObject, forwardRef } from 'react';

type Type_ForwardRef = {
  ref: RefObject<HTMLElement>;
};

const FDHeader = forwardRef<HTMLElement, Type_ForwardRef>(({}, ref: ForwardedRef<HTMLElement>) => {
  return (
    <header className='fdHeader' ref={ref}>
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
});
export default FDHeader;
