import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { TablerCategoryFilled } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

type Props = {
  mapIndex: number;
  header: string;
  setCarousels: Dispatch<
    SetStateAction<
      {
        header: string;
        data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
        display: 'flex' | 'grid';
      }[]
    >
  >;
};

const FDCollectionsCollectionHeader = ({ mapIndex, header, setCarousels }: Props) => {
  return (
    <header>
      <TablerCategoryFilled />
      <h2>
        <input
          type='text'
          value={header.length > 0 ? header : 'Unnamed Collection'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCarousels((state) => {
              return state.map((col, index) => {
                return index === mapIndex ? { ...col, header: event.target.value } : col;
              });
            });
          }}
        />
      </h2>
    </header>
  );
};

export default FDCollectionsCollectionHeader;
