import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../features/search/SearchBar';

const UserInteractions = () => {
  const [cartStatus, setCartStatus] = useState('View Cart');

  function useCart() {
    cartStatus === 'View Cart' ? setCartStatus('Close Cart') : setCartStatus('View Cart');

    const shoppingModal = document.querySelector('.shoppingModal');
    shoppingModal?.getAttribute('data-activity') === 'inactive'
      ? shoppingModal.setAttribute('data-activity', 'active')
      : shoppingModal?.setAttribute('data-activity', 'inactive');
  }

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
            boxShadow:
              useLocation().pathname === '/ecommerce'
                ? 'rgb(255, 255, 255) -1px -1px 20px 0px, rgb(57, 57, 57) -4px -4px 5px 0px, rgba(98, 98, 98, 0.4) 7px 7px 20px 0px, rgba(0, 0, 0, 0.3) 4px 4px 5px 0px'
                : '-1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
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
                ? 'rgb(255, 255, 255) -1px -1px 20px 0px, rgb(57, 57, 57) -4px -4px 5px 0px, rgba(98, 98, 98, 0.4) 7px 7px 20px 0px, rgba(0, 0, 0, 0.3) 4px 4px 5px 0px'
                : '-1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
          }}
          onClick={useCart}
        >
          <i className="fa-solid fa-cart-shopping" style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}></i>
          <h4 style={{ color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : '' }}>{cartStatus}</h4>
        </button>
      </div>
    </section>
  );
};

export default UserInteractions;
