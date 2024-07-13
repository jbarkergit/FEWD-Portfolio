import { Link } from 'react-router-dom';
import { useUniqueData } from '../../../hooks/useUniqueData';

const EcoNavigationLinks = () => {
  return (
    <>
      <li>
        <Link to='/ecommerce/products'>All Products</Link>
      </li>
      {useUniqueData().useUniqueCategories.map((category) => {
        if (category === 'amps-dacs') {
          return (
            <li key={category}>
              <Link to={`/ecommerce/${category}`}>Amps & Dacs</Link>
            </li>
          );
        } else {
          return (
            <li key={category}>
              <Link to={`/ecommerce/${category}`}>{category}</Link>
            </li>
          );
        }
      })}
    </>
  );
};
export default EcoNavigationLinks;
