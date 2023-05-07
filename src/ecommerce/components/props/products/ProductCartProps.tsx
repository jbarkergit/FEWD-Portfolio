import { Link } from 'react-router-dom';

type ProductPropsType = {
  id: any;
  productImg: string;
  productCompany: string;
  productName: string;
  productDescription: string;
  productPrice: number;
};

const ProductCartProps = ({ id, productImg, productCompany, productName, productDescription, productPrice }: ProductPropsType) => {
  let cartQuantity = 0;
  return (
    <li className="productGrid__product">
      <Link to={`/headphones/${id}`}>
        <picture className="productGrid__product__img">
          <img srcSet={productImg} alt={productName} />
        </picture>
      </Link>
      <div className="productGrid__product__information flexBox flexColumn">
        <span className="productGrid__product__information__basic flexBox flexColumn">
          <Link to={`/headphones/${id}`}>
            <h2 className="flexBox">
              {productCompany} {productName}
            </h2>
          </Link>
          <p>{productDescription}</p>
          <h5>{productPrice}</h5>
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
