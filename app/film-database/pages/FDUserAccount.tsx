// Deps
import type { RefObject } from 'react';
// Features
import FDAccountBackground from '../features/account/background/FDAccountBackground';
import FDAccount from '../features/account/modal/FDAccount';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  return (
    <div className='fdUserAccount'>
      <FDAccountBackground />
      <FDAccount rootRef={rootRef} />
    </div>
  );
};

export default FDUserAccount;
