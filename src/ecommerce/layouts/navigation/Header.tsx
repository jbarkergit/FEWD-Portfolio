import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderKit from '../../components/navigation/header/HeaderKit';
import UserInteractions from '../../components/navigation/header/UserInteractions';
import ShoppingCart from '../../features/ShoppingCart';

const PrimaryNav = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const pageContent = viewCart ? null : <ShoppingCart />;
  return (
    <section>
      <header className="flexBox justifyCenter">
        <nav
          className="navkit flexBox"
          style={{
            position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
          }}
        >
          <HeaderKit />
          <UserInteractions viewCart={viewCart} setViewCart={setViewCart} />
          {pageContent}
        </nav>
      </header>
    </section>
  );
};
export default PrimaryNav;
