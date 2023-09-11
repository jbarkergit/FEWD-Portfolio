import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoArea from './sections/LogoArea';
import NavigationLinks from './sections/NavigationLinks';
import UserInteractions from './sections/UserInteractions';
import UserAccountModal from '../../features/user-account/UserAccountModal';
import ShoppingCart from '../../features/shopping-cart/ShoppingCart';
import MobileMenu from './mobile/MobileMenu';

const PrimaryNav = (): JSX.Element => {
  const [uiModal, setUiModal] = useState<string>('');

  return (
    <>
      <header
        className='navkit'
        style={{
          position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
          left: useLocation().pathname === '/ecommerce' ? '50%' : '0',
          transform: useLocation().pathname === '/ecommerce' ? 'translateX(-50%)' : 'translateX(0)',
        }}>
        <LogoArea />
        <NavigationLinks />
        <UserInteractions uiModal={uiModal} setUiModal={setUiModal} />
      </header>
      <ShoppingCart uiModal={uiModal} setUiModal={setUiModal} />
      {uiModal === 'mobileMenu' ? <MobileMenu uiModal={uiModal} setUiModal={setUiModal} /> : null}
      <UserAccountModal uiModal={uiModal} setUiModal={setUiModal} />
    </>
  );
};

export default PrimaryNav;
