import { RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';

import { MaterialSymbolsHomeRounded, MaterialSymbolsMenuRounded, MaterialSymbolsSearch, TheMovieDatabaseLogo } from '../../assets/googleMaterialSymbols';
import FDSearchBar from '../../components/searchbar/FDSearchBar';

const FDMenu = () => {
  // Section refs
  const menuSearchRef = useRef<HTMLElement>(null);
  const menuGenresRef = useRef<HTMLElement>(null);

  // State
  const [openMenu, setOpenMenu] = useState<RefObject<HTMLElement> | undefined>(undefined);

  /** Toggle menus */
  useEffect(() => {
    if (!openMenu || !openMenu.current || !menuSearchRef.current || !menuGenresRef.current) return;
    openMenu.current.setAttribute('data-menu', 'open');
  }, [openMenu]);

  /** Component dependant data */
  const navigationKeyValuePairsArr = [
    ['Search', <MaterialSymbolsSearch />],
    ['Home', <MaterialSymbolsHomeRounded />],
    ['Genres', <MaterialSymbolsMenuRounded />],
  ];

  return (
    <section className='fdMenu'>
      <section className='fdMenu__toolbar'>
        <ul className='fdMenu__toolbar__ul'>
          {navigationKeyValuePairsArr.map(([key, icon]) => (
            <li className='fdMenu__toolbar__ul__li'>
              <button className='fdMenu__toolbar__ul__li--button' aria-label={`Select ${key}`}>
                <span className='fdMenu__toolbar__ul__li--button--icon'>{icon}</span>
                {openMenu !== undefined ? <span className='fdMenu__toolbar__ul__li--button--key'>{key}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className='fdMenu__menu'>
        <section className='fdMenu__menu__search' ref={menuSearchRef}>
          <FDSearchBar />
        </section>

        <section ref={menuGenresRef}>
          <nav className='fdMenu__menu__genres'>
            <ul className='fdMenu__menu__genres__ul'>
              {(useTmdbGenres() as string[]).map((genre) => (
                <li className='fdMenu__menu__genres__ul__li'>
                  <button className='fdMenu__menu__genres__ul__li--button'>{genre}</button>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </section>
    </section>
  );
};

export default FDMenu;

{
  /* 
<blockquote className='fdMenu__menu__tmdbCredit'>
  <p className='fdMenu__menu__tmdbCredit--p'>
    All media content along with associated information, images, and videos are provided courtesy of{' '}
    <Link to='https://www.themoviedb.org/' target='_blank'>
      themoviedb.org
    </Link>
    .
  </p>
</blockquote> */
}
