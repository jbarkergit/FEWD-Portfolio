import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LogoArea from './sections/LogoArea';
import NavigationLinks from './sections/NavigationLinks';
import UserInteractions from './sections/UserInteractions';
import ShoppingCart from '../../features/shopping-cart/ShoppingCart';
import MobileMenu from './mobile/MobileMenu';
import UserAccountActive from '../../features/user-account/user-account-modal-active/UserAccountActive';
import UserLoginModal from '../../features/user-account/user-account-modal-login/UserLoginModal';
import UserAccountRegistry from '../../features/user-account/user-account-modal-registry/UserAccountRegistry';

const PrimaryNav = (): JSX.Element => {
  const [uiModal, setUiModal] = useState<string>('');

  /** All modals, conditionally rendered for LCP */
  const conditionallyRenderedModals = () => {
    switch (uiModal) {
      case 'shoppingCart':
        return <ShoppingCart uiModal={uiModal} setUiModal={setUiModal} />;
      case 'mobileMenu':
        return <MobileMenu uiModal={uiModal} setUiModal={setUiModal} />;
      case 'userLogin':
        return <UserLoginModal uiModal={uiModal} setUiModal={setUiModal} />;
      case 'userRegistry':
        return <UserAccountRegistry uiModal={uiModal} setUiModal={setUiModal} />;
      case 'userActive':
        if (JSON.parse(localStorage.getItem('emailAddress')!)) return <UserAccountActive uiModal={uiModal} setUiModal={setUiModal} />;
      default:
        return null;
    }
  };

  //** Handle animations */
  const [animState, setAnimState] = useState<boolean>(false);

  // useEffect(() => {
  //   uiModal !== '' ? setAnimState(true) : setAnimState(false);
  // }, [uiModal]);

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
      {conditionallyRenderedModals()}
    </>
  );
};

export default PrimaryNav;
