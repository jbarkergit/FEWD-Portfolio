import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ModalProvider } from '../../../context/ModalContext';
import LogoArea from './sections/LogoArea';
import NavigationLinks from './sections/NavigationLinks';
import UserInteractions from './sections/UserInteractions';
import ConditionallyRenderedModals from './ConditionallyRenderedModals';
import MobileMenu from './mobile/MobileMenu';

const PrimaryNav = (): JSX.Element => {
  const path = useLocation().pathname.replace('/ecommerce/', '');
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
        <UserInteractions />
        <ConditionallyRenderedModals />
      </ModalProvider>
      <section className="navkit__section">
        <button className="navkit__section__mobileMenuBtn" onClick={() => (mobileMenu ? setMobileMenu(false) : setMobileMenu(true))}>
          {path === '/ecommerce' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24">
              <path fill="hsl(0, 0%, 100%)" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24">
              <path fill="hsl(0, 0%, 20%)" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"></path>
            </svg>
          )}
        </button>
      </section>
      {mobileMenu ? <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} /> : null}
    </header>
  );
};

export default PrimaryNav;
