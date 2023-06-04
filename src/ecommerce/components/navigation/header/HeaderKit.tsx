import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/products/categoryFilterProvider';

const HeaderKit = () => {
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();

  const Logo = () => {
    return (
      <li className="navkit__header__section__links--logo">
        <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
          Dynamic Audio
        </Link>
      </li>
    );
  };

  const SingleNavigation = () => {
    return (
      <>
        <li className="navkit__header__section__links--link">
          <Link
            to="/ecommerce"
            className="flexBox"
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
            className="flexBox"
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

  const AudibleDropdown = () => {
    function useAudibleDropdown() {
      const audibleDropdown: HTMLElement = document.getElementById('audible')!;
      audibleDropdown.style.display == 'none' ? (audibleDropdown.style.display = 'flex') : (audibleDropdown.style.display = 'none');
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
          <ul className="dropMenu__links" id="audible">
            <li className="dropMenu__links__link">
              <Link
                to="/ecommerce/headphones"
                className="flexBox"
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
                className="flexBox"
                style={{
                  color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
                }}
                onClick={() => setCategoryFilter('amp', 'dac')}
              >
                {'Amps & Dacs'}
              </Link>
            </li>
            <li className="dropMenu__links__link">
              <Link
                to="/ecommerce/equalizers"
                className="flexBox"
                style={{
                  color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
                }}
                onClick={() => setCategoryFilter('equalizer')}
              >
                {'Equalizers'}
              </Link>
            </li>
          </ul>
        </div>
      </li>
    );
  };

  const VocalDropdown = () => {
    function useVocalDropdown() {
      const vocalDropdown: HTMLElement = document.getElementById('vocal')!;
      vocalDropdown.style.display == 'none' ? (vocalDropdown.style.display = 'flex') : (vocalDropdown.style.display = 'none');
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
        <ul className="dropMenu__links" id="vocal">
          <li className="dropMenu__links__link">
            <Link
              to="/ecommerce/microphones"
              className="flexBox"
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
              className="flexBox"
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

  return (
    <section className="navkit__header__section">
      <nav className="navkit__header__section--nav">
        <ul className="navkit__header__section__links">
          <Logo />
          <SingleNavigation />
          <AudibleDropdown />
          <VocalDropdown />
        </ul>
      </nav>
    </section>
  );
};

export default HeaderKit;
