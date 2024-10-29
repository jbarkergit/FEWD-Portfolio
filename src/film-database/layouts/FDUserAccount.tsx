// Deps
import { RefObject, useState } from 'react';
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
    <>
      <FDAccountBackground responseSets={responseSets} setResponseSets={setResponseSets} />
      <FDAccount rootRef={rootRef} />
    </>
  );
};

export default FDUserAccount;
