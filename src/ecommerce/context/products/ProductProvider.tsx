import { Link } from 'react-router-dom';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../exports/stateProvider';
import { ProductType, headphoneStyles } from '../exports/types';
import { ReactElement } from 'react';

const ProductProvider = (): ReactElement => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext(); // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  // @ts-ignore:
  const { setStyleFilter } = useCategoryFilterContext(); // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider

  const useProductFilter = () => {
    const categoryProducts = ProductDatabase.filter((product: ProductType) => product.category?.includes(categoryFilter)); // Products including categoryFilter in ProductType: Category
    const companyProducts = ProductDatabase.filter((product: ProductType) => product.company?.includes(categoryFilter)); // Products including categoryFilter in ProductType: Company
    const headphoneFilter = ProductDatabase.filter((product: ProductType) => product.wearStyle?.includes(categoryFilter)); // Products including categoryFilter in ProductType: wearStyle
    const categoryHeadphones = categoryProducts.filter((product) => product.wearStyle?.includes(headphoneStyles)); // Do products with Category name include headphoneStyles?
    const companyHeadphones = companyProducts.filter((product) => product.wearStyle?.includes(headphoneStyles)); // Do products with Company name include headphoneStyles?

    categoryHeadphones.length > 0 || companyHeadphones.length > 0 || headphoneFilter.length > 0 ? setStyleFilter(true) : setStyleFilter(false);

    if (categoryFilter === '') console.log('1');
    else if (companyHeadphones.length > 0) console.log('2');
    else if (categoryHeadphones.length > 0) console.log('3');
    else if (companyProducts.length > 0) console.log('4');
    else if (categoryProducts.length > 0) console.log('5');
    else if (categoryHeadphones) console.log('6');
    else console.log('7');

    if (categoryFilter === '') return categoryProducts;
    else if (categoryFilter === 'headphone') return categoryProducts;
    else if (companyHeadphones.length > 0) return companyHeadphones;
    else if (categoryHeadphones.length > 0) return categoryHeadphones;
    else if (companyProducts.length > 0) return companyProducts;
    else if (categoryProducts.length > 0) return categoryProducts;
    else if (categoryHeadphones) return headphoneFilter;
    else return ProductDatabase;
  };

  return (
    <>
      {/* Filters ProductDatabase with useState(category) as conditional param, Sorts filteredData alphabetically A-Z, Maps filtered and sorted array of objects */}
      {useProductFilter()
        .sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1))
        .map((product: ProductType) => (
          <li className="productGrid__product" key={product.sku}>
            <Link to={`/ecommerce/product/${product.sku}`}>
              <span className="productGrid__product--containedHover">
                <picture>
                  <img src={product.images![0]} alt={product.unit} loading="lazy" decoding="async" fetchpriority="high" />
                </picture>
              </span>
            </Link>
            <div className="productGrid__product__information flexBox flexColumn alignUnset">
              <Link to={`/ecommerce/product/${product.sku}`}>
                <h2 className="flexBox">
                  {product.company} {product.unit}
                </h2>
              </Link>
              <p>{product.description}</p>
              <div className="productGrid__product__advanced">
                <span>
                  <h4>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
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
