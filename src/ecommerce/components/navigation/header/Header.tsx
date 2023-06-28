import { useLocation } from 'react-router-dom';
import HeaderKit from './HeaderKit';
import UserInteractions from './UserInteractions';
import ShoppingCart from '../../features/cart/ShoppingCart';
import AccountModal from '../../features/account/AccountModal';

const PrimaryNav = () => {
  return (
    <section
      className="navkit"
      style={{
        position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
      }}
    >
      <header className="navkit__header">
        <HeaderKit />
        <UserInteractions />
        <ShoppingCart />
        <AccountModal />
      </header>
    </section>
  );
};

export default PrimaryNav;
