import { useLocation } from 'react-router-dom';
import HeaderKit from '../../components/navigation/header/HeaderKit';
import UserInteractions from '../../components/navigation/header/UserInteractions';
import { useState } from 'react';
import Cart from '../../components/features/cart/Cart';
import { CartProvider } from '../../context/cart/CartProvider';

const PrimaryNav = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const cartContent = viewCart ? <Cart /> : null;

  return (
    <CartProvider>
      <section
        className="navkit"
        style={{
          position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
        }}
      >
        <header className="navkit__header">
          <HeaderKit />
          <UserInteractions viewCart={viewCart} setViewCart={setViewCart} />
          {cartContent}
        </header>
      </section>
    </CartProvider>
  );
};

export default PrimaryNav;
