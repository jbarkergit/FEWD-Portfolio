import { forwardRef } from 'react';
import { IcBaselineError } from '~/film-database/assets/svg/icons';

const FDCollectionsErrorHandler = forwardRef<HTMLDivElement, {}>(({}, errorRef) => {
  return (
    <div
      className='fdCollectionsErrorHandler'
      ref={errorRef}
      data-error='false'>
      <div>
        <IcBaselineError /> Collection contains this movie
      </div>
    </div>
  );
});
export default FDCollectionsErrorHandler;
