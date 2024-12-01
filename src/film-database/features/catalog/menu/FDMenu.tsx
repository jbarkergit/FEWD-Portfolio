// Deps
import { RefObject, useCallback, useRef } from 'react';
// Features
import FDMenuToolbar from './FDMenuToolbar';
import FDMenuGenres from './FDMenuGenres';

const FDMenu = () => {
  const menuGenresRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Home', ref: undefined },
    { key: 'Genres', ref: menuGenresRef },
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
      <FDMenuToolbar toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />
      <FDMenuGenres toggleMenus={toggleMenus} ref={menuGenresRef} />
    </div>
  );
};

export default FDMenu;
