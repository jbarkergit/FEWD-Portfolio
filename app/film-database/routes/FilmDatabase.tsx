import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import type { Route } from './+types/FilmDatabase';
import isUserAuthorized from '~/base/firebase/authentication/utility/isUserAuthorized';
import { tmdbCall } from '../composables/tmdbCall';
import { HeroDataProvider } from '~/film-database/context/HeroDataContext';
import { ChunkSizeProvider } from '~/film-database/context/ChunkSizeContext';
import { RootRefProvider } from '~/film-database/context/RootRefContext';
import { TrailerQueueProvider } from '~/film-database/context/ModalTrailerContext';
import { UserCollectionProvider } from '~/film-database/context/UserCollectionContext';
import { ModalProvider } from '~/film-database/context/ModalContext';
import FDAccountAnimation from '../features/account/animator/FDAccountAnimation';
import FDHeader from '../features/catalog/navigation/FDHeader';
import FDCatalog from '../features/catalog/FDCatalog';
import FDAccountModal from '~/film-database/features/account/auth-modal/FDAccountModal';
import { useAuth } from '~/base/firebase/authentication/context/authProvider';

export async function clientLoader() {
  const primaryData = await tmdbCall(new AbortController(), [
    'now_playing',
    // 'upcoming',
    // 'trending_today',
    // 'trending_this_week',
    // 'popular',
    // 'top_rated',
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

  return { primaryData };
}

export const useFLoader = () => useLoaderData() as Awaited<ReturnType<typeof clientLoader>>;

export default function FilmDatabase({ loaderData }: Route.ComponentProps) {
  const { user } = useAuth();
  const accountRef = useRef<HTMLDivElement>(null);

  return user ? (
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
      <FDAccountAnimation accountRef={accountRef} />
      <FDAccountModal ref={accountRef} />
    </>
  );
}
