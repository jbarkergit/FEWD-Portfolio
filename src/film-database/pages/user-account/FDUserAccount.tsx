import FDWelcomeArticle from '../../components/auth-page/FDWelcomeArticle';
import FDAccountRegistery from '../../features/account/registery/FDAccountRegistery';

type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
};

const FDUserAccount = ({ carouselComponents, isMenuOpen }: Type_PropDrill) => {
  // console.log(carouselComponents);
  return (
    <main className='fdUserAccount'>
      <FDWelcomeArticle />
      <FDAccountRegistery />
      {/* <section className='fdUserAccount__display'>{carouselComponents.slice(0, 7).map((component) => component.props)}</section> */}
    </main>
  );
};

export default FDUserAccount;
