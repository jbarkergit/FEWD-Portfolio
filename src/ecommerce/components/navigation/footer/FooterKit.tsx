import { Link } from 'react-router-dom';

const FooterKit = () => {
  return (
    <nav className="navFooterKit flexBox">
      <div className="flexBox flexColumn">
        <ul className="flexBox flexColumn">
          <li>
            <h2>Reach Out!</h2>
          </li>
          <li>
            <Link to="">Contact Form</Link>
          </li>
          <li>
            <Link to="">Newsletter</Link>
          </li>
        </ul>
        <ul className="flexBox flexColumn">
          <li>
            <h2>About Your Order</h2>
          </li>
          <li>
            <Link to="">Cancellation</Link>
          </li>
          <li>
            <Link to="">Payment</Link>
          </li>
          <li>
            <Link to="">Returns</Link>
          </li>
          <li>
            <Link to="">Shipment</Link>
          </li>
        </ul>
      </div>
      <div className="flexBox">
        <ul className="flexBox flexColumn">
          <li>
            <h2>Terms of Service</h2>
          </li>
          <li>
            <Link to="">Data Privacy</Link>
          </li>
          <li>
            <Link to="">EULA</Link>
          </li>
          <li>
            <Link to="">General Conditions</Link>
          </li>
          <li>
            <Link to="">Terms and Conditions</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FooterKit;
