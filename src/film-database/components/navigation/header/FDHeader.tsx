import { Link } from 'react-router-dom';
import useCreatePicture from '../../../hooks/useCreatePicture';

const FDHeader = () => {
  return (
    <header className='fdHeader'>
      <nav className='fdHeader__nav'>
        <section className='fdLogo__nav__logo'>
          {/* <Link to='/film-database'>{useCreatePicture({ svg: <CbiVideoland />, alt: 'Film Database Logo' })}</Link> */}
        </section>
        <section className='fdLogo__nav__links'>
          <ul aria-labelledby='navigate-to-genre'>
            {/* map genres here */}
            <li id='navigate-to-genre'>
              <Link to='' aria-label=''></Link>
            </li>
          </ul>
        </section>
        <section className='fdLogo__nav__features'>
          {/* search bar */}
          {/* account */}
        </section>
      </nav>
    </header>
  );
};
export default FDHeader;
