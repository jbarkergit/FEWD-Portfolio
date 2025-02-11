import { isAuth } from '~/base/context/authProvider';
import type { Route } from './+types/FilmDatabase';
import FDUserAccount from '../pages/FDAccount';
import FDCatalog from '../pages/FDCatalog';
import { useTmdbFetcher, type Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

export async function clientLoader() {
  const data = (await useTmdbFetcher({ now_playing: undefined })) as Namespace_Tmdb.Prefabs_Obj;
  const results = data.now_playing.results;
  let responseSetArr: Array<typeof results> = [];
  for (let i = 0; i < Math.ceil(results.length / 4); i++) responseSetArr.push(results.slice(i * 4, i * 4 + 4));

  const isLogged = await isAuth();
  return { isLogged, responseSetArr };
}

export default function FilmDatabase({ loaderData }: Route.ComponentProps) {
  const { isLogged, responseSetArr } = loaderData;
  return isLogged ? <FDCatalog isLogged={isLogged} /> : <FDUserAccount responseSetArr={responseSetArr} />;
}
