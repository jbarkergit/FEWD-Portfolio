import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDDetails from '~/film-database/components/details/FDDetails';
import FDCineInfoCredits from '~/film-database/features/catalog/modals/cineInfo/FDCineInfoCredits';

const FDCineInfo = () => {
  return (
    <div className='fdCineInfo'>
      <FDiFrame type={'modal'} />
      <FDDetails modal={true} />
      <FDCineInfoCredits />
    </div>
  );
};

export default FDCineInfo;
