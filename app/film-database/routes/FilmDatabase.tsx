import { useRef } from 'react';
import type { Route } from './+types/FilmDatabase';
import { useLoaderData } from 'react-router';
// Auth
import isUserAuthorized from '~/base/firebase/authentication/utility/isUserAuthorized';
// Context
import { HeroDataProvider } from '~/film-database/context/HeroDataContext';
import { ChunkSizeProvider } from '~/film-database/context/ChunkSizeContext';
import { RootRefProvider } from '~/film-database/context/RootRefContext';
import { TrailerQueueProvider } from '~/film-database/context/ModalTrailerContext';
import { UserCollectionProvider } from '~/film-database/context/UserCollectionContext';
import { ModalProvider } from '~/film-database/context/ModalContext';
// Composables
import { tmdbCall } from '../composables/tmdbCall';
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
    <RootRefProvider>
      <ChunkSizeProvider>
        <HeroDataProvider>
          <ModalProvider>
            <UserCollectionProvider>
              <TrailerQueueProvider>
                <div className='filmDatabase'>
                  <FDHeader />
                  <FDCatalog />
                </div>
              </TrailerQueueProvider>
            </UserCollectionProvider>
          </ModalProvider>
        </HeroDataProvider>
      </ChunkSizeProvider>
    </RootRefProvider>
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
