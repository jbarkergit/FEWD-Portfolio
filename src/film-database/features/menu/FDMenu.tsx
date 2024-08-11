// Deps
import { Dispatch, RefObject, SetStateAction, useRef } from 'react';
// Composable types
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';
// Assets
import {
  MaterialSymbolsSearch,
  MaterialSymbolsHome,
  MaterialSymbolsAnimatedImagesSharp,
  IcBaselinePerson2,
  MaterialSymbolsMovie,
} from '../../assets/google-material-symbols/menuSymbols';
// Components
import FDMenuToolbar from '../../components/menu/FDMenuToolbar';
import FDMenuGenres from '../../components/menu/FDMenuGenres';
import FDMenuSearchBar from '../../components/menu/FDMenuSearchBar';
import FDMenuAccount from '../../components/menu/FDMenuAccount';
import FDMenuQueue from '../../components/menu/FDMenuQueue';

const FDMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  setRoute,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setRoute: Dispatch<SetStateAction<Type_MovieGenre_Keys | 'home'>>;
}) => {
  /** Toggle menus */
  const menuAccountRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuGenresRef = useRef<HTMLElement>(null);
  const menuSearchRef = useRef<HTMLElement>(null);
  const menuQueueRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Account', icon: <IcBaselinePerson2 />, ref: menuAccountRef },
    { key: 'Home', icon: <MaterialSymbolsHome />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsAnimatedImagesSharp />, ref: menuGenresRef },
    { key: 'Search', icon: <MaterialSymbolsSearch />, ref: menuSearchRef },
    { key: 'Queue', icon: <MaterialSymbolsMovie />, ref: menuQueueRef },
  ];

  const toggleMenus = (refParam: RefObject<HTMLElement> | undefined) => {
    if (!menuRef.current) return;

    if (refParam !== undefined) {
      setIsMenuOpen(true);
      toolbarObjArr.forEach((obj) => {
        if (!refParam || !refParam.current || !obj.ref || !obj.ref.current) return;
        obj.ref.current !== refParam.current ? obj.ref.current.setAttribute('data-menu', 'closed') : obj.ref.current.setAttribute('data-menu', 'open');
      });
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className='fdMenu' ref={menuRef} data-modal={isMenuOpen ? 'open' : 'closed'}>
      <FDMenuToolbar setRoute={setRoute} toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />

      <div className='fdMenu__menu'>
        <FDMenuAccount ref={menuAccountRef} />
        <FDMenuGenres toggleMenus={toggleMenus} setRoute={setRoute} ref={menuGenresRef} />
        <FDMenuSearchBar ref={menuSearchRef} />
        <FDMenuQueue ref={menuQueueRef} />
      </div>
    </div>
  );
};

export default FDMenu;
