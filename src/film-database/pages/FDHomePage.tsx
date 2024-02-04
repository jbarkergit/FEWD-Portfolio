import useCreateCarousel from '../component-creation/useCreateCarousel';
import FDHeader from '../components/navigation/header/FDHeader';

const FDHomePage = () => {
  return (
    <div className='filmDatabase'>
      <FDHeader />
      {useCreateCarousel({ heading: 'test', landscape: true })}
      {useCreateCarousel({ heading: 'test', landscape: true })}
      {useCreateCarousel({ heading: 'test', landscape: true })}
      {useCreateCarousel({ heading: 'test', landscape: true })}
    </div>
  );
};
export default FDHomePage;
