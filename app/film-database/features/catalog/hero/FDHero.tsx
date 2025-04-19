import FDiFrame from '../../../components/iframe/FDiFrame';
import FDDetails from '../../../components/movie/FDDetails';

const FDHero = () => {
  return (
    <div className='fdHero'>
      <FDDetails modal={false} />
      <FDiFrame type={'hero'} />
    </div>
  );
};

export default FDHero;
