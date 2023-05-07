import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ShoppingCart = () => {
  const { totalItems, totalPrice } = useCart();
  return (
    <section className="cartWrapper" id="cartWrapper">
      <div className="shoppingCart flexBox flexColumn">
        <div className="shoppingCart__heading">
          <h2>Your Cart</h2>
        </div>
        <div className="shoppingCart__products flexBox flexColumn">
          <Link to="">
            <picture className="shoppingCart__products--picture">
              <img src="" alt="" loading="lazy" />
            </picture>
          </Link>
          <div className="shoppingCart__products--details flexBox flexColumn">
            <span className="shoppingCart__products--productName">
              <Link to="">
                <h2></h2>
              </Link>
            </span>
            <span className="shoppingCart__products--quantity">
              <span className="">
                <h4>{totalItems}</h4>
              </span>
            </span>
          </div>
          <div className="shoppingCart__products--productPrice">
            <h4></h4>
          </div>
        </div>
        <div className="shoppingCart__orderDetails flexBox flexColumn">
          <span className="shoppingCart__orderDetails--subtotal">
            <h4>{totalPrice}</h4>
          </span>
          <span className="shoppingCart__orderDetails--shippingNotice">
            <h4></h4>
          </span>
          <button className="shoppingCart__orderDetails--checkout"></button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
