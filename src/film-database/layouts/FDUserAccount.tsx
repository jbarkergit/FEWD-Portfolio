// Deps
import { RefObject, useState } from 'react';
// Composable Types
import { Type_Tmdb_Api_Union } from '../composables/tmdb-api/types/TmdbDataTypes';
// Features
import FDAccountBackground from '../features/account/background/FDAccountBackground';
import FDAccount from '../features/account/modal/FDAccount';

type Type_PropDrill = {
  rootRef: RefObject<HTMLDivElement>;
};

const FDUserAccount = ({ rootRef }: Type_PropDrill) => {
  const [responseSets, setResponseSets] = useState<Type_Tmdb_Api_Union[][]>([]);

  return (
    <>
      <FDAccountBackground responseSets={responseSets} setResponseSets={setResponseSets} />
      <FDAccount rootRef={rootRef} />
    </>
  );
};

export default FDUserAccount;
