import useCreateCarousel from '../component-creation/useCreateCarousel';
import FDHeader from '../components/navigation/header/FDHeader';

const FDHomePage = () => {
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {useCreateCarousel()}
    </div>
  );
};
export default FDHomePage;
