import { v4 as uuidv4 } from 'uuid';
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';
import { useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';
import { Dispatch, forwardRef, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

type Type_PropDrill = {
  toggleMenus: (refParam: RefObject<HTMLElement> | undefined) => void;
  setRoute: Dispatch<SetStateAction<Type_MovieGenre_Keys | 'home'>>;
};

const FDMenuGenres = forwardRef<HTMLElement, Type_PropDrill>(({ toggleMenus, setRoute }, menuGenresRef) => {
  const sortedGenres = useMemo((): string[] => {
    return useTmdbGenres().sortedMap();
  }, []);

  const [genres, setGenres] = useState<string[]>([]);

  const handleGenres = () => {
    const store: string[] = sortedGenres;
    setGenres(store);
  };

  useEffect(() => handleGenres(), []);

  return (
    <section className='fdMenu__menu__genres' ref={menuGenresRef} data-menu='closed'>
      <div className='fdMenu__menu__genres__container'>
        <h2 className='fdMenu__menu__genres__container__heading'>Select genre menu</h2>
        <nav className='fdMenu__menu__genres__container__nav'>
          <ul className='fdMenu__menu__genres__container__nav__ul'>
            {genres?.map((genre: string) => (
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
