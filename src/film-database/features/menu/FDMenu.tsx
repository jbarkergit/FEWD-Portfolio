import { Link } from 'react-router-dom';

import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';

import { MaterialSymbolsHomeRounded, MaterialSymbolsLegendToggleRounded, TheMovieDatabaseLogo } from '../../assets/google-material-symbols/googleMaterialSymbols';

const FDMenu = () => {
  const genresStringArr = useTmdbGenres() as string[];

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
    <nav className='fdMenu'>
      <section className='fdMenu__section'>
        <Link to='https://www.themoviedb.org/' target='_blank'>
          <figure>
            <picture>
              <TheMovieDatabaseLogo />
            </picture>
            <figcaption>TMDB API</figcaption>
          </figure>
        </Link>

        <ul className='fdMenu__section__ul'>
          <li className='fdMenu__section__ul__li'>
            <button className='fdMenu__section__ul__li--button'>
              <MaterialSymbolsHomeRounded /> Home
            </button>
          </li>
          <li className='fdMenu__section__ul__li'>
            <button className='fdMenu__section__ul__li--button'>
              <MaterialSymbolsLegendToggleRounded /> Genres
            </button>
          </li>
        </ul>

        {/* <blockquote className='fdFooter__blockquote__tmdbApiCredit'>
          <p>
            All media content along with associated information, images, and videos are provided courtesy of{' '}
            <Link to='https://www.themoviedb.org/' target='_blank'>
              themoviedb.org.
            </Link>
          </p>
        </blockquote> */}
      </section>
      <section className='fdMenu__section'>
        <h2 className='fdMenu__section--heading'>Genres</h2>
        <ul className='fdMenu__section__ul'>
          {genresStringArr.map((genre) => (
            <li className='fdMenu__section__ul__li'>
              <button className='fdMenu__section__ul__li--button'>{genre}</button>
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
};

export default FDMenu;
