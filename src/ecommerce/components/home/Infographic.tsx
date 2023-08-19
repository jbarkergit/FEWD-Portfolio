import { Link } from 'react-router-dom';

const Infographic = (): JSX.Element => {
  return (
    <main className="infographic">
      <picture className="infographic__graphic">
        <span className="imgFadeGradient" />
        <img
          src="src/ecommerce/assets/production-images/compressed-home-page/infographic/img-by-ilias-chebbi-on-unsplash.jpg"
          alt="Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment"
          decoding="async"
          fetchpriority="high"
        />
      </picture>
      <article className="infographic__information">
        <div className="infographic__information__details">
          <hgroup>
            <h3>
              Now partnered with <span className="highlight">beyerdynamic</span>
            </h3>
            <h2>the new hifi shop</h2>
            <h1>
              Unparalleled HiFi audio and <span className="highlight">superior</span> manufacturing for discerning audiophiles. Crystal-clear sound,{' '}
              <span className="highlight">premium </span>
              materials, meticulous <span className="highlight">craftsmanship</span>, and lasting durability.
            </h1>
          </hgroup>
          <div className="infographic__information__details__cta">
            <Link to={''} role="button">
              Learn More
            </Link>
            <Link to={''} role="button">
              Save Up To 25%
            </Link>
          </div>
        </div>
        <picture className="infographic__information__logos">
          <img src="src/ecommerce/assets/production-images/compressed-company-logos/audientLogo.svg" decoding="async" fetchpriority="low" />
          <img src="src/ecommerce/assets/production-images/compressed-company-logos/beyerdynamicLogo.svg" decoding="async" fetchpriority="low" />
          <img src="src/ecommerce/assets/production-images/compressed-company-logos/neumannLogo.webp" decoding="async" fetchpriority="low" />
          <img src="src/ecommerce/assets/production-images/compressed-company-logos/shureLogo.svg" decoding="async" fetchpriority="low" />
          <img src="src/ecommerce/assets/production-images/compressed-company-logos/solidStateLogicLogo.svg" decoding="async" fetchpriority="low" />
        </picture>
      </article>
    </main>
  );
};

export default Infographic;
