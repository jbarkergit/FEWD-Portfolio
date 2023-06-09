import { Link } from 'react-router-dom';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../exports/stateProvider';
import { ProductType, headphoneStyles } from '../exports/types';
import { ReactElement } from 'react';

const ProductProvider = (): ReactElement => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext(); // Application Context Provider Guard
  // @ts-ignore:
  const { setStyleFilter } = useCategoryFilterContext(); // Application Context Provider Guard

  const useProductFilter = () => {
    const companyProducts = ProductDatabase.filter((product: ProductType) => product.company?.includes(categoryFilter)); // Products including categoryFilter in ProductType: Company
    const companyHeadphones = companyProducts.filter((product) => product.wearStyle?.includes(headphoneStyles)); // Do products with Company name include headphoneStyles?

    switch (categoryFilter) {
      case '':
      case 'amp':
      case 'dac':
      case 'microphone':
      case 'interface':
        setStyleFilter(false);
        return ProductDatabase.filter((product: ProductType) => product.category?.includes(categoryFilter));
      case 'headphone':
      case 'openbackheadphone':
      case 'semiopenheadphone':
      case 'closedbackheadphone':
        setStyleFilter(true);
        return ProductDatabase.filter((product: ProductType) => product.wearStyle?.includes(categoryFilter));
      default:
        setStyleFilter(false);
        if (companyProducts.length > 0) return companyProducts;
        else if (companyHeadphones.length > 0) return companyHeadphones;
        else return ProductDatabase;
    }
  };

  return (
    <>
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
