import ProjectPreviewProp from './ProjectPreviewProp';

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
