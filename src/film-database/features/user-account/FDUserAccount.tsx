type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
};

const FDUserAccount = ({ carouselComponents, isMenuOpen }: Type_PropDrill) => {
  // console.log(carouselComponents);
  return (
    <main className='fdUserAccount'>
      <article className='fdUserAccount__article'>
        <h1 className='fdUserAccount__article--h1'>Film Database</h1>
      </article>
      <section className='fdUserAccount__display'>{carouselComponents.slice(0, 7).map((component) => component.props)}</section>
    </main>
  );
};

export default FDUserAccount;
