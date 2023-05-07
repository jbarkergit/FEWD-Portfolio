import InfographicProps from '../../components/props/home/InfographicProps';

const Infographic = () => {
  return (
    <InfographicProps
      bannerImg="https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
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
