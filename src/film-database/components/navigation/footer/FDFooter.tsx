import { Link } from 'react-router-dom';
import useCreatePicture from '../../../hooks/useCreatePicture';
import TmdbLogoShort from '../../../icons/TmdbLogoShort';

const FDFooter = () => {
  return (
    <footer className='fdFooter'>
      <section className='fdFooter__block'>
        <table>
          <thead>
            <tr>
              <th>Browse</th>
              <th>TV Shows</th>
              <th>Membership</th>
              <th>Membership Plans</th>
              <th>Help</th>
              <th>About Us</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>x</td>
              <td>y</td>
              <td>z</td>
            </tr>
            <tr>
              <td>x</td>
              <td>y</td>
              <td>z</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className='fdFooter__block'>
        <nav className='fdFooter__block__nav'>
          <div className='fdFooter__block__nav__socials'>{/* socials here */}</div>
          <div className='fdFooter__block__nav__additions'>{/* additional info here */}</div>
        </nav>
      </section>

      <section className='fdFooter__block'>
        <Link to='https://www.themoviedb.org/' target='_blank'>
          {useCreatePicture({ svg: <TmdbLogoShort />, alt: 'TMDB API Logo' })}
        </Link>
        <blockquote>
          <p>
            All media content along with associated information, images, and videos are provided courtesy of{' '}
            <Link to='https://www.themoviedb.org/' target='_blank'>
              themoviedb.org.
            </Link>
          </p>
        </blockquote>
      </section>
    </footer>
  );
};
export default FDFooter;
