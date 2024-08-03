import FDUserAccountArticle from '../../features/account/article/FDUserAccountArticle';
import FDAccountRegistery from '../../features/account/registery/FDAccountRegistery';

type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
};

const FDUserAccount = ({ carouselComponents, isMenuOpen }: Type_PropDrill) => {
  // console.log(carouselComponents);
  return (
    <main className='fdUserAccount'>
      <FDUserAccountArticle />
      <FDAccountRegistery />
      {/* <section className='fdUserAccount__display'>{carouselComponents.slice(0, 7).map((component) => component.props)}</section> */}
    </main>
  );
};

export default FDUserAccount;
