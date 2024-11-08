import { RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../../../app/config/firebaseConfig';
import { IcOutlinePowerSettingsNew } from '../../../assets/google-material-symbols/menuSymbols';
import { useCatalogProvider } from '../../../context/CatalogContext';

const FDMenuToolbar = ({
  toolbarObjArr,
  toggleMenus,
}: {
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
  const { setRoute } = useCatalogProvider();

  return (
    <ul className='fdMenu__toolbar__ul'>
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
  );
};

export default FDMenuToolbar;
