import { useLocation } from 'react-router-dom';
import SearchBar from '../../features/SearchBar';

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInteractions = ({ viewCart, setViewCart }: PropsType) => {
  const viewCartButton = viewCart ? (
    <button
      className="navkit__header__section__ui--btn --ctaBtn"
      id="shoppingCartBtn"
      style={{
        backgroundColor: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
      }}
      onClick={() => setViewCart(false)}
    >
      <i className="fa-solid fa-cart-shopping" style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}></i>
      <h4 style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}>View Cart</h4>
    </button>
  ) : (
    <button
      className="navkit__header__section__ui--btn --ctaBtn"
      id="shoppingCartBtn"
      style={{
        backgroundColor: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
      }}
      onClick={() => setViewCart(true)}
    >
      <i className="fa-solid fa-cart-shopping" style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}></i>
      <h4 style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}>Close Cart</h4>
    </button>
  );

  return (
    <section className="navkit__header__section">
      <SearchBar />
      <div className="navkit__header__section__ui">
        <button
          className="navkit__header__section__ui--btn --ctaBtn"
          id="myAccountBtn"
          style={{
            color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            border: useLocation().pathname === '/ecommerce' ? '1px solid white' : '',
          }}
        >
          <i className="fa-solid fa-gear"></i>
          <h4>Account</h4>
        </button>
      </div>
      <div className="navkit__header__section__ui">{viewCartButton}</div>
    </section>
  );
};

export default UserInteractions;
