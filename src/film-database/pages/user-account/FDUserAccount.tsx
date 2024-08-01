type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
};

const FDUserAccount = ({ carouselComponents, isMenuOpen }: Type_PropDrill) => {
  console.log(carouselComponents);
  return (
    <main className='fdUserAccount'>
      <article className='fdUserAccount__article'>
        <h1 className='fdUserAccount__article--h1'>Stay in the know about the hottest new movies.</h1>
        <h2>Create an account to queue release notifications via sms.</h2>
        <h3>Powered by TMDB</h3>
      </article>
      {/* <section className='fdUserAccount__display'>{carouselComponents.slice(0, 7).map((component) => component.props)}</section> */}
    </main>
  );
};

export default FDUserAccount;
