import { Link } from 'react-router-dom';

import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';

import { MaterialSymbolsHomeRounded, MaterialSymbolsMenuRounded, MaterialSymbolsSearch, TheMovieDatabaseLogo } from '../../assets/googleMaterialSymbols';

const FDMenu = () => {
  /**
   * expandable left to right menus
   * buttons on left
   * genres next to (grid)
   *
   * the backdrop will expand if additional menus are open
   *
   * super nested menus, will require components
   */
  return (
    <section className='fdMenu'>
      <section className='fdMenu__toolbar'>
        <ul className='fdMenu__toolbar__cta'>
          {[
            ['Search', <MaterialSymbolsSearch />],
            ['Home', <MaterialSymbolsHomeRounded />],
            ['Genres', <MaterialSymbolsMenuRounded />],
          ].map(([key, icon]) => (
            <li className='fdMenu__toolbar__cta__li'>
              <button className='fdMenu__toolbar__cta__li--button'>
                <span className='fdMenu__toolbar__cta__li--button--icon'>{icon}</span>
                <span className='fdMenu__toolbar__cta__li--button--key'>{key}</span>
              </button>
            </li>
          ))}
        </ul>

        <blockquote className='fdMenu__toolbar__tmdbCredit'>
          <p className='fdMenu__toolbar__tmdbCredit--p'>
            All media content along with associated information, images, and videos are provided courtesy of{' '}
            <Link to='https://www.themoviedb.org/' target='_blank'>
              themoviedb.org
            </Link>
            .
          </p>
        </blockquote>
      </section>

      <nav className='fdMenu__genres'>
        <ul className='fdMenu__genres__ul'>
          {(useTmdbGenres() as string[]).map((genre) => (
            <li className='fdMenu__genres__ul__li'>
              <button className='fdMenu__genres__ul__li--button'>{genre}</button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default FDMenu;
