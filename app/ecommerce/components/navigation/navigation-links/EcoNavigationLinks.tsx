import { Link } from 'react-router';
import { useUniqueData } from '../../../hooks/useUniqueData';

const EcoNavigationLinks = () => {
  const categories: string[] = useUniqueData.useUniqueCategories();

  return (
    <>
      <li>
        <Link to='/ecommerce/products'>All Products</Link>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Link to={`/ecommerce/${category}`}>{category === 'amps-dacs' ? 'Amps & Dacs' : category}</Link>
        </li>
      ))}
    </>
  );
};

export default EcoNavigationLinks;
