// Router
import type { Route } from './+types/FilmDatabase';
// Auth
import isUserAuthorized from '~/base/auth/hooks/isUserAuthorized';
// Fetch & utility
import { useTmdbFetcher, type Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
// Context
import { CatalogProvider, type Type_heroData } from '../context/CatalogContext';
// Features: Account Page
import FDAccountBackground from '../features/account/animation/FDAccountBackground';
import FDAccountModal from '../features/account/FDAccountModal';
//Features: Catalog page
import FDHeader from '../features/catalog/header/FDHeader';
import FDHero from '../features/catalog/hero/FDHero';
import FDMedia from '../features/catalog/media/FDMedia';
import FDMovieModal from '../features/catalog/modals/FDMovieModal';

export async function clientLoader() {
  // Auth
  const isAuth = await isUserAuthorized();

  // Application dependant data
  let primaryData: Namespace_Tmdb.Response_Union[];
  let heroData: Type_heroData;
  let accountData: Namespace_Tmdb.BaseMedia_Provider[][];

  const data = (await useTmdbFetcher([
    { now_playing: undefined },
    { upcoming: undefined },
    { trending_today: undefined },
    { trending_this_week: undefined },
    { discover: 'action' },
    { discover: 'adventure' },
    { discover: 'animation' },
    { discover: 'comedy' },
    { discover: 'crime' },
    { discover: 'documentary' },
    { discover: 'drama' },
    { discover: 'family' },
    { discover: 'fantasy' },
    { discover: 'history' },
    { discover: 'horror' },
    { discover: 'music' },
    { discover: 'mystery' },
    { discover: 'romance' },
    { discover: 'science_fiction' },
    { discover: 'thriller' },
    { discover: 'tv_movie' },
    { discover: 'war' },
    { discover: 'western' },
  ])) as Namespace_Tmdb.Response_Union[];

  primaryData = data;

  const nowPlayingObj = data[0] as unknown as Namespace_Tmdb.Prefabs_Obj;
  const nowPlayingResults = (nowPlayingObj.now_playing as Namespace_Tmdb.Prefabs_Obj['now_playing']).results as Namespace_Tmdb.Prefabs_Obj['now_playing']['results'];
  const nowPlayingFirstResult = nowPlayingResults[0] as Type_heroData;
  heroData = nowPlayingFirstResult;

  // Account page's background animation data
  const nowPlayingData = (data[0] as Namespace_Tmdb.Prefabs_Obj)['now_playing'].results as Namespace_Tmdb.Prefabs_Obj['now_playing']['results'];
  let slicedAccountData: Namespace_Tmdb.BaseMedia_Provider[][] = [];
  for (let i = 0; i < Math.ceil(nowPlayingData.length / 4); i++) slicedAccountData.push(nowPlayingData.slice(i * 4, i * 4 + 4));
  accountData = slicedAccountData;

  // Return
  return { isAuth, primaryData, heroData, accountData };
}

export default function FilmDatabase({ loaderData }: Route.ComponentProps) {
  const { isAuth } = loaderData;

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
      <FDAccountBackground />
      <FDAccountModal />
    </div>
  );
}
