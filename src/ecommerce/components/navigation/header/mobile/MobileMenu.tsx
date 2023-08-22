import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../../../features/search-bar/SearchBar';
import { useCategoryFilterContext } from '../../../../context/CategoryFilterContext';

type MobileMenuType = {
  mobileMenu: boolean;
};

const MobileMenu = ({ mobileMenu }: MobileMenuType): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const slideContainerRef = useRef<HTMLDivElement>(null!);
  const mobileModal = useRef<HTMLDivElement>(null);

  useEffect(() => mobileModal.current?.setAttribute('data-status', mobileMenu ? 'active' : 'false'), [mobileMenu]);

  return (
    <div className="ecoModalWrap">
      <aside className="ecoModal" data-status="false" ref={mobileModal}>
        <div className="mobileMenu__logo">
          <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 20%)' }}>
            Dynamic Audio
          </Link>
        </div>
        <div className="mobileMenu__menu">
          <button
            className="mobileMenu__menu__indicator"
            onClick={() =>
              slideContainerRef.current.getAttribute('data-activity') === 'inactive'
                ? slideContainerRef.current.setAttribute('data-activity', 'active')
                : slideContainerRef.current.setAttribute('data-activity', 'inactive')
            }
          >
            icon
          </button>
          <div className="mobileMenu__menu__slideContainer" data-activity="inactive" ref={slideContainerRef}>
            <div className="mobileMenu__menu__slideIn">
              <span className="mobileMenu__logo">
                <Link to="/ecommerce">Dynamic Audio</Link>
              </span>
              <SearchBar />
              <ul>
                <li>
                  <Link to="/ecommerce">{'Home'}</Link>
                </li>
                <li>
                  <Link to="/ecommerce/products" onClick={() => setCategoryFilter('')}>
                    {'All Products'}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce/headphones" onClick={() => setCategoryFilter('headphone')}>
                    {'Headphones'}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce/amps-dacs" onClick={() => setCategoryFilter('amp', 'dac')}>
                    {'Amps & Dacs'}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce/microphones" onClick={() => setCategoryFilter('microphone')}>
                    {'Microphones'}
                  </Link>
                </li>
                <li>
                  <Link to="/ecommerce/interfaces" onClick={() => setCategoryFilter('interface')}>
                    {'Interfaces'}
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="">{'Account'}</Link>
                </li>
                <li>
                  <Link to="">{'Support'}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
