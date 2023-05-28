import { Link } from 'react-router-dom';
import { ProductType } from '../../../context/exports/types';

const ProductCartProps = (ProductData: ProductType) => {
  let cartQuantity = 0;
  return (
    <li className="productGrid__product">
      <Link to={`/headphones/${ProductData.sku}`}>
        <picture className="productGrid__product__img">
          <img srcSet={ProductData.images[0]} alt={ProductData.unit} loading="lazy" decoding="async" fetchpriority="high" />
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
          {cartQuantity === 0 ? (
            <button className="addProductToCart flexBox">
              <i className="fa-solid fa-cart-shopping"></i>
              <h6>Quick Add</h6>
            </button>
          ) : (
            <button className="removeProductFromCart flexBox">
              <h6>Remove</h6>
            </button>
          )}
        </span>
      </div>
    </li>
  );
};

export default ProductCartProps;
