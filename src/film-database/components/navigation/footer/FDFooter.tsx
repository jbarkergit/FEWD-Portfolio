import { Link } from 'react-router-dom';
import TmdbLogoShort from '../../../assets/svg-icons/TmdbLogoShort';
import useCreatePicture from '../../../hooks/useCreatePicture';

const FDFooter = () => {
  return (
    <footer className='fdFooter'>
      <section className='fdFooter__section'>
        <nav className='fdFooter__section__nav'>
          <ul className='fdFooter__section__nav__ul'>
            <div className='fdFooter__section__nav__ul__wrapper'>
              <header className='fdFooter__section__nav__ul__wrapper__header'>
                <h2>Browse</h2>
              </header>
              {['Streaming Library', 'Movies', 'Television', 'Kids'].map((item: string) => (
                <li className='fdFooter__section__nav__ul__wrapper__li' key={item}>
                  <Link to='' aria-label={`Navigate to ${item}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
          <ul className='fdFooter__section__nav__ul'>
            <div className='fdFooter__section__nav__ul__wrapper'>
              <header className='fdFooter__section__nav__ul__wrapper__header'>
                <h2>Categories</h2>
              </header>
              {['To be', 'reduced from', 'api data', 'context'].map((item: string) => (
                <li className='fdFooter__section__nav__ul__wrapper__li' key={item}>
                  <Link to='' aria-label={`Navigate to ${item}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
          <ul className='fdFooter__section__nav__ul'>
            <div className='fdFooter__section__nav__ul__wrapper'>
              <header className='fdFooter__section__nav__ul__wrapper__header'>
                <h2>Help</h2>
              </header>
              {['What to Watch', 'About Ads', 'Privacy Policy', 'Personal Data Privacy', 'Your US State Privacy Rights', 'Terms of Service'].map((item: string) => (
                <li className='fdFooter__section__nav__ul__wrapper__li' key={item}>
                  <Link to='' aria-label={`Navigate to ${item}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </nav>
      </section>

      <section className='fdFooter__blockquote'>
        <Link to='https://www.themoviedb.org/' target='_blank'>
          {useCreatePicture({ svg: <TmdbLogoShort />, alt: 'TMDB API Logo' })}
        </Link>
        <blockquote className='fdFooter__blockquote__tmdbApiCredit'>
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
