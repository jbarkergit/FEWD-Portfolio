import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderKit from '../../components/navigation/header/HeaderKit';
import UserInteractions from '../../components/navigation/header/UserInteractions';
import ShoppingCart from '../../components/features/ShoppingCart';

const PrimaryNav = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const pageContent = viewCart ? <ShoppingCart /> : null;
  return (
    <section
      className="navkit"
      style={{
        position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
      }}
    >
      <header className="navkit__header">
        <HeaderKit />
        <UserInteractions viewCart={viewCart} setViewCart={setViewCart} />
        {pageContent}
      </header>
    </section>
  );
};
export default PrimaryNav;
