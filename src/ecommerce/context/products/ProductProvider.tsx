import { Link } from 'react-router-dom';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../exports/stateProvider';
import { ProductType } from '../exports/types';

const ProductProvider = () => {
  const useProductFilter = () => {
    // @ts-ignore:
    const { categoryFilter } = useCategoryFilterContext();

    const useMiscProducts = ProductDatabase.reduce((miscProducts: ProductType[], product: ProductType) => {
      if (product.category?.includes(categoryFilter)) {
        miscProducts.push({ ...product });
      }
      return miscProducts;
    }, []);

    const useHeadphones = ProductDatabase.reduce((headphones: ProductType[], product: ProductType) => {
      if (product.wearStyle?.includes(categoryFilter)) {
        headphones.push({ ...product });
      }
      return headphones;
    }, []);

    const useCompanyProducts = ProductDatabase.reduce((companyProducts: ProductType[], product: ProductType) => {
      if (product.company?.includes(categoryFilter)) {
        companyProducts.push({ ...product });
      }
      return companyProducts;
    }, []);

    const useCompanyHeadphones = ProductDatabase.reduce((companyHeadphones: ProductType[], product: ProductType) => {
      if (product.company?.includes(categoryFilter)) {
        companyHeadphones.push({ ...product });
      }
      return companyHeadphones;
    }, []);

    switch (categoryFilter) {
      case '':
      case 'amp':
      case 'dac':
      case 'microphone':
      case 'interface':
        return useMiscProducts;
      case 'headphone':
      case 'openbackheadphone':
      case 'semiopenheadphone':
      case 'closedbackheadphone':
        return useHeadphones;
      default:
        if (useCompanyProducts.length > 0) return useCompanyProducts;
        else if (useCompanyHeadphones.length > 0) return useCompanyHeadphones;
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
