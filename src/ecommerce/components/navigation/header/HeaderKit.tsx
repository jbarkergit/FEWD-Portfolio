import { NavLink, useLocation } from 'react-router-dom';

const HeaderKit = () => {
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
          >
            {'All Products'}
          </NavLink>
          <NavLink
            to="/ecommerce/products/headphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Headphones'}
          </NavLink>
          <NavLink
            to="/ecommerce/products/amps&dacs"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Amps & Dacs'}
          </NavLink>
          <NavLink
            to="/ecommerce/products/amp&dac-comboes"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Amp/Dac Comboes'}
          </NavLink>
          <NavLink
            to="/ecommerce/products/microphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Microphones'}
          </NavLink>
          <NavLink
            to="/ecommerce/products/interfaces"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Interfaces'}
          </NavLink>
        </span>
      </span>
    </>
  );
};

export default HeaderKit;
