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
        <hgroup>
          <h2>Your go-to source for audiophile grade HiFi audio equipment</h2>
          <h1>
            Unparalleled HiFi audio and superior manufacturing for discerning audiophiles. Crystal-clear sound, premium materials, meticulous craftsmanship, and
            lasting durability.
          </h1>
        </hgroup>
        <span className="infographic__information__cta">
          <Link to={''} role="button">
            Learn More
          </Link>
          <Link to={''} role="button">
            Save Up To 25%
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
