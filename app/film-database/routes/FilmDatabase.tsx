// Router
import type { Route } from './+types/FilmDatabase';
// Auth
import isUserAuthorized from '~/base/firebase/authentication/utility/isUserAuthorized';
// Fetch & utility
import { useTmdbFetcher, type Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features: Account Page
import FDAccountAnimation from '../features/account/animation/FDAccountAnimation';
import FDAccountModal from '../features/account/FDAccountModal';
// Features: Catalog page
import FDHeader from '../features/catalog/navigation/FDHeader';
import FDCatalog from '../features/catalog/FDCatalog';
import { useRef } from 'react';

export async function clientLoader() {
  // Auth
  const isAuth = await isUserAuthorized();

  // Application dependant data
  let primaryData: Namespace_Tmdb.Response_Union[];
  let initialHeroData: Namespace_Tmdb.BaseMedia_Provider | undefined;
  let accountData: Namespace_Tmdb.BaseMedia_Provider[][];

  const data = (await useTmdbFetcher([
    { now_playing: undefined },
    // { upcoming: undefined },
    // { trending_today: undefined },
    // { trending_this_week: undefined },
    // { discover: 'action' },
    // { discover: 'adventure' },
    // { discover: 'animation' },
    // { discover: 'comedy' },
    // { discover: 'crime' },
    // { discover: 'documentary' },
    // { discover: 'drama' },
    // { discover: 'family' },
    // { discover: 'fantasy' },
    // { discover: 'history' },
    // { discover: 'horror' },
    // { discover: 'music' },
    // { discover: 'mystery' },
    // { discover: 'romance' },
    // { discover: 'science_fiction' },
    // { discover: 'thriller' },
    // { discover: 'tv_movie' },
    // { discover: 'war' },
    // { discover: 'western' },
  ])) as Namespace_Tmdb.Response_Union[];

  primaryData = data;

  const nowPlayingObj = data[0] as unknown as Namespace_Tmdb.Prefabs_Obj;
  const nowPlayingResults = (nowPlayingObj.now_playing as Namespace_Tmdb.Prefabs_Obj['now_playing']).results as Namespace_Tmdb.Prefabs_Obj['now_playing']['results'];
  const nowPlayingFirstResult = nowPlayingResults[0] as Namespace_Tmdb.BaseMedia_Provider | undefined;
  initialHeroData = nowPlayingFirstResult;

  // Account page's background animation data
  const nowPlayingData = (data[0] as Namespace_Tmdb.Prefabs_Obj)['now_playing'].results as Namespace_Tmdb.Prefabs_Obj['now_playing']['results'];
  let slicedAccountData: Namespace_Tmdb.BaseMedia_Provider[][] = [];
  for (let i = 0; i < Math.ceil(nowPlayingData.length / 4); i++) slicedAccountData.push(nowPlayingData.slice(i * 4, i * 4 + 4));
  accountData = slicedAccountData;

  // Return
  return { isAuth, primaryData, initialHeroData, accountData };
}

export default function FilmDatabase({ loaderData }: Route.ComponentProps) {
  const { isAuth } = loaderData;

  const animationRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const unmountAnimation = (): void => {
    if (!animationRef.current || !accountRef.current) return;
    const attribute: string = 'data-visible';
    animationRef.current.setAttribute(attribute, 'false');
    accountRef.current.setAttribute(attribute, 'true');
  };

  return isAuth ? (
    <CatalogProvider>
      <div className='filmDatabase'>
        <FDHeader />
        <FDCatalog />
      </div>
    </CatalogProvider>
  ) : (
    <>
      <FDAccountAnimation ref={animationRef} unmountAnimation={unmountAnimation} />
      <FDAccountModal ref={accountRef} />
    </>
  );
}
