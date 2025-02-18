import type { Route } from './+types/FilmDatabase';
import FDUserAccount from '../pages/FDAccount';
import FDCatalog from '../pages/FDCatalog';
import { useTmdbFetcher, type Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import isUserAuthorized from '~/base/auth/hooks/isUserAuthorized';

export async function clientLoader() {
  const data = (await useTmdbFetcher({ now_playing: undefined })) as Namespace_Tmdb.Prefabs_Obj;
  const results = data.now_playing.results;
  let responseSetArr: Array<typeof results> = [];
  for (let i = 0; i < Math.ceil(results.length / 4); i++) responseSetArr.push(results.slice(i * 4, i * 4 + 4));

  const isAuth = await isUserAuthorized();
  return { isAuth, responseSetArr };
}

export default function FilmDatabase({ loaderData }: Route.ComponentProps) {
  const { isAuth, responseSetArr } = loaderData;
  return isAuth ? <FDCatalog /> : <FDUserAccount responseSetArr={responseSetArr} />;
}
