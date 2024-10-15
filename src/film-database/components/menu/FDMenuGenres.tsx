import { v4 as uuidv4 } from 'uuid';
import { Type_MovieGenre_Keys, useTmdbGenres } from '../../composables/tmdb-api/hooks/useTmdbGenres';
import { Dispatch, forwardRef, RefObject, SetStateAction, useEffect, useState } from 'react';

type Type_PropDrill = {
  toggleMenus: (refParam: RefObject<HTMLElement> | undefined) => void;
  setRoute: Dispatch<SetStateAction<Type_MovieGenre_Keys | 'home'>>;
};

const FDMenuGenres = forwardRef<HTMLElement, Type_PropDrill>(({ toggleMenus, setRoute }, menuGenresRef) => {
  const { sortedMap, id } = useTmdbGenres();

  return (
    <section className='fdMenuGenres' ref={menuGenresRef} data-menu='closed'>
      <div className='fdMenuGenres__container'>
        <h2 className='fdMenuGenres__container--heading'>Select genre menu</h2>
        <nav className='fdMenuGenres__container__nav'>
          <ul className='fdMenuGenres__container__nav__ul'>
            {sortedMap?.map((genre: string) => (
              <li className='fdMenuGenres__container__nav__ul__li' key={uuidv4()} data-activity-tracker='disabled'>
                <button
                  className='fdMenuGenres__container__nav__ul__li--button'
                  aria-label={`Select genre ${genre}`}
                  onClick={() => {
                    toggleMenus(undefined);
                    setRoute(genre.replace(' ', '_') as Type_MovieGenre_Keys);
                  }}>
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
