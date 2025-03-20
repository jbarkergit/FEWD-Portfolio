import { useEffect, useState, type Dispatch, type PointerEvent, type SetStateAction } from 'react';
import { TablerCategoryPlus, TablerEdit, TablerLayoutListFilled, TablerLayoutDashboardFilled, TablerEye, TablerEyeOff } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

const FDMovieListMenu = ({
  collectionRefs,
  isEdit,
  setIsEdit,
  carousels,
  setCarousels,
}: {
  collectionRefs: React.RefObject<HTMLElement[]>;
  isEdit: boolean;
  setIsEdit: Dispatch<React.SetStateAction<boolean>>;
  carousels: {
    header: string;
    data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
    display: 'flex' | 'grid';
  }[];
  setCarousels: Dispatch<SetStateAction<typeof carousels>>;
}) => {
  const [isOpacity, setIsOpacity] = useState<boolean>(false);
  const [isGrid, setIsGrid] = useState<boolean>(false);

  /** Toggle button */
  const toggleButtonVisibility = (element: HTMLElement): void => {
    element.setAttribute('data-toggle', element.getAttribute('data-toggle') === 'true' ? 'false' : 'true');
  };

  /**
   * function @toggleOpacities
   * Enable data-attribute to visually indicate that collection items can be edited
   */
  const toggleOpacities = (): void => {
    if (collectionRefs.current) {
      for (const collection of collectionRefs.current) {
        (Array.from(collection.children)[1] as HTMLUListElement).setAttribute('data-edit', String(isOpacity));
      }
    }
  };

  useEffect(() => toggleOpacities(), [isOpacity]);

  /**
   * @function toggleAllLayouts
   * Iterates collectionRefs (lists), applies data-attribute prop to 'flex' or 'grid'
   */
  const toggleAllLayouts = (): void => {
    if (collectionRefs.current) {
      for (const collection of collectionRefs.current) {
        (Array.from(collection.children)[1] as HTMLUListElement).setAttribute('data-layout', isGrid ? 'grid' : 'flex');
      }
    }
  };

  useEffect(() => toggleAllLayouts(), [isGrid]);

  return (
    <div className='fdUserList__menu'>
      <button
        aria-label='Create new list'
        data-toggle='true'
        onPointerUp={(event: PointerEvent) => {
          toggleButtonVisibility(event.currentTarget as HTMLButtonElement);
          if (carousels.length < 6) setCarousels((state) => [...state, { data: undefined, display: 'flex', header: 'Unnamed Collection' }]);
        }}>
        <TablerCategoryPlus />
      </button>
      <button
        aria-label='Switch to edit mode'
        data-toggle='true'
        onPointerUp={(event: PointerEvent) => {
          toggleButtonVisibility(event.currentTarget as HTMLButtonElement);
          setIsOpacity(true);
          setIsEdit((state) => !state);
        }}>
        <TablerEdit />
      </button>
      <button
        aria-label='Lower visibility of unselected movies'
        data-toggle='true'
        onPointerUp={(event: PointerEvent) => {
          toggleButtonVisibility(event.currentTarget as HTMLButtonElement);
          setIsOpacity((state) => !state);
        }}>
        <TablerEye />
        <TablerEyeOff />
      </button>
      <button
        aria-label={isGrid ? 'Collapse view all lists' : 'Expand view of all lists'}
        data-toggle='true'
        onPointerUp={(event: PointerEvent) => {
          if (!isEdit) {
            toggleButtonVisibility(event.currentTarget as HTMLButtonElement);
            setIsGrid((state) => {
              return !state;
            });
          }
        }}>
        <TablerLayoutListFilled />
        <TablerLayoutDashboardFilled />
      </button>
    </div>
  );
};

export default FDMovieListMenu;
