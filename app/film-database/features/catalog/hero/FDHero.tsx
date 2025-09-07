import FDiFrame from '../../../components/iframe/FDiFrame';
import FDDetails from '../../../components/movie/FDDetails';

const FDHero = () => {
  return (
    <div className='fdHero'>
      <div className='fdHero__container'>
        <FDDetails modal={false} />
        <FDiFrame type={'hero'} />
      </div>
    </div>
  );
};

export default FDHero;
