import { Link } from 'react-router-dom';
import CompanyLogos from '../navigation/shared/CompanyLogos';

const Infographic = (): JSX.Element => {
  return (
    <main className='infographic'>
      <picture className='infographic__graphic'>
        <span className='imgFadeGradient' />
        <source
          media='(max-width: 1528px)'
          srcSet='/src/ecommerce/assets/production-images/compressed-home-page/infographic/1528x915/img-by-ilias-chebbi-on-unsplash.jpg'
        />
        <img
          src='/src/ecommerce/assets/production-images/compressed-home-page/infographic/1920x1080/img-by-ilias-chebbi-on-unsplash.jpg'
          alt='Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment'
          decoding='async'
          fetchpriority='high'
        />
      </picture>
      <article className='infographic__information'>
        <div className='infographic__information__details'>
          <hgroup>
            <h3>
              New drops from <span className='highlight'>beyerdynamic</span>
            </h3>
            <h2>the new hifi shop</h2>
            <h1>
              Unparalleled HiFi audio and <span className='highlight'>superior</span> manufacturing for discerning audiophiles. Crystal-clear sound,{' '}
              <span className='highlight'>premium </span>
              materials, meticulous <span className='highlight'>craftsmanship</span>, and lasting durability.
            </h1>
          </hgroup>
          <div className='infographic__information__details__cta'>
            <Link to={''} role='button'>
              Learn More
            </Link>
            <Link to={''} role='button'>
              Save Up To 25%
            </Link>
          </div>
        </div>
        <div className='companyLogos'>
          <CompanyLogos />
          <CompanyLogos />
        </div>
      </article>
    </main>
  );
};

export default Infographic;
