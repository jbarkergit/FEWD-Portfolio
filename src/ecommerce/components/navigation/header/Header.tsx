import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoArea from './sections/LogoArea';
import NavigationLinks from './sections/NavigationLinks';
import UserInteractions from './sections/UserInteractions';
import MobileMenu from './mobile/MobileMenu';
import ShoppingCart from '../../features/shopping-cart/ShoppingCart';
import UserLoginModal from '../../features/user-account-login/UserLoginModal';

const PrimaryNav = (): JSX.Element => {
  const [uiModal, setUiModal] = useState<string>('');

  return (
    <header
      className="navkit"
      style={{
        position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
        left: useLocation().pathname === '/ecommerce' ? '50%' : '0',
        transform: useLocation().pathname === '/ecommerce' ? 'translateX(-50%)' : 'translateX(0)',
      }}
    >
      <LogoArea />
      <NavigationLinks />
      <UserInteractions uiModal={uiModal} setUiModal={setUiModal} />
      {uiModal === 'shoppingCart' ? <ShoppingCart uiModal={uiModal} setUiModal={setUiModal} /> : null}
      {uiModal === 'userLogin' ? <UserLoginModal uiModal={uiModal} setUiModal={setUiModal} /> : null}
      {uiModal === 'mobileMenu' ? <MobileMenu uiModal={uiModal} setUiModal={setUiModal} /> : null}
    </header>
  );
};

export default PrimaryNav;
