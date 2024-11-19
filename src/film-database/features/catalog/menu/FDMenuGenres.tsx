import { v4 as uuidv4 } from 'uuid';
import { tmdbMovieGenres, Type_MovieGenre_Keys } from '../../../composables/tmdb-api/data/tmdbGenres';
import { forwardRef, RefObject, useMemo } from 'react';
import { useCatalogProvider } from '../../../context/CatalogContext';

type Type_PropDrill = {
  toggleMenus: (refParam: RefObject<HTMLElement> | undefined) => void;
};

const FDMenuGenres = forwardRef<HTMLElement, Type_PropDrill>(({ toggleMenus }, menuGenresRef) => {
  const { setRoute } = useCatalogProvider();

  const sortedGenreKeys = useMemo((): string[] => {
    return Object.keys(tmdbMovieGenres)
      .sort()
      .map((key) => key.replaceAll('_', ' '));
  }, [tmdbMovieGenres]);

  return (
    <nav className='fdMenuGenres' ref={menuGenresRef} data-menu='closed'>
      <ul className='fdMenuGenres__ul'>
        {sortedGenreKeys?.map((genre: string) => (
          <li className='fdMenuGenres__ul__li' key={uuidv4()}>
            <button
              className='fdMenuGenres__ul__li--button'
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
  );
});

export default FDMenuGenres;
