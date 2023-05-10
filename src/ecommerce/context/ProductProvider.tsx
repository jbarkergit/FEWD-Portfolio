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

export const ProductProvider = () => {
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();
  return (
    <>
      {/* Filters ProductDatabase with useState(category) as conditional param, Sorts filteredData alphabetically A-Z, Maps filtered and sorted array of objects */}
      {ProductDatabase.filter((product) => product.category.includes(categoryFilter))
        .sort((a, b) => (a.company > b.company ? 1 : -1))
        .map((ProductData: ProductType) => (
          <li className="productGrid__product">
            <Link to={`/headphones/${ProductData.sku}`}>
              <picture className="productGrid__product__img">
                <img srcSet={ProductData.srcset} alt={ProductData.unit} />
              </picture>
            </Link>
            <div className="productGrid__product__information flexBox flexColumn">
              <span className="productGrid__product__information__basic flexBox flexColumn">
                <Link to={`/headphones/${ProductData.sku}`}>
                  <h2 className="flexBox">
                    {ProductData.company} {ProductData.unit}
                  </h2>
                </Link>
                <p>{ProductData.description}</p>
                <h5>{ProductData.price}</h5>
              </span>
              <span className="productGrid__product__information__cta flexBox">
                <button className="flexBox">
                  <h6>Read More</h6>
                </button>
                <button className="addProductToCart flexBox">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <h6>Quick Add</h6>
                </button>
                <button className="removeProductFromCart flexBox">
                  <h6>Remove</h6>
                </button>
              </span>
            </div>
          </li>
        ))}
    </>
  );
};

// Life cycle reference
// useEffect(() => {
//   // const componentDidMount = () => {};
//   // const componentDidUpdate = () => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setCategoryFilter(event.target.value);
// }};
//   // const componentWillUnmount = () => {};
// }, []);
