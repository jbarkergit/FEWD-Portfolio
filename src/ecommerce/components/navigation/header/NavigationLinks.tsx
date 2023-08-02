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
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
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
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
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
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
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
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
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
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
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
