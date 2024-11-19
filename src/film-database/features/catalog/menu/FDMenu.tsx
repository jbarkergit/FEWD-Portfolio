// Deps
import { RefObject, useCallback, useRef, useState } from 'react';
// Assets
import { MaterialSymbolsHome, MaterialSymbolsAnimatedImagesSharp } from '../../../assets/google-material-symbols/menuSymbols';
// Features
import FDMenuToolbar from './FDMenuToolbar';
import FDMenuGenres from './FDMenuGenres';

const FDMenu = () => {
  const menuGenresRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Home', icon: <MaterialSymbolsHome />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsAnimatedImagesSharp />, ref: menuGenresRef },
  ];

  const toggleMenus = useCallback((refParam: RefObject<HTMLElement> | undefined) => {
    const menuState = refParam ? 'open' : 'closed';

    toolbarObjArr.forEach((obj) => {
      const isCurrentRef = obj.ref?.current === refParam?.current;
      obj.ref?.current?.setAttribute('data-menu', isCurrentRef ? 'open' : menuState);
    });
  }, []);

  return (
    <div className='fdMenu'>
      <section className='fdMenu__toolbar'>
        <FDMenuToolbar toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />
      </section>
      <FDMenuGenres toggleMenus={toggleMenus} ref={menuGenresRef} />
    </div>
  );
};

export default FDMenu;
