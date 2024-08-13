import { Dispatch, RefObject, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';

const FDMenuToolbar = ({
  setRoute,
  toolbarObjArr,
  toggleMenus,
}: {
  setRoute: Dispatch<SetStateAction<Type_MovieGenre_Keys | 'home'>>;
  toolbarObjArr: (
    | {
        key: string;
        icon: JSX.Element;
        ref: undefined;
      }
    | {
        key: string;
        icon: JSX.Element;
        ref: RefObject<HTMLElement>;
      }
  )[];
  toggleMenus: (refParam: RefObject<HTMLElement> | undefined) => void;
}) => {
  return (
    <>
      {toolbarObjArr.map((obj) => (
        <li className='fdMenu__toolbar__ul__li' key={uuidv4()}>
          <button
            className='fdMenu__toolbar__ul__li--button'
            aria-label={`Select ${obj.key}`}
            onClick={() => {
              toggleMenus(obj.ref);
              obj.key === 'Home' ? setRoute('home') : null;
            }}>
            <span className='fdMenu__toolbar__ul__li--button--icon'>{obj.icon}</span>
          </button>
        </li>
      ))}
    </>
  );
};

export default FDMenuToolbar;
