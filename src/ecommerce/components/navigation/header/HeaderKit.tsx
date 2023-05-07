import { NavLink, useLocation } from 'react-router-dom';

function HeaderKit() {
  return (
    <>
      <span className="navkit__logo flexBox">
        <NavLink
          to="/ecommerce"
          className="flexBox"
          style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}
        >
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
            to="/headphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Headphones'}
          </NavLink>
          <NavLink
            to="/amps-dacs"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Amps & Dacs'}
          </NavLink>
          <NavLink
            to="/microphones"
            className="flexBox"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Microphones'}
          </NavLink>
          <NavLink
            to="/interfaces"
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
}

export default HeaderKit;
