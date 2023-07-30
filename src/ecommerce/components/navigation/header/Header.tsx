import { useLocation } from 'react-router-dom';
import { ModalProvider, useModalContext } from '../../../context/modal/ModalContext';
import Logo from './Logo';
import SingleNavigation from './SingleNavigation';
import AudibleDropdown from './AudibleDropdown';
import VocalDropdown from './VocalDropdown';
import UserInteractions from './UserInteractions';
import MobileMenu from './MobileMenu';
import AccountModal from '../../features/modal/account/AccountModal';
import ShoppingCart from '../../features/modal/cart/ShoppingCart';
import RegisterModal from '../../features/modal/account/RegisterModal';

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
      return <AccountModal />;
    case 'register':
      return <RegisterModal />;
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
