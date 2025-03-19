import { useEffect, useRef, useState, type Dispatch, type PointerEvent } from 'react';
import {
  TablerCategoryPlus,
  TablerEdit,
  TablerLayoutListFilled,
  TablerLayoutDashboardFilled,
  TablerEye,
  TablerEyeOff,
} from '~/film-database/assets/google-material-symbols/GoogleMaterialIcons';

const FDMovieListMenu = ({
  collectionRefs,
  addCollection,
  setIsEdit,
}: {
  collectionRefs: React.RefObject<HTMLElement[]>;
  addCollection: () => void;
  setIsEdit: Dispatch<React.SetStateAction<boolean>>;
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
          addCollection();
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
          toggleButtonVisibility(event.currentTarget as HTMLButtonElement);
          setIsGrid((state) => {
            return !state;
          });
        }}>
        <TablerLayoutListFilled />
        <TablerLayoutDashboardFilled />
      </button>
    </div>
  );
};

export default FDMovieListMenu;
