import { useLocation } from 'react-router-dom';
import HeaderKit from '../../components/navigation/header/HeaderKit';
import UserInteractions from '../../components/navigation/header/UserInteractions';

const PrimaryNav = () => {
  return (
    <section
      className="navkit"
      style={{
        position: useLocation().pathname === '/ecommerce' ? 'absolute' : 'relative',
      }}
    >
      <header className="navkit__header">
        <HeaderKit />
        <UserInteractions />
      </header>
    </section>
  );
};
export default PrimaryNav;
