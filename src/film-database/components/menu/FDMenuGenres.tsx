import { v4 as uuidv4 } from 'uuid';
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';
import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';
import { forwardRef, RefObject } from 'react';

type Type_PropDrill = {
  setRoute: React.Dispatch<React.SetStateAction<Type_MovieGenre_Keys | undefined>>;
  toggleMenus: (refParam: RefObject<HTMLElement> | undefined) => void;
};

const FDMenuGenres = forwardRef<HTMLElement, Type_PropDrill>(({ setRoute, toggleMenus }, menuGenresRef) => {
  return (
    <section className='fdMenu__menu__genres' ref={menuGenresRef} data-menu='closed'>
      <nav className='fdMenu__menu__genres__nav'>
        <ul className='fdMenu__menu__genres__nav__ul'>
          {useTmdbGenres()
            .sortedMap()
            .map((genre) => (
              <li
                className='fdMenu__menu__genres__nav__ul__li'
                key={uuidv4()}
                onClick={() => {
                  toggleMenus(undefined);
                  setRoute(genre.replace(' ', '_') as Type_MovieGenre_Keys);
                }}>
                <button className='fdMenu__menu__genres__nav__ul__li--button'>{genre}</button>
              </li>
            ))}
        </ul>
      </nav>
    </section>
  );
});

export default FDMenuGenres;
