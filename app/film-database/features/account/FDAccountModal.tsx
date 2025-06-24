import { useRef, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountModalPoster from './features/FDAccountModalPoster';
import FDAccountFieldset from './fieldsets/FDAccountFieldset';

const FDAccountModal = () => {
  /** @loaderData */
  const { primaryData } = useLoaderData();
  const films = useMemo(() => (primaryData[0] as Namespace_Tmdb.Prefabs_Obj).now_playing.results, [primaryData]);

  /**
   * @function setTimeout
   * @description Sets timeout to delay modal visibility
   */
  const accountRef = useRef<HTMLDivElement>(null);
  setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);

  /** @JSX */
  return (
    <div className='fdAccount' data-layout-carousel>
      <div className='fdAccount__container' ref={accountRef} data-visible='false'>
        <main className='fdAccount__container__wrapper'>
          <form className='fdAccount__container__wrapper__form'>
            <FDAccountFieldset />
          </form>
        </main>
        <FDAccountModalPoster films={films} />
      </div>
    </div>
  );
};

export default FDAccountModal;
