import { Link } from 'react-router-dom';
import EPartners from '../navigation/footer/partners/EPartners';

const Infographic = (): JSX.Element => {
  return (
    <main className='infographic'>
      <picture className='infographic__graphic'>
        <span className='imgFadeGradient' />
        <img
          src='src/ecommerce/assets/production-images/compressed-home-page/infographic/img-by-ilias-chebbi-on-unsplash.jpg'
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
        <picture className='infographic__information__logos'>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Apos.png'
              alt='Apos'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Audient.svg'
              alt='Audient'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Beyerdynamic.svg'
              alt='Beyerdynamic'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/ElectroVoice.png'
              alt='Electro Voice'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Evo.svg'
              alt='Evo'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Focusrite.png'
              alt='Focusrite'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Neumann.webp'
              alt='Neumann'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Rode.svg'
              alt='Rode'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Schiit.png'
              alt='Schiit'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/Shure.svg'
              alt='Shure'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/SMSL.png'
              alt='SMSL'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/SolidStateLogic.svg'
              alt='Solid State Logic'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-company-logos/UAudio.png'
              alt='UAudio'
              draggable='false'
              loading='lazy'
              decoding='async'
              fetchpriority='low'
            />
          </picture>
        </picture>
      </article>
    </main>
  );
};

export default Infographic;
