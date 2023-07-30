import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const SingleNavigation = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <>
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
      <li className="navkit__header__section__links--link">
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
    </>
  );
};

export default SingleNavigation;
