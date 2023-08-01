import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const NavigationLinks = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();

  return (
    <nav className="navkit__section">
      <MobileMenu />
      <ul className="navkit__section__links">
        <li>
          <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
            Dynamic Audio
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
          >
            {'Home'}
          </Link>
        </li>
        <li>
          <Link
            to="/ecommerce/products"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
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
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
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
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
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
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 20%)',
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
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 20%)',
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
