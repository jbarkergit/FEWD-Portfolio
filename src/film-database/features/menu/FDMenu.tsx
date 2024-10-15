// Deps
import { Dispatch, RefObject, SetStateAction, useCallback, useRef } from 'react';
// Firebase
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../../app/config/firebaseConfig';
// Composable types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
import { Type_MovieGenre_Keys } from '../../composables/tmdb-api/data/tmdbGenres';
// Assets
import { MaterialSymbolsHome, MaterialSymbolsAnimatedImagesSharp, IcOutlinePowerSettingsNew } from '../../assets/google-material-symbols/menuSymbols';
// Components
import FDMenuToolbar from './FDMenuToolbar';
import FDMenuGenres from './FDMenuGenres';
import FDPropertyModal from './FDMenuProperty';

const FDMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  setRoute,
  heroData,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setRoute: Dispatch<SetStateAction<Type_MovieGenre_Keys | 'home'>>;
  heroData: Type_Tmdb_Api_Union | null;
}) => {
  const menuRef = useRef<HTMLElement>(null);

  /** Toggle menus */
  const menuGenresRef = useRef<HTMLElement>(null);
  // const menuQueueRef = useRef<HTMLElement>(null);

  const toolbarObjArr = [
    { key: 'Home', icon: <MaterialSymbolsHome />, ref: undefined },
    { key: 'Genres', icon: <MaterialSymbolsAnimatedImagesSharp />, ref: menuGenresRef },
    // { key: 'Queue', icon: <MaterialSymbolsMovie />, ref: menuQueueRef },
    // { key: 'Account', icon: <IcOutlinePowerSettingsNew />, ref: menuAccountRef },
  ];

  const toggleMenus = useCallback((refParam: RefObject<HTMLElement> | undefined) => {
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
  }, []);

  return (
    <section className='fdMenu' ref={menuRef} data-modal={isMenuOpen ? 'open' : 'closed'}>
      <section className='fdMenu__toolbar'>
        <ul className='fdMenu__toolbar__ul'>
          <FDMenuToolbar setRoute={setRoute} toolbarObjArr={toolbarObjArr} toggleMenus={toggleMenus} />
          <li className='fdMenu__toolbar__ul__li'>
            <button
              className='fdMenu__toolbar__ul__li--button'
              aria-label={'Sign out'}
              onClick={() => {
                setRoute('home');
                signOut(firebaseAuth);
              }}>
              <span className='fdMenu__toolbar__ul__li--button--icon'>
                <IcOutlinePowerSettingsNew />
              </span>
            </button>
          </li>
        </ul>
      </section>
      <div className='fdMenu__menu'>
        <FDMenuGenres toggleMenus={toggleMenus} setRoute={setRoute} ref={menuGenresRef} />
        <FDPropertyModal heroData={heroData} />
      </div>
    </section>
  );
};

export default FDMenu;
