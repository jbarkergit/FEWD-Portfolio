// Deps
import { RefObject } from 'react';
// Provider
import { LayoutProvider } from '../context/LayoutProvider';
// Features
import FDAccountBackground from '../features/account/background/FDAccountBackground';
import FDAccount from '../features/account/modal/FDAccount';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  return (
    <LayoutProvider>
      <FDAccountBackground />
      <FDAccount rootRef={rootRef} />
    </LayoutProvider>
  );
};

export default FDUserAccount;
