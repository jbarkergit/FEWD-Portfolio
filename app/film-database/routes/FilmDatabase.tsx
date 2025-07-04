import { useRef } from 'react';
import type { Route } from './+types/FilmDatabase';
import { useLoaderData } from 'react-router';
// Auth
import isUserAuthorized from '~/base/firebase/authentication/utility/isUserAuthorized';
// Composables
import { tmdbCall } from '../composables/tmdbCall';
// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features: Account Page
import FDAccountAnimation from '../features/account/animation/FDAccountAnimation';
import FDAccountModal from '../features/account/FDAccountModal';
// Features: Catalog page
import FDHeader from '../features/catalog/navigation/FDHeader';
import FDCatalog from '../features/catalog/FDCatalog';

export async function clientLoader() {
  const isAuth = await isUserAuthorized();

  const primaryData = await tmdbCall([
    'now_playing',
    'upcoming',
    'trending_today',
    'trending_this_week',
    'popular',
    'top_rated',
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
  ]);

  return { isAuth, primaryData };
}

export const useFLoader = () => useLoaderData() as Awaited<ReturnType<typeof clientLoader>>;

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
      <FDAccountAnimation
        ref={animationRef}
        unmountAnimation={unmountAnimation}
      />
      <FDAccountModal ref={accountRef} />
    </>
  );
}
