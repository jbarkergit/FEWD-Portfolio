import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import MobileMenu from './MobileMenu';

const NavigationLinks = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const path = useLocation().pathname.replace('/ecommerce/', '');
  const ecoPath = useLocation().pathname === '/ecommerce';

  useEffect(() => {
    setCategoryFilter(path);
  }, [path]);

  return (
    <nav className="navkit__section">
      <MobileMenu />
      <ul className="navkit__section__links">
        <li>
          <Link
            to="/ecommerce/products"
            style={{
              color: ecoPath ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
              fontWeight: ecoPath ? '600' : '700',
            }}
          >
            {'All Products'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/headphones"
            style={{
              color: ecoPath ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
              fontWeight: ecoPath ? '600' : '700',
            }}
          >
            {'Headphones'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/amps-dacs"
            style={{
              color: ecoPath ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
              fontWeight: ecoPath ? '600' : '700',
            }}
          >
            {'Amps & Dacs'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/microphones"
            style={{
              color: ecoPath ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
              fontWeight: ecoPath ? '600' : '700',
            }}
          >
            {'Microphones'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/interfaces"
            style={{
              color: ecoPath ? 'var(--fontSecondary)' : 'var(--fontPrimary)',
              fontWeight: ecoPath ? '600' : '700',
            }}
          >
            {'Interfaces'}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationLinks;
