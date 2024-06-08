import { RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';

import { MaterialSymbolsHomeRounded, MaterialSymbolsMenuRounded, MaterialSymbolsSearch, TheMovieDatabaseLogo } from '../../assets/googleMaterialSymbols';
import FDSearchBar from '../../components/searchbar/FDSearchBar';

const FDMenu = () => {
  /** Toggle menus */
  const menuRef = useRef<HTMLElement>(null);
  const menuSearchRef = useRef<HTMLElement>(null);
  const menuGenresRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Search', icon: <MaterialSymbolsSearch />, ref: menuSearchRef },
    { key: 'Home', icon: <MaterialSymbolsHomeRounded />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsMenuRounded />, ref: menuGenresRef },
  ];

  const toggleMenus = (refParam: RefObject<HTMLElement> | undefined) => {
    if (!menuRef.current) return;

    if (refParam !== undefined) {
      menuRef.current.setAttribute('data-modal', 'open');
      toolbarObjArr.forEach((obj) => {
        if (!refParam || !refParam.current || !obj.ref || !obj.ref.current) return;
        obj.ref.current !== refParam.current ? obj.ref.current.setAttribute('data-menu', 'closed') : obj.ref.current.setAttribute('data-menu', 'open');
      });
    } else {
      menuRef.current.setAttribute('data-modal', 'closed');
    }
  };

  return (
    <section className='fdMenu' ref={menuRef} data-modal='closed'>
      <section className='fdMenu__toolbar'>
        <ul className='fdMenu__toolbar__ul'>
          {toolbarObjArr.map((obj) => (
            <li className='fdMenu__toolbar__ul__li'>
              <button className='fdMenu__toolbar__ul__li--button' aria-label={`Select ${obj.key}`} onClick={() => toggleMenus(obj.ref)}>
                <span className='fdMenu__toolbar__ul__li--button--icon'>{obj.icon}</span>
                {/* <span className='fdMenu__toolbar__ul__li--button--key'>{obj.key}</span> */}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className='fdMenu__menu'>
        <section className='fdMenu__menu__search' ref={menuSearchRef} data-menu='closed'>
          <FDSearchBar />
        </section>

        <section className='fdMenu__menu__genres' ref={menuGenresRef} data-menu='closed'>
          <nav className='fdMenu__menu__genres__nav'>
            <ul className='fdMenu__menu__genres__nav__ul'>
              {(useTmdbGenres() as string[]).map((genre) => (
                <li className='fdMenu__menu__genres__nav__ul__li'>
                  <button className='fdMenu__menu__genres__nav__ul__li--button'>{genre}</button>
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
