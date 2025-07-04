import { forwardRef, useMemo } from 'react';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDAccountModalPoster from './features/FDAccountModalPoster';
import FDAccountFieldset from './fieldsets/FDAccountFieldset';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

const FDAccountModal = forwardRef<HTMLDivElement, {}>(({}, accountRef) => {
  /** @loaderData */
  const { primaryData } = useFLoader();
  const films = useMemo(() => (primaryData[0] as Namespace_Tmdb.Prefabs_Obj).now_playing.results, [primaryData]);

  /** @JSX */
  return (
    <div
      className='fdAccount'
      data-layout-carousel>
      <div
        className='fdAccount__container'
        ref={accountRef}
        data-visible='false'>
        <main className='fdAccount__container__wrapper'>
          <form className='fdAccount__container__wrapper__form'>
            <FDAccountFieldset />
          </form>
        </main>
        <FDAccountModalPoster films={films} />
      </div>
    </div>
  );
});

export default FDAccountModal;
