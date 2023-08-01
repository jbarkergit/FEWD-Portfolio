import { Link, useLocation } from 'react-router-dom';

const Logo = () => {
  return (
    <li className="navkit__section__links--logo">
      <Link to="/ecommerce" style={{ color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)' }}>
        Dynamic Audio
      </Link>
    </li>
  );
};

export default Logo;
