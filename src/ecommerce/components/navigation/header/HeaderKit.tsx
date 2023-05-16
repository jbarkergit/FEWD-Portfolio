import { NavLink, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/StateProvider';

const HeaderKit = () => {
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <>
      <span className="navkit__logo flexBox">
        <NavLink to="/ecommerce" className="flexBox" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
          <i className="fa-solid fa-microphone-lines"></i>
          {'Dynamic Audio'}
        </NavLink>
      </span>
      <span className="navkit__collections flexBox">
        <span className="navkit__collections__links flexBox justifyCenter">
          <NavLink
            to="/ecommerce"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Home'}
          </NavLink>
          <NavLink
            to="/ecommerce/products"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('')}
          >
            {'All Products'}
          </NavLink>
          <NavLink
            to="/ecommerce/headphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('headphone')}
          >
            {'Headphones'}
          </NavLink>
          <NavLink
            to="/ecommerce/amps-dacs"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('amp', 'dac')}
          >
            {'Amps & Dacs'}
          </NavLink>
          <NavLink
            to="/ecommerce/microphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('microphone')}
          >
            {'Microphones'}
          </NavLink>
          <NavLink
            to="/ecommerce/interfaces"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('interface')}
          >
            {'Interfaces'}
          </NavLink>
        </span>
      </span>
    </>
  );
};

export default HeaderKit;
