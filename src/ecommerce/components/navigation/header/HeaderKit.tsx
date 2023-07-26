import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/categoryFilter/StateContextProvider';
import SearchBar from '../../features/search/SearchBar';

const HeaderKit = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();

  const Logo = () => {
    return (
      <li className="navkit__header__section__links--logo">
        <Link to="/ecommerce" id="logo" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
          Dynamic Audio
        </Link>
      </li>
    );
  };

  const SingleNavigation = (): JSX.Element => {
    return (
      <>
        <li>
          <Link
            to="/ecommerce"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Home'}
          </Link>
        </li>
        <li className="navkit__header__section__links--link">
          <Link
            to="/ecommerce/products"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('')}
          >
            {'All Products'}
          </Link>
        </li>
      </>
    );
  };

  const AudibleDropdown = (): JSX.Element => {
    const audibleDropdownRef = useRef<HTMLUListElement>(null!);

    function useAudibleDropdown(): void {
      audibleDropdownRef.current.getAttribute('data-activity') == 'inactive'
        ? audibleDropdownRef.current.setAttribute('data-activity', 'active')
        : audibleDropdownRef.current.setAttribute('data-activity', 'inactive');
    }

    return (
      <li className="dropMenu" onClick={useAudibleDropdown}>
        <div
          className="dropMenu__indicator"
          style={{
            color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
          }}
        >
          <span className="dropMenu__indicator--interior">
            Audible <i className="fa-solid fa-angle-down"></i>
          </span>
        </div>
        <div>
          <ul className="dropMenu__links" data-activity="inactive" ref={audibleDropdownRef}>
            <li className="dropMenu__links__link">
              <Link
                to="/ecommerce/headphones"
                style={{
                  color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
                }}
                onClick={() => setCategoryFilter('headphone')}
              >
                {'Headphones'}
              </Link>
            </li>
            <li className="dropMenu__links__link">
              <Link
                to="/ecommerce/amps-dacs"
                style={{
                  color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
                }}
                onClick={() => setCategoryFilter('amp', 'dac')}
              >
                {'Amps & Dacs'}
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  };

  const VocalDropdown = (): JSX.Element => {
    const vocalDropdownRef = useRef<HTMLUListElement>(null!);

    function useVocalDropdown(): void {
      vocalDropdownRef.current.getAttribute('data-activity') == 'inactive'
        ? vocalDropdownRef.current.setAttribute('data-activity', 'active')
        : vocalDropdownRef.current.setAttribute('data-activity', 'inactive');
    }

    return (
      <li className="dropMenu" onClick={useVocalDropdown}>
        <div
          className="dropMenu__indicator"
          style={{
            color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
          }}
        >
          <span className="dropMenu__indicator--interior">
            Vocal <i className="fa-solid fa-angle-down"></i>
          </span>
        </div>
        <ul className="dropMenu__links" data-activity="inactive" ref={vocalDropdownRef}>
          <li className="dropMenu__links__link">
            <Link
              to="/ecommerce/microphones"
              style={{
                color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
              }}
              onClick={() => setCategoryFilter('microphone')}
            >
              {'Microphones'}
            </Link>
          </li>
          <li className="dropMenu__links__link">
            <Link
              to="/ecommerce/interfaces"
              style={{
                color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
              }}
              onClick={() => setCategoryFilter('interface')}
            >
              {'Interfaces'}
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const MobileMenu = (): JSX.Element => {
    const slideContainerRef = useRef<HTMLDivElement>(null!);
    return (
      <div className="mobileMenu">
        <div className="mobileMenu__logo">
          <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
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
            <i className="fa-solid fa-bars"></i>
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
      </div>
    );
  };

  return (
    <div className="navkit__header__section">
      <nav className="navkit__header__section--nav">
        <MobileMenu />
        <ul className="navkit__header__section__links">
          <Logo />
          <SingleNavigation />
          <AudibleDropdown />
          <VocalDropdown />
        </ul>
      </nav>
    </div>
  );
};

export default HeaderKit;
