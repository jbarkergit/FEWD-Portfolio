import { NavLink, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import MobileMenu from './MobileMenu';

const NavigationLinks = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const path = useLocation().pathname === '/ecommerce';

  return (
    <nav className="navkit__section">
      <MobileMenu />
      <ul className="navkit__section__links">
        <li>
          <NavLink
            to="/ecommerce/products"
            style={{
              color: path ? 'white' : 'hsl(0, 0, 20%)',
              boxShadow: path
                ? 'none'
                : '-1px -1px 20px 0px rgb(255, 255, 255), -4px -4px 5px 0px rgb(255, 255, 255), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => setCategoryFilter('')}
          >
            {'All Products'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ecommerce/headphones"
            style={{
              color: path ? 'white' : 'hsl(0, 0, 20%)',
              boxShadow: path
                ? 'none'
                : '-1px -1px 20px 0px rgb(255, 255, 255), -4px -4px 5px 0px rgb(255, 255, 255), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => setCategoryFilter('headphone')}
          >
            {'Headphones'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ecommerce/amps-dacs"
            style={{
              color: path ? 'white' : 'hsl(0, 0, 20%)',
              boxShadow: path
                ? 'none'
                : '-1px -1px 20px 0px rgb(255, 255, 255), -4px -4px 5px 0px rgb(255, 255, 255), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => setCategoryFilter('amp', 'dac')}
          >
            {'Amps & Dacs'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ecommerce/microphones"
            style={{
              color: path ? 'white' : 'hsl(0, 0, 20%)',
              boxShadow: path
                ? 'none'
                : '-1px -1px 20px 0px rgb(255, 255, 255), -4px -4px 5px 0px rgb(255, 255, 255), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => setCategoryFilter('microphone')}
          >
            {'Microphones'}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ecommerce/interfaces"
            style={{
              color: path ? 'white' : 'hsl(0, 0, 20%)',
              boxShadow: path
                ? 'none'
                : '-1px -1px 20px 0px rgb(255, 255, 255), -4px -4px 5px 0px rgb(255, 255, 255), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
            }}
            onClick={() => setCategoryFilter('interface')}
          >
            {'Interfaces'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationLinks;
