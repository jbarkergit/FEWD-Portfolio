import type { Route } from './+types/FilmDatabase';
import { useTmdbFetcher, type Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import isUserAuthorized from '~/base/auth/hooks/isUserAuthorized';
import { CatalogProvider } from '../context/CatalogContext';
import FDAccountBackground from '../features/account/animation/FDAccountBackground';
import FDAccountModal from '../features/account/FDAccountModal';
import FDHeader from '../features/catalog/header/FDHeader';
import FDHero from '../features/catalog/hero/FDHero';
import FDMedia from '../features/catalog/media/FDMedia';
import FDMovieModal from '../features/catalog/modals/FDMovieModal';

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
  return isAuth ? (
    <CatalogProvider>
      <div className='filmDatabase'>
        <FDHeader />
        <div className='fdCatalog' data-layout-carousel>
          <FDHero />
          <FDMedia />
          <FDMovieModal />
        </div>
      </div>
    </CatalogProvider>
  ) : (
    <div className='fdAccount'>
      <FDAccountBackground responseSetArr={responseSetArr} />
      <FDAccountModal responseSetArr={responseSetArr} />
    </div>
  );
}
