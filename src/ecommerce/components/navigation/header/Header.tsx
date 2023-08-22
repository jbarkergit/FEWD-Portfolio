import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalProvider } from '../../../context/ModalContext';
import LogoArea from './sections/LogoArea';
import NavigationLinks from './sections/NavigationLinks';
import UserInteractions from './sections/UserInteractions';
import ConditionallyRenderedModals from './ConditionallyRenderedModals';
import MobileMenu from './mobile/MobileMenu';
import SearchBar from '../../features/search-bar/SearchBar';

const PrimaryNav = (): JSX.Element => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

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
      <ModalProvider>
        <UserInteractions mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        <ConditionallyRenderedModals />
      </ModalProvider>
      {mobileMenu ? <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} /> : null}
    </header>
  );
};

export default PrimaryNav;
