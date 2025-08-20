import { MaterialSymbolsLogoutSharp, MaterialSymbolsMovieSharp } from '~/film-database/assets/svg/icons';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

type CTAButton = {
  key: string;
  icon: React.ReactNode | undefined;
  func: () => void;
};

const FDHeader = () => {
  const { setIsModal } = useCatalogProvider();

  const cta: { left: CTAButton[]; right: CTAButton[] } = {
    left: [{ key: 'Saved Movies', icon: <MaterialSymbolsMovieSharp />, func: (): void => setIsModal('collections') }],
    right: [
      {
        key: 'Sign Out',
        icon: <MaterialSymbolsLogoutSharp />,
        func: async (): Promise<void> => {
          await signOut(firebaseAuth);
          window.location.reload();
        },
      },
    ],
  };

  return (
    <nav className='fdHeader'>
      {(['left', 'right'] as const).map((alignment) => (
        <ul
          className='fdHeader__ul'
          key={`fdHeader-alignment-${alignment}`}>
          {cta[alignment].map((obj) => (
            <li
              className='fdHeader__ul__li'
              key={`fdHeader-nav-btn-${obj.key}`}>
              <button
                className='fdHeader__ul__li__button'
                aria-label={`Select ${obj.key}`}
                onClick={obj.func}>
                {obj.icon ? obj.icon : obj.key}
              </button>
            </li>
          ))}
        </ul>
      ))}
    </nav>
  );
};

export default FDHeader;
