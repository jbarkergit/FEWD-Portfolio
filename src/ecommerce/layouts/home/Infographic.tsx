import InfographicProps from '../../components/home/InfographicProps';

const Infographic = () => {
  return (
    <InfographicProps
      bannerImg="/src/ecommerce/assets/production-images/compressed-home-page/infographic/img-by-ilias-chebbi-on-unsplash.jpg"
      imgAlt="{props.imgAlt}"
      companyName="Dynamic Audio"
      companyMissionStatement="Your go-to source for audiophile grade HiFi audio equipment"
      companyValue="Reintroducing Beyerdynamic's beloved, world reknown original DT Series, sporting new Tesla technologies for greater sound under the X Series name."
      ctaBtnName="Learn More"
      ctaBtn2Name="Save Up To 25%"
    />
  );
};

export default Infographic;
