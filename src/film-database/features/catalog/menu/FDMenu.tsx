// Deps
import { RefObject, useCallback, useRef, useState } from 'react';
// Assets
import { MaterialSymbolsHome, MaterialSymbolsAnimatedImagesSharp } from '../../../assets/google-material-symbols/menuSymbols';
// Features
import FDMenuToolbar from './FDMenuToolbar';
import FDMenuGenres from './FDMenuGenres';

const FDMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuGenresRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Home', icon: <MaterialSymbolsHome />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsAnimatedImagesSharp />, ref: menuGenresRef },
  ];

  const toggleMenus = useCallback((refParam: RefObject<HTMLElement> | undefined) => {
    if (refParam) {
      setIsMenuOpen(true);

      for (const obj of toolbarObjArr) {
        const isCurrentRef = obj.ref?.current === refParam.current;
        const menuState = isCurrentRef ? 'open' : 'closed';
        obj.ref?.current?.setAttribute('data-menu', menuState);
      }
    } else {
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <section className='fdMenu' data-modal={isMenuOpen ? 'open' : 'closed'}>
      <section className='fdMenu__toolbar'>
        <FDMenuToolbar toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />
      </section>
      <div className='fdMenu__menu'>
        <FDMenuGenres toggleMenus={toggleMenus} ref={menuGenresRef} />
      </div>
    </section>
  );
};

export default FDMenu;
