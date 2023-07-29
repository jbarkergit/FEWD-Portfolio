import { useLocation } from 'react-router-dom';
import SearchBar from '../../features/search/SearchBar';
import { useModalContext } from '../../../context/modal/ModalContext';

const UserInteractions = (): JSX.Element => {
  // @ts-ignore
  const { setEcoModalTab } = useModalContext();

  return (
    <div className="navkit__header__section">
      <div className="navkit__header__section__ui">
        <SearchBar />
      </div>
      <div className="navkit__header__section__ui">
        <button
          className="navkit__header__section__ui--btn --ctaBtn"
          id="myAccountBtn"
          style={{
            color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            border: useLocation().pathname === '/ecommerce' ? '1px solid white' : '',
            boxShadow:
              useLocation().pathname === '/ecommerce'
                ? 'rgba(255, 255, 255, 0) -1px -1px 20px 0px, rgba(57, 57, 57, 0) -4px -4px 5px 0px, rgba(98, 98, 98, 0) 7px 7px 20px 0px, rgba(0, 0, 0, 0) 4px 4px 5px 0px'
                : '-1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
          }}
          onClick={() => {
            setEcoModalTab('account');
          }}
        >
          <i className="fa-solid fa-gear"></i>
          <h4>Account</h4>
        </button>
      </div>
      <div className="navkit__header__section__ui">
        <button
          className="navkit__header__section__ui--btn --ctaBtn"
          style={{
            backgroundColor: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            boxShadow:
              useLocation().pathname === '/ecommerce'
                ? 'rgba(255, 255, 255, 0) -1px -1px 20px 0px, rgba(57, 57, 57, 0) -4px -4px 5px 0px, rgba(98, 98, 98, 0) 7px 7px 20px 0px, rgba(0, 0, 0, 0) 4px 4px 5px 0px'
                : '-1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
          }}
          onClick={() => {
            setEcoModalTab('shoppingCart');
          }}
        >
          <i className="fa-solid fa-cart-shopping" style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}></i>
          <h4 style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}>Shopping Cart</h4>
        </button>
      </div>
    </div>
  );
};

export default UserInteractions;
