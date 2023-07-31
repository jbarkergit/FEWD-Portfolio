import { useLocation } from 'react-router-dom';
import { ModalProvider, useModalContext } from '../../../context/ModalContext';
import Logo from './Logo';
import SingleNavigation from './SingleNavigation';
import AudibleDropdown from './AudibleDropdown';
import VocalDropdown from './VocalDropdown';
import UserInteractions from './UserInteractions';
import MobileMenu from './MobileMenu';
import ShoppingCart from '../../features/shopping-cart/ShoppingCart';
import UserLoginModal from '../../user-account/user-account-login/UserLoginModal';
import UserRegisterModal from '../../user-account/user-account-register/UserRegisterModal';

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

const ConditionallyRenderedModals = (): JSX.Element | undefined => {
  //@ts-ignore
  const { ecoModalTab } = useModalContext();
  switch (ecoModalTab) {
    case 'shoppingCart':
      return <ShoppingCart />;
    case 'account':
      return <UserLoginModal />;
    case 'register':
      return <UserRegisterModal />;
  }
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
        <ModalProvider>
          <UserInteractions />
          <ConditionallyRenderedModals />
        </ModalProvider>
      </div>
    </header>
  );
};

export default PrimaryNav;
