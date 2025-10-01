import { forwardRef, type JSX, type RefObject, useMemo } from 'react';
import { IcBaselinePlus } from '~/film-database/assets/svg/icons';
import type { Sensor } from '~/film-database/features/catalog/modals/collections/FDCollectionsCollection';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useVisibleCountContext } from '~/film-database/context/VisibleCountContext';

type Props = {
  mapIndex: number;
  data: TmdbMovieProvider[] | null;
  isEditMode: boolean;
  sensorRef: RefObject<Sensor>;
};

const EmptyListItem = (): JSX.Element => {
  return (
    <div>
      <span />
      <IcBaselinePlus />
    </div>
  );
};

const FDCollectionsCollectionUl = forwardRef<HTMLUListElement, Props>(
  ({ mapIndex, data, isEditMode, sensorRef }, ulRef) => {
    // Dynamic integer limitation of list items in a carousel
    const { visibleCount } = useVisibleCountContext();

    /**
     * @function ListItem @returns {JSX.Element}
     * @function EmptyListItem @returns {JSX.Element}
     * @function buildJSX @returns {JSX.Element[]}
     * @description Simplifies otherwise convoluted JSX mappings, allows for stable dom manipulation
     */
    const ListItem = ({ movie, index }: { movie: TmdbMovieProvider; index: number }): JSX.Element => {
      return (
        <li
          data-list-item-visible={index === 0 ? 'true' : 'false'}
          role='option'
          aria-grabbed={sensorRef.current.isInteract ? 'true' : 'false'}>
          <picture>
            {movie && (
              <img
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                alt={`${movie.title}`}
                fetchPriority={'high'}
              />
            )}
          </picture>
        </li>
      );
    };

    const buildJSX = useMemo((): JSX.Element[] => {
      // If data has list items
      if (data && data.length > 0) {
        // Create new array of list items with data
        let initMap = data.map((movie, index) => (
          <ListItem
            movie={movie}
            index={index}
            key={`collection-${mapIndex}-listItem-${index}`}
          />
        ));

        // If initMap's length is greater than or equal to visibleCount, return initMap
        if (initMap.length + 1 >= visibleCount.modal) {
          initMap.push(<EmptyListItem key={`collection-${mapIndex}-emptyListItem-${initMap.length + 1}`} />);
          return initMap;
        }

        // If initMap isn't at least the length of visibleCount, push empty lists
        for (let i = 0; i < visibleCount.modal; i++) {
          let listAtIndex = initMap[i];
          if (!listAtIndex)
            initMap.push(<EmptyListItem key={`collection-${mapIndex}-emptyListItem-${initMap.length + i + 1}`} />);
        }

        // Else return initMap
        return initMap;
      } else {
        // If data is empty
        const EmptyList = Array.from({ length: visibleCount.modal + 1 }).map((eli, index) => (
          <EmptyListItem key={`collection-${mapIndex}-emptyListItem-${index}`} />
        ));
        return EmptyList;
      }
    }, [data, visibleCount.modal]);

    return (
      <ul
        ref={ulRef}
        data-list-item-fx='true'
        data-edit-mode={isEditMode}
        aria-label='Reorderable list of movies'
        role='listbox'>
        {buildJSX}
      </ul>
    );
  }
);

export default FDCollectionsCollectionUl;
