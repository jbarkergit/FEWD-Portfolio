import { useLocation } from 'react-router-dom';
import ShoppingCart from '../../features/cart/ShoppingCart';
import AccountModal from '../../features/account/AccountModal';
import UserInteractions from './UserInteractions';
import AudibleDropdown from './AudibleDropdown';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import SingleNavigation from './SingleNavigation';
import VocalDropdown from './VocalDropdown';

const HeaderKit = (): JSX.Element => {
  return (
    <div className="navkit__header__section">
      <nav className="navkit__header__section--nav">
        <MobileMenu />
        <ul className="navkit__header__section__links">
          <Logo />
          <SingleNavigation />
          <AudibleDropdown />
          <VocalDropdown />
        </ul>
      </nav>
    </div>
  );
};

const PrimaryNav = (): JSX.Element => {
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
