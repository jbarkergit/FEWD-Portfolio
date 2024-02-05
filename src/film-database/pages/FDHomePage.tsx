import useCreateCarousel from '../component-creation/useCreateCarousel';
import FDFooter from '../components/navigation/footer/FDFooter';
import FDHeader from '../components/navigation/header/FDHeader';
import { useApiRequest } from '../hooks/useApiRequest';

const FDHomePage = () => {
  // useApiRequest('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1').then((data) => console.log(data));
  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>{useCreateCarousel({ heading: 'test', landscape: true })}</section>
      <FDFooter />
    </div>
  );
};
export default FDHomePage;
