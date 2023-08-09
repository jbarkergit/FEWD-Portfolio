import { Link, useLocation } from 'react-router-dom';
import { ModalProvider } from '../../../context/ModalContext';
import UserInteractions from './UserInteractions';
import NavigationLinks from './NavigationLinks';
import ConditionallyRenderedModals from './ConditionallyRenderedModals';

const PrimaryNav = (): JSX.Element => {
  return (
    <header
      className="navkit"
      style={{
        position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
        left: useLocation().pathname === '/ecommerce' ? '50%' : '0',
        transform: useLocation().pathname === '/ecommerce' ? 'translateX(-50%)' : 'translateX(0)',
      }}
    >
      <div className="navkit__section">
        <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
          Dynamic Audio
        </Link>
      </div>
      <NavigationLinks />
      <ModalProvider>
        <UserInteractions />
        <ConditionallyRenderedModals />
      </ModalProvider>
    </header>
  );
};

export default PrimaryNav;
