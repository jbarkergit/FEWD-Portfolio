import { Link } from 'react-router-dom';

type ProjectPreviewPropType = {
  h2: string;
  h3: string;
  p: string;
  linkTo: string;
  imgSrc: string;
};

const ProjectPreviewProp = ({ h2, h3, p, linkTo, imgSrc }: ProjectPreviewPropType): JSX.Element => {
  return (
    <article className="projectSlider__projectPreview">
      <div className="projectSlider__projectPreview__data">
        <hgroup>
          <h3>{h3}</h3>
          <h2>{h2}</h2>
          <p>{p}</p>
        </hgroup>
        <Link to={linkTo}>LIVE DEMO</Link>
      </div>
      <picture>
        <img src={imgSrc} draggable="false" loading="lazy" decoding="async" fetchpriority="high" />
      </picture>
    </article>
  );
};

const MainContent = (): JSX.Element => {
  return (
    <main className="projectSlider">
      <ProjectPreviewProp
        h3="Ecommerce"
        h2="Dynamic Audio"
        p={`Built from scratch with Vite, React, TypeScript, types/react, Matt Pocock's ts-reset, Eslint, Airbnb Config, Prettier, Studio Freight's Lenis, uuid, react-router-dom, JWT Auth, Stripe and a self-developed product database that is dynamically mapped by utilizing a single useState hook stored in useContext.`}
        linkTo="/ecommerce"
        imgSrc="/src/ecommerce/assets/production-images/compressed-home-page/infographic/img-by-ilias-chebbi-on-unsplash.jpg"
      />
    </main>
  );
};

export default MainContent;
