import { Link, useLocation } from 'react-router-dom';

const LogoArea = () => {
  return (
    <section className="navkit__section">
      <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 20%)' }}>
        Dynamic Audio
      </Link>
    </section>
  );
};

export default LogoArea;
