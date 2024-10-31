// Deps
import { RefObject, useState } from 'react';
// Provider
import { LayoutProvider } from '../context/LayoutProvider';
// Composable Types
import { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
// Features
import FDAccountBackground from '../features/account/background/FDAccountBackground';
import FDAccount from '../features/account/modal/FDAccount';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  const [responseSets, setResponseSets] = useState<Namespace_Tmdb.Response_Union[][]>([]);

  return (
    <LayoutProvider>
      <FDAccountBackground responseSets={responseSets} setResponseSets={setResponseSets} />
      <FDAccount rootRef={rootRef} />
    </LayoutProvider>
  );
};

export default FDUserAccount;
