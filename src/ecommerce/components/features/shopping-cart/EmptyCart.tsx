import { Link } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const EmptyCart = () => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <section className="ecoModal__products__emptyCart">
      <div className="ecoModal__products__emptyCart__header">
        <span>{'Your cart is empty. Ready to upgrade your setup?'}</span>
      </div>
      <div className="ecoModal__products__emptyCart__nav">
        <Link to="/ecommerce/headphones" onClick={() => setCategoryFilter('')}>
          {'Shop Headphones'}
        </Link>
        <Link to="/ecommerce/amps-dacs" onClick={() => setCategoryFilter('headphone')}>
          {'Shop Amps & Dacs'}
        </Link>
        <Link to="/ecommerce/microphones" onClick={() => setCategoryFilter('amp', 'dac')}>
          {'Shop Microphones'}
        </Link>
        <Link to="/ecommerce/interfaces" onClick={() => setCategoryFilter('microphone')}>
          {'Shop Interfaces'}
        </Link>
        <Link to="/ecommerce/products" onClick={() => setCategoryFilter('interface')}>
          {'Browse All Products'}
        </Link>
      </div>
    </section>
  );
};
export default EmptyCart;
