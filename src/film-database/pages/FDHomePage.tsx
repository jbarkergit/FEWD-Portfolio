import useCreateCarousel from '../component-creation/useCreateCarousel';
import FDFooter from '../components/navigation/footer/FDFooter';
import FDHeader from '../components/navigation/header/FDHeader';

const FDHomePage = () => {
  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>
        {useCreateCarousel({ heading: 'test', landscape: true })}
        {useCreateCarousel({ heading: 'test', landscape: true })}
        {useCreateCarousel({ heading: 'test', landscape: true })}
        {useCreateCarousel({ heading: 'test', landscape: true })}
      </section>
      <FDFooter />
    </div>
  );
};
export default FDHomePage;
