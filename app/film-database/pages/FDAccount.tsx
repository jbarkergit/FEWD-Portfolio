import { CatalogProvider } from '../context/CatalogContext';
// Features
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountBackground from '../features/account/animation/FDAccountBackground';
import FDAccountModal from '../features/account/FDAccountModal';

const FDUserAccount = ({ responseSetArr }: { responseSetArr: Namespace_Tmdb.BaseMedia_Provider[][] }) => {
  return (
    <CatalogProvider>
      <div className='fdAccount'>
        <FDAccountBackground responseSetArr={responseSetArr} />
        <FDAccountModal responseSetArr={responseSetArr} />
      </div>
    </CatalogProvider>
  );
};

export default FDUserAccount;
