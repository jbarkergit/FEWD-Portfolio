import { deauthorizeUser } from '~/base/auth/hooks/deauthorizeUser';
import { useCatalogProvider } from '../../../context/CatalogContext';
import type { SVGProps } from 'react';

type CTAButton = {
  key: string;
  icon: React.ReactNode | undefined;
  func: () => void;
};

function MaterialSymbolsMovieSharp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path fill='currentColor' d='M2 20V4h2l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h5v16z'></path>
    </svg>
  );
}

const FDHeader = () => {
  const { setIsListModal } = useCatalogProvider();

  const cta: { left: CTAButton[]; right: CTAButton[] } = {
    left: [{ key: 'Saved Movies', icon: <MaterialSymbolsMovieSharp />, func: (): void => setIsListModal(true) }],
    right: [
      {
        key: 'Sign Out',
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path fill='currentColor' d='M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5zm16 7l-4-4v3H9v2h8v3z'></path>
          </svg>
        ),
        func: (): void => {
          deauthorizeUser();
        },
      },
    ],
  };

  return (
    <nav className='fdHeader'>
      {(['left', 'right'] as const).map((alignment) => (
        <ul className='fdHeader__ul' key={`fdHeader-alignment-${alignment}`}>
          {cta[alignment].map((obj) => (
            <li className='fdHeader__ul__li' key={`fdHeader-nav-btn-${obj.key}`}>
              <button className='fdHeader__ul__li__button' aria-label={`Select ${obj.key}`} onClick={obj.func}>
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
