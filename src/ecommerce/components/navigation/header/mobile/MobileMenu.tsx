import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../../features/search-bar/SearchBar';
import { useCategoryFilterContext } from '../../../../context/CategoryFilterContext';

type MobileMenuType = {
  mobileMenu: boolean;
  setMobileMenu: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({ mobileMenu, setMobileMenu }: MobileMenuType): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const mobileModal = useRef<HTMLDivElement>(null);

  useEffect(() => mobileModal.current?.setAttribute('data-status', mobileMenu ? 'active' : 'false'), [mobileMenu]);

  return (
    <div className="mobileMenu">
      <aside className="mobileMenu__modal" data-status="false" ref={mobileModal}>
        <div className="mobileMenu__modal__logo">
          <span>
            <Link to="/ecommerce">Dynamic Audio</Link>
          </span>
          <span>
            <button onClick={() => setMobileMenu(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 512 512">
                <path
                  d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"
                  fill="hsl(0, 0%, 20%)"
                ></path>
              </svg>
            </button>
          </span>
        </div>
        <nav className="mobileMenu__modal__menu">
          <SearchBar />
          <ul>
            <li>
              <Link to="/ecommerce">Home</Link>
            </li>
            <li>
              <Link to="/ecommerce/products" onClick={() => setCategoryFilter('')}>
                All Products
              </Link>
            </li>
            <li>
              <Link to="/ecommerce/headphones" onClick={() => setCategoryFilter('headphone')}>
                Headphones
              </Link>
            </li>
            <li>
              <Link to="/ecommerce/amps-dacs" onClick={() => setCategoryFilter('amp', 'dac')}>
                Amps & Dacs
              </Link>
            </li>
            <li>
              <Link to="/ecommerce/microphones" onClick={() => setCategoryFilter('microphone')}>
                Microphones
              </Link>
            </li>
            <li>
              <Link to="/ecommerce/interfaces" onClick={() => setCategoryFilter('interface')}>
                Interfaces
              </Link>
            </li>
            <li>
              <Link to="">Account</Link>
            </li>
            <li>
              <Link to="">Support</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
