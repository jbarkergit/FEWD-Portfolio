import { v4 as uuidv4 } from 'uuid';
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';
import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';
import { forwardRef, RefObject, useRef } from 'react';

type Type_PropDrill = {
  isMenuOpen: boolean;
  toggleMenus: (refParam: RefObject<HTMLElement> | undefined) => void;
  setRoute: React.Dispatch<React.SetStateAction<Type_MovieGenre_Keys | undefined>>;
  menuSearchReference: HTMLElement | null;
};

const FDMenuGenres = forwardRef<HTMLElement, Type_PropDrill>(({ isMenuOpen, toggleMenus, setRoute, menuSearchReference }, menuGenresRef) => {
  /** Add genres to visibleGenres on scroll */
  const ulRef = useRef<HTMLUListElement>(null);

  const genres: string[] = useTmdbGenres()
    .sortedMap()
    .map((genre: string) => genre);

  return (
    <section className='fdMenu__menu__genres' ref={menuGenresRef} data-menu='closed'>
      <div className='fdMenu__menu__genres__container'>
        <h2 className='fdMenu__menu__genres__container__heading'>Select genre menu</h2>
        <nav className='fdMenu__menu__genres__container__nav'>
          <ul className='fdMenu__menu__genres__container__nav__ul' ref={ulRef}>
            {genres.map((genre: string) => (
              <li
                className='fdMenu__menu__genres__container__nav__ul__li'
                key={uuidv4()}
                data-activity-tracker='disabled'
                onClick={() => {
                  toggleMenus(undefined);
                  setRoute(genre.replace(' ', '_') as Type_MovieGenre_Keys);
                }}>
                <button className='fdMenu__menu__genres__container__nav__ul__li--button' aria-label={`Select genre ${genre}`}>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
});

export default FDMenuGenres;
