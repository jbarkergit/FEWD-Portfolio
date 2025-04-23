import { type JSX, useMemo } from 'react';
import { IcBaselinePlus } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

const FDCollectionsCollectionUl = ({
  mapIndex,
  data,
  display,
  isEditMode,
  ulRef,
}: {
  mapIndex: number;
  data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
  display: string;
  isEditMode: boolean;
  ulRef: React.RefObject<HTMLUListElement | null>;
}) => {
  // Dynamic integer limitation of list items in a carousel
  const { viewportChunkSize } = useCatalogProvider();

  /**
   * @function ListItem @returns {JSX.Element}
   * @function EmptyListItem @returns {JSX.Element}
   * @function buildJSX @returns {JSX.Element[]}
   * @description Simplifies otherwise convoluted JSX mappings, allows for stable dom manipulation
   */
  const ListItem = ({ movie, index }: { movie: Namespace_Tmdb.BaseMedia_Provider; index: number }): JSX.Element => {
    return (
      <li data-list-item-visible={index === 0 ? 'true' : 'false'}>
        <picture>{movie && <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={`${movie.title}`} fetchPriority={'high'} />}</picture>
      </li>
    );
  };

  const EmptyListItem = (): JSX.Element => {
    return (
      <div>
        <span />
        <IcBaselinePlus />
      </div>
    );
  };

  const buildJSX = useMemo((): JSX.Element[] => {
    // If data has list items
    if (data && data.length > 0) {
      // Create new array of list items with data
      let initMap = data.map((movie, index) => <ListItem movie={movie} index={index} key={`collection-${mapIndex}-listItem-${index}`} />);

      // If initMap's length is greater than or equal to viewportChunkSize, return initMap
      if (initMap.length + 1 >= viewportChunkSize) {
        initMap.push(<EmptyListItem key={`collection-${mapIndex}-emptyListItem-${initMap.length + 1}`} />);
        return initMap;
      }

      // If initMap isn't at least the length of viewportChunkSize, push empty lists
      for (let i = 0; i < viewportChunkSize; i++) {
        let listAtIndex = initMap[i];
        if (!listAtIndex) initMap.push(<EmptyListItem key={`collection-${mapIndex}-emptyListItem-${initMap.length + i + 1}`} />);
      }

      // Else return initMap
      return initMap;
    }

    // If data is empty
    const EmptyList = Array.from({ length: viewportChunkSize }).map((eli, index) => <EmptyListItem key={`collection-${mapIndex}-emptyListItem-${index}`} />);
    return EmptyList;
  }, [data]);

  return (
    <ul ref={ulRef} data-layout={display} data-list-item-fx='true' data-edit-mode={isEditMode}>
      {buildJSX}
    </ul>
  );
};

export default FDCollectionsCollectionUl;
