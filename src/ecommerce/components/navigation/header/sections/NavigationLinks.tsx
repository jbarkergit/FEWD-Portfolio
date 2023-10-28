import { Link } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../../context/CategoryFilterContext';

const NavigationLinks = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <section className='navkit__section'>
      <nav className='navkit__section'>
        <ul className='navkit__section__links'>
          <li>
            <Link to='/ecommerce/products'>{'All Products'}</Link>
          </li>
          <li>
            <Link to='/ecommerce/headphones'>{'Headphones'}</Link>
          </li>
          <li>
            <Link to='/ecommerce/amps-dacs'>{'Amps & Dacs'}</Link>
          </li>
          <li>
            <Link to='/ecommerce/microphones'>{'Microphones'}</Link>
          </li>
          <li>
            <Link to='/ecommerce/interfaces'>{'Interfaces'}</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavigationLinks;
