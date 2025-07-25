import { forwardRef } from 'react';
import FDAccountModalPoster from './features/FDAccountModalPoster';
import FDAccountFieldset from './fieldsets/FDAccountFieldset';

const FDAccountModal = forwardRef<HTMLDivElement, {}>(({}, accountRef) => {
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
        <FDAccountModalPoster />
      </div>
    </div>
  );
});

export default FDAccountModal;
