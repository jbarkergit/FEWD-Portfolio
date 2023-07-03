import { Link } from 'react-router-dom';

const Infographic = (): JSX.Element => {
  return (
    <main className="infographic">
      <picture className="infographic__graphic">
        <span className="imgFadeGradient" />
        <img
          src="/src/ecommerce/assets/production-images/compressed-home-page/infographic/img-by-ilias-chebbi-on-unsplash.jpg"
          alt="Dynamic Audio - Your go-to source for audiophile grade HiFi audio equipment"
          decoding="async"
          fetchpriority="high"
        />
      </picture>
      <article className="infographic__information">
        <span className="infographic__information__heading">
          <i className="fa-solid fa-microphone-lines"></i>
          <h1>Dynamic Audio</h1>
        </span>
        <h2>Your go-to source for audiophile grade HiFi audio equipment</h2>
        <p>
          Unparalleled HiFi audio & superior manufacturing - crystal-clear sound, premium materials, meticulous craftsmanship, and lasting durability for discerning
          audiophiles.
        </p>
        <span className="infographic__information__cta">
          <Link to={''} role="button">
            <h4>Learn More</h4>
          </Link>
          <Link to={''} role="button">
            <h4>Save Up To 25%</h4>
          </Link>
        </span>
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
