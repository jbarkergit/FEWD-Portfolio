import { Link } from 'react-router-dom';
import { ProductDatabase } from '../../assets/data/ProductDatabase';
import { useCategoryFilterContext } from './categoryFilterProvider';
import { ProductType } from '../exports/types';
import { ReactElement } from 'react';

const ProductProvider = (): ReactElement => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext(); // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider

  function handleProductFilter() {
    if ([...new Set(ProductDatabase.map((product) => product.company))].includes(categoryFilter)) {
      return ProductDatabase.filter((product) => product.company.includes(categoryFilter));
    } else return ProductDatabase.filter((product) => product.category?.includes(categoryFilter));
  }

  return (
    <>
      {/* Filters ProductDatabase with useState(category) as conditional param, Sorts filteredData alphabetically A-Z, Maps filtered and sorted array of objects */}
      {handleProductFilter()
        .sort((a, b) => (a.company > b.company ? 1 : -1))
        .map((ProductData: ProductType) => (
          <li className="productGrid__product" key={ProductData.sku}>
            <Link to={`/ecommerce/product/${ProductData.sku}`}>
              <span className="productGrid__product--containedHover">
                <picture>
                  <img src={ProductData.images![0]} alt={ProductData.unit} loading="lazy" decoding="async" fetchpriority="high" />
                </picture>
              </span>
            </Link>
            <div className="productGrid__product__information flexBox flexColumn alignUnset">
              <Link to={`/ecommerce/product/${ProductData.sku}`}>
                <h2 className="flexBox">
                  {ProductData.company} {ProductData.unit}
                </h2>
              </Link>
              <p>{ProductData.description}</p>
              <div className="productGrid__product__advanced">
                <span>
                  <h4>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(ProductData.price)}</h4>
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
