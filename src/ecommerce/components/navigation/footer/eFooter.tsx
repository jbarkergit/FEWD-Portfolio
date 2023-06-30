import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
    <form className="newsletter">
      <div className="newsletter__field">
        <label>
          <input type="email" name="email" placeholder="Enter email address..." />
        </label>
        <button type="submit" aria-label="Submit Email Address to Sign Up for Newsletter">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
          </svg>
        </button>
      </div>
      <div className="newsletter__notice">
        <h3>
          <mark>Privacy notice: for demo purposes only.</mark>
        </h3>
        <h4>
          This input field is not a tied to a live marketing service. Any information provided will not be stored via third party services, nor local databases.
        </h4>
      </div>
    </form>
  );
};

const Support = () => {
  return (
    <ul>
      <li>
        <h2>Support</h2>
      </li>
      <li>
        <Link to="">
          <h3>My Account</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>Dynamic Rewards</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>Teacher Discount</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>FAQ</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>Shipping</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>International</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>Returns</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>Payment</h3>
        </Link>
      </li>
      <li>
        <Link to="">
          <h3>Find a Store</h3>
        </Link>
      </li>
    </ul>
  );
};

const Service = () => {
  return (
    <>
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
            <h3>Ethics</h3>
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
      <ul>
        <li>
          <h2>Contact Us</h2>
        </li>
        <li>
          <Link to="">
            <h3>
              <address>1800 DAUDIO</address>
            </h3>
          </Link>
        </li>
        <li>
          <Link to="">
            <h3>
              <address>support@dynamicaudio.com</address>
            </h3>
          </Link>
        </li>
      </ul>
    </>
  );
};

const eFooter = () => {
  return (
    <footer className="eFooter">
      <section className="eFooter__newsCta">
        <h2>Keep in touch</h2>
        <Newsletter />
      </section>
      <nav className="footerKit">
        <section className="footerKit__customerSupport">
          <Support />
        </section>
        <section className="footerKit__customerSupport">
          <div>
            <Service />
          </div>
        </section>
      </nav>
      <small>2023 Dynamic Audio</small>
    </footer>
  );
};

export default eFooter;
