import { useLocation } from 'react-router-dom';
import HeaderKit from './HeaderKit';
import UserInteractions from './UserInteractions';
import ShoppingCart from '../../features/cart/ShoppingCart';
import AccountModal from '../../features/account/AccountModal';

const PrimaryNav = () => {
  return (
    <header
      className="navkit"
      style={{
        position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
      }}
    >
      <div className="navkit__header">
        <HeaderKit />
        <UserInteractions />
        <ShoppingCart />
        <AccountModal />
      </div>
    </header>
  );
};

export default PrimaryNav;
