// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDCastCrew from '../features/movie/FDCastCrew';

const FDMoviePage = () => {
  return (
    <div className='fdMoviePage' data-layout-carousel>
      <CatalogProvider>
        <FDCastCrew />
      </CatalogProvider>
    </div>
  );
};

export default FDMoviePage;
