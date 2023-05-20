import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/StateProvider';

const Logo = () => {
  return (
    <section className="navkit__header__logo">
      <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
        <i className="fa-solid fa-microphone-lines"></i>
        {'Dynamic Audio'}
      </Link>
    </section>
  );
};

const Navigation = () => {
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <section className="navkit__header__nav">
      <nav className="navkit__header__nav__block">
        <ul className="navkit__header__nav__block__links">
          <li className="navkit__header__nav__block__links--link">
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
          <li className="navkit__header__nav__block__links--link">
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
          </li>{' '}
          <li className="navkit__header__nav__block__links--link">
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
          <li className="navkit__header__nav__block__links--link">
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
          <li className="navkit__header__nav__block__links--link">
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
          <li className="navkit__header__nav__block__links--link">
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
      </nav>
    </section>
  );
};

const HeaderKit = () => {
  return (
    <>
      <Logo />
      <Navigation />
    </>
  );
};

export default HeaderKit;
