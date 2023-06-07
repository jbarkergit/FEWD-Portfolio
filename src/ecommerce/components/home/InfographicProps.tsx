import { Link } from 'react-router-dom';

type InfographicPropsType = {
  bannerImg: string;
  imgAlt: string;
  companyName: string;
  companyMissionStatement: string;
  companyValue: string;
  ctaBtnName: string;
  ctaBtn2Name: string;
};

const InfographicProps = ({ bannerImg, imgAlt, companyName, companyMissionStatement, companyValue, ctaBtnName, ctaBtn2Name }: InfographicPropsType) => {
  return (
    <section>
      <main className="infographic">
        <picture className="infographic__graphic">
          <span className="imgFadeGradient" />
          <img srcSet={bannerImg} alt={imgAlt} decoding="async" fetchpriority="high" />
        </picture>
        <article className="infographic__information flexBox flexColumn">
          <h1>
            <i className="fa-solid fa-microphone-lines"></i> {companyName}
          </h1>
          <h2>{companyMissionStatement}</h2>
          <p>{companyValue}</p>
          <span className="infographic__information__ctaBtns flexBox">
            <Link to={''} className="flexBox justifyCenter" role="button">
              <h4>{ctaBtnName}</h4>
            </Link>
            <Link to={''} className="flexBox justifyCenter" role="button">
              <h4>{ctaBtn2Name}</h4>
            </Link>
          </span>
          <picture className="infographic__information__logos">
            <img src="src/ecommerce/assets/production-images/compressed-company-logos/audientLogo.svg" decoding="async" fetchpriority="high" />
            <img src="src/ecommerce/assets/production-images/compressed-company-logos/beyerdynamicLogo.svg" decoding="async" fetchpriority="high" />
            <img src="src/ecommerce/assets/production-images/compressed-company-logos/neumannLogo.webp" decoding="async" fetchpriority="high" />
            <img src="src/ecommerce/assets/production-images/compressed-company-logos/shureLogo.svg" decoding="async" fetchpriority="high" />
            <img src="src/ecommerce/assets/production-images/compressed-company-logos/solidStateLogicLogo.svg" decoding="async" fetchpriority="high" />
          </picture>
        </article>
      </main>
    </section>
  );
};

export default InfographicProps;
