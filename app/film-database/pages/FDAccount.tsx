// Features
import { useTmdbFetcher, type Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountBackground from '../features/account/animation/FDAccountBackground';
import FDAccountModal from '../features/account/FDAccountModal';
import type { Route } from './+types/FDAccount';

export async function clientLoader() {
  const data = (await useTmdbFetcher({ now_playing: undefined })) as Namespace_Tmdb.Prefabs_Obj;
  const results = data.now_playing.results;

  let responseSetArr: Array<typeof results> = [];
  for (let i = 0; i < Math.ceil(results.length / 4); i++) responseSetArr.push(results.slice(i * 4, i * 4 + 4));
  return { responseSetArr };
}

const FDUserAccount = ({ loaderData }: Route.ComponentProps) => {
  const responseSetArr = loaderData.responseSetArr;

  return (
    <div className='fdAccount'>
      <FDAccountBackground responseSetArr={responseSetArr} />
      <FDAccountModal />
    </div>
  );
};

export default FDUserAccount;
