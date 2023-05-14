import { Link } from 'react-router-dom';
import { ProductDatabase } from '../data/ProductDatabase';
import { useCategoryFilterContext } from './CategoryFilterContext';

export type ProductType = {
  category: string;
  sku: string;
  company: string;
  unit: string;
  description: string;
  price: number;
  srcset: string;
};

const ProductProvider = () => {
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();
  const formatCurrency = Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' });
  return (
    <>
      {/* Filters ProductDatabase with useState(category) as conditional param, Sorts filteredData alphabetically A-Z, Maps filtered and sorted array of objects */}
      {ProductDatabase.filter((product) => product.category.includes(categoryFilter))
        .sort((a, b) => (a.company > b.company ? 1 : -1))
        .map((ProductData: ProductType) => (
          <li className="productGrid__product" key={ProductData.sku}>
            <Link to={`/headphones/${ProductData.sku}`}>
              <span className="productGrid__product--containedHover">
                <picture>
                  <img srcSet={ProductData.srcset} alt={ProductData.unit} loading="lazy" />
                </picture>
              </span>
            </Link>
            <div className="productGrid__product__information flexBox flexColumn alignUnset">
              <Link to={`/headphones/${ProductData.sku}`}>
                <h2 className="flexBox">
                  {ProductData.company} {ProductData.unit}
                </h2>
              </Link>
              <p>{ProductData.description}</p>
              <div className="productGrid__product__advanced">
                <span>
                  <h4>{formatCurrency.format(ProductData.price)}</h4>
                </span>
                <span>
                  <button>
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                  <button>
                    <i className="fa-solid fa-cart-arrow-down"></i>
                  </button>
                </span>
              </div>
            </div>
          </li>
        ))}
    </>
  );
};

export default ProductProvider;

// Life cycle reference
// useEffect(() => {
//   // const componentDidMount = () => {};
//   // const componentDidUpdate = () => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setCategoryFilter(event.target.value);
// }};
//   // const componentWillUnmount = () => {};
// }, []);
