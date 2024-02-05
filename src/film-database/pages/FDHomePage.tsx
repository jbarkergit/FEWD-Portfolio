import FDFooter from '../components/navigation/footer/FDFooter';
import FDHeader from '../components/navigation/header/FDHeader';
import useCreateCarousel from '../component-creation/useCreateCarousel';
import { useTmdbData } from '../api/hooks/useTmdbData';

const FDHomePage = () => {
  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>{useCreateCarousel({ heading: 'Now Playing', landscape: true })}</section>
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
