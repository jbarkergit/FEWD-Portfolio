import { Link } from 'react-router-dom';
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
import { useFormatApiKey } from '../../../hooks/useFormatApiKey';
import useCreatePicture from '../../../hooks/useCreatePicture';
import TmdbLogoShort from '../../../icons/TmdbLogoShort';

const FDHeader = () => {
  return (
    <header className='fdHeader'>
      <nav className='fdHeader__nav'>
        <section className='fdHeader__nav__logo'>
          <Link to='https://www.themoviedb.org/' target='_blank'>
            {useCreatePicture({ svg: <TmdbLogoShort />, alt: 'TMDB API Logo' })}
          </Link>
        </section>
        <section className='fdHeader__nav__links'>
          <ul className='fdHeader__nav__links__ul' aria-labelledby='navigate-to-genre'>
            {Object.entries(tmdbEndPoints).map((arr) => (
              <li id='navigate-to-genre' key={arr[0]}>
                <Link to={`/film-database/${arr[0]}`} aria-label={useFormatApiKey(arr[0])}>
                  {useFormatApiKey(arr[0])}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className='fdHeader__nav__features'>
          {/* search bar */}
          {/* account */}
        </section>
      </nav>
    </header>
  );
};
export default FDHeader;
