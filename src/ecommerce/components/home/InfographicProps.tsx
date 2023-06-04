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
          <img srcSet={bannerImg} alt={imgAlt} loading="lazy" decoding="async" fetchpriority="high" />
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
            <img src="https://audient.com/wp-content/themes/sydney-audient/logowhite.svg" loading="lazy" decoding="async" fetchpriority="high" />
            <img
              src="https://d33p2k2w4zpozf.cloudfront.net/static/version1680503554/frontend/Flagbit/beyerdynamic/de_DE/images/logo.svg"
              loading="lazy"
              decoding="async"
              fetchpriority="high"
            />
            <img src="https://www.neumann.com/dist/images/logo.png" loading="lazy" decoding="async" fetchpriority="high" />
            <img src="https://www.shure.com/packs/media/images/shure_branding_clean-5f036c9a.svg" loading="lazy" decoding="async" fetchpriority="high" />
            <img src="https://www.solidstatelogic.com/assets/template/images/solid-state-logic-logo.svg" loading="lazy" decoding="async" fetchpriority="high" />
          </picture>
        </article>
      </main>
    </section>
  );
};

export default InfographicProps;
