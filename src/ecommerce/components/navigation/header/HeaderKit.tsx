import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/StateProvider';

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
    return (
      <li className="navkit__header__section__dropMenu">
        <div>
          Audible <i className="fa-solid fa-angle-down"></i>
        </div>
        <div>
          <ul className="navkit__headersection__links">
            <li className="navkit__headersection__links--link">
              <Link
                to="/ecommerce/headphones"
                className="flexBox"
                style={{
                  color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
                }}
                onClick={() => setCategoryFilter('headphone')}
              >
                {'Headphones'}
              </Link>
            </li>
            <li className="navkit__headersection__links--link">
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
            <li className="navkit__headersection__links--link">
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
    return (
      <li className="navkit__header__section--dropdown">
        <div>
          Vocal <i className="fa-solid fa-angle-down"></i>
        </div>
        <ul className="navkit__headersection__links">
          <li className="navkit__headersection__links--link">
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
          </li>{' '}
          <li className="navkit__headersection__links--link">
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
