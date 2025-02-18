// Features
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountBackground from '../features/account/animation/FDAccountBackground';
import FDAccountModal from '../features/account/FDAccountModal';

const FDUserAccount = ({ responseSetArr }: { responseSetArr: Namespace_Tmdb.BaseMedia_Provider[][] }) => {
  return (
    <div className='fdAccount'>
      <FDAccountBackground responseSetArr={responseSetArr} />
      <FDAccountModal responseSetArr={responseSetArr} />
    </div>
  );
};

export default FDUserAccount;
