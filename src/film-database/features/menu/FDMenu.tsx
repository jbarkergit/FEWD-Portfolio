// Deps
import { Dispatch, RefObject, SetStateAction, useCallback, useRef } from 'react';
// Composables
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbGenres';
// Assets
import { MaterialSymbolsHome, MaterialSymbolsAnimatedImagesSharp } from '../../assets/google-material-symbols/menuSymbols';
// Features
import FDMenuToolbar from './FDMenuToolbar';
import FDMenuGenres from './FDMenuGenres';

const FDMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  setRoute,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setRoute: Dispatch<SetStateAction<Type_MovieGenre_Keys | 'home'>>;
}) => {
  const menuGenresRef = useRef<HTMLElement>(null),
    menuPropertyRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Home', icon: <MaterialSymbolsHome />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsAnimatedImagesSharp />, ref: menuGenresRef },
  ];

  const toggleMenus = useCallback((refParam: RefObject<HTMLElement> | undefined) => {
    if (refParam !== undefined) {
      setIsMenuOpen(true);
      toolbarObjArr.forEach((obj) => {
        if (!refParam || !refParam.current || !obj.ref || !obj.ref.current) return;
        obj.ref.current !== refParam.current ? obj.ref.current.setAttribute('data-menu', 'closed') : obj.ref.current.setAttribute('data-menu', 'open');
      });
    } else {
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <section className='fdMenu' data-modal={isMenuOpen ? 'open' : 'closed'}>
      <section className='fdMenu__toolbar'>
        <FDMenuToolbar setRoute={setRoute} toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />
      </section>
      <div className='fdMenu__menu'>
        <FDMenuGenres toggleMenus={toggleMenus} setRoute={setRoute} ref={menuGenresRef} />
      </div>
    </section>
  );
};

export default FDMenu;
