import { Link } from 'react-router-dom';

const FooterKit = () => {
  const Newsletter = () => {
    return (
      <form className="newsletter">
        <h2>Keep in touch</h2>
        <div className="newsletter__field">
          <label>
            <input type="email" name="email" placeholder="Enter email address..." />
          </label>
          <button type="submit" aria-label="Submit Email Address to Sign Up for Newsletter">
            <img src="src/ecommerce/assets/production-images/svg/paper-airplane.svg" />
          </button>
        </div>
        <div className="newsletter__notice">
          <h4>
            <mark>Privacy notice: for demo purposes only.</mark>
          </h4>
          <h5>
            This input field is not a tied to a live marketing service. Any information provided will not be saved and/or stored via third party services, nor local
            databases.
          </h5>
        </div>
      </form>
    );
  };
  return (
    <nav className="footerKit">
      <Newsletter />
      <ul>
        <li>
          <h2>Reach Out!</h2>
        </li>
        <li>
          <Link to="">
            <h3>Contact Form</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>Newsletter</h3>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <h2>About Your Order</h2>
        </li>
        <li>
          <Link to="">
            <h3>Cancellation</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>Payment</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>Returns</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>Shipment</h3>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <h2>Terms of Service</h2>
        </li>
        <li>
          <Link to="">
            <h3>Data Privacy</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>EULA</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>General Conditions</h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>Terms and Conditions</h3>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterKit;
