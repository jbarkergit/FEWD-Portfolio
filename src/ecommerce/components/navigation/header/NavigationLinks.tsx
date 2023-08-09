import { Link, useLocation } from 'react-router-dom';
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
          <Link
            to="/ecommerce/products"
            style={{
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
            }}
            onClick={() => setCategoryFilter('')}
          >
            {'All Products'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/headphones"
            style={{
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
            }}
            onClick={() => setCategoryFilter('headphone')}
          >
            {'Headphones'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/amps-dacs"
            style={{
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
            }}
            onClick={() => setCategoryFilter('amp', 'dac')}
          >
            {'Amps & Dacs'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/microphones"
            style={{
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
            }}
            onClick={() => setCategoryFilter('microphone')}
          >
            {'Microphones'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/interfaces"
            style={{
              color: path ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
            }}
            onClick={() => setCategoryFilter('interface')}
          >
            {'Interfaces'}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationLinks;
