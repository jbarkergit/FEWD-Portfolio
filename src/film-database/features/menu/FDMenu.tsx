import { RefObject, useRef } from 'react';

import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbMovieGenres';

import { MaterialSymbolsSearch, MaterialSymbolsHome, MaterialSymbolsAnimatedImagesSharp } from '../../assets/google-material-symbols/menuSymbols';

import FDMenuToolbar from '../../components/menu/FDMenuToolbar';
import FDMenuGenres from '../../components/menu/FDMenuGenres';
import FDMenuSearchBar from '../../components/menu/FDMenuSearchBar';

const FDMenu = ({ setRoute }: { setRoute: React.Dispatch<React.SetStateAction<Type_MovieGenre_Keys | undefined>> }) => {
  /** Toggle menus */
  const menuRef = useRef<HTMLDivElement>(null);
  const menuSearchRef = useRef<HTMLElement>(null);
  const menuGenresRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Search', icon: <MaterialSymbolsSearch />, ref: menuSearchRef },
    { key: 'Home', icon: <MaterialSymbolsHome />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsAnimatedImagesSharp />, ref: menuGenresRef },
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
    <div className='fdMenu' ref={menuRef} data-modal='closed'>
      <FDMenuToolbar setRoute={setRoute} toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />

      <div className='fdMenu__menu'>
        <FDMenuSearchBar ref={menuSearchRef} />
        <FDMenuGenres setRoute={setRoute} toggleMenus={toggleMenus} ref={menuGenresRef} />
      </div>
    </div>
  );
};

export default FDMenu;
