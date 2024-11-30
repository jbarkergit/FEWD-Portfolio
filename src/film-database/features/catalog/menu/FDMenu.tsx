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
    for (const elem of toolbarObjArr) {
      if (!elem.ref || !elem.ref.current) continue;
      const element: HTMLElement = elem.ref.current;

      const isTargetElem: boolean = element === refParam?.current;
      const targetStatus: string | null = element.getAttribute('data-menu');
      const isTargetOpen: boolean = targetStatus === 'open';

      // If iteration target is refParam, if the data attribute status is 'open' then close else open. If iteration target isn't refParam, close.
      element.setAttribute('data-menu', isTargetElem ? (isTargetOpen ? 'closed' : 'open') : 'closed');
    }
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
