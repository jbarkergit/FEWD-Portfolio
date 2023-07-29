import { Link } from 'react-router-dom';

const Service = (): JSX.Element => {
  return (
    <>
      <ul>
        <li>
          <h2>Service Terms</h2>
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

export default Service;
