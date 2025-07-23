import { forwardRef, useMemo } from 'react';
import FDAccountModalPoster from './features/FDAccountModalPoster';
import FDAccountFieldset from './fieldsets/FDAccountFieldset';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

const FDAccountModal = forwardRef<HTMLDivElement, {}>(({}, accountRef) => {
  /** @loaderData */
  const { primaryData } = useFLoader();
  const films = useMemo(() => primaryData[0]?.response.results, [primaryData[0]]);

  /** @JSX */
  if (films)
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
