import { useEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import { TablerCategoryPlus, TablerEdit, TablerLayoutListFilled, TablerLayoutDashboardFilled, TablerEye, TablerEyeOff } from '~/film-database/assets/svg/icons';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

type Props = {
  collectionRefs: RefObject<HTMLElement[]>;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
};

const FDCollectionsMenu = ({ collectionRefs, isEditMode, setIsEditMode }: Props) => {
  const { userCollections, setUserCollections } = useCatalogProvider();
  const [isListFX, setIsListFX] = useState<boolean>(true);
  const [layoutType, setLayoutType] = useState<'flex' | 'grid'>('flex');

  /**
   * @function addCollection
   * Adds new collection to carousels state
   */
  const addCollection = (): void => {
    if (Object.keys(userCollections).length < 4) {
      setUserCollections((prevCarousels) => ({
        ...prevCarousels,
        [`user-collection-${Object.entries(prevCarousels).length + 1}`]: {
          header: 'Uncategorized Movies',
          data: undefined,
          display: isEditMode ? 'grid' : 'flex',
        },
      }));
    }
  };

  /**
   * @function toggleBtn
   * Toggles the primary/secondary svg for the desired button
   * Typically utilizes e.currentTarget as param, but we've constructed it with more control via refs
   */
  const editModeBtn = useRef<HTMLButtonElement>(null),
    listItemFxBtn = useRef<HTMLButtonElement>(null),
    layoutTypeBtn = useRef<HTMLButtonElement>(null);

  const toggleBtn = (btnRef: 'editMode' | 'listItemFx' | 'layoutType', isDefaultSVG?: boolean): void => {
    let btn: HTMLButtonElement | null =
      btnRef === 'editMode' ? editModeBtn.current : btnRef === 'listItemFx' ? listItemFxBtn.current : btnRef === 'layoutType' ? layoutTypeBtn.current : null;

    if (btn instanceof HTMLButtonElement) {
      btn.setAttribute('data-toggle', isDefaultSVG ? String(isDefaultSVG) : btn.getAttribute('data-toggle') === 'true' ? 'false' : 'true');
    }
  };

  /**
   * @function toggleListItemFX
   * Enable/disable attribute data-list-item-fx
   */
  const toggleListItemFX = (boolean: boolean): void => {
    if (collectionRefs.current) {
      for (const collection of collectionRefs.current) {
        (Array.from(collection.children)[1] as HTMLUListElement).setAttribute('data-list-item-fx', String(boolean));
      }
    }
  };

  /**
   * @function toggleListItemFX
   * Enable/disable attribute data-layout
   */
  const toggleLayoutType = (type: 'flex' | 'grid'): void => {
    if (collectionRefs.current) {
      for (const collection of collectionRefs.current) {
        (Array.from(collection.children)[1] as HTMLUListElement).setAttribute('data-layout', type);
      }
    }
  };

  // Handle Edit Mode
  const handleEditMode = (): void => {
    // Toggle the buttons for editMode, listItemFx, and layoutType
    toggleBtn('editMode');
    toggleBtn('listItemFx');
    toggleBtn('layoutType');

    // Apply list item effects and layout type based on editMode
    if (isEditMode) {
      // When in edit mode, enable list item effects and set layout to grid
      toggleListItemFX(false);
      toggleLayoutType('grid');
    } else {
      // When not in edit mode, reset list item effects and set layout to flex
      toggleListItemFX(isListFX);
      toggleLayoutType(layoutType);
    }
  };

  // Handle List FX
  const handleListFX = (): void => {
    toggleBtn('listItemFx');
    toggleListItemFX(isListFX);
  };

  // Handle Layout Type
  const handleLayoutType = (): void => {
    toggleBtn('layoutType');
    toggleLayoutType(layoutType);
  };

  // Use Effects for state changes
  useEffect(() => handleEditMode(), [isEditMode]);
  useEffect(() => handleListFX(), [isListFX]);
  useEffect(() => handleLayoutType(), [layoutType]);

  return (
    <div className='fdCollectionsMenu'>
      <button aria-label='Create new list' data-toggle='true' onPointerUp={() => addCollection()}>
        <TablerCategoryPlus />
      </button>
      <button ref={editModeBtn} aria-label='Switch to edit mode' data-toggle='true' onPointerUp={() => setIsEditMode((state) => !state)}>
        <TablerEdit />
      </button>
      <button ref={listItemFxBtn} aria-label='Lower visibility of unselected movies' data-toggle='false' onPointerUp={() => setIsListFX((state) => !state)}>
        <TablerEye />
        <TablerEyeOff />
      </button>
      <button
        ref={layoutTypeBtn}
        aria-label={layoutType === 'grid' ? 'Collapse view all lists' : 'Expand view of all lists'}
        data-toggle='true'
        onPointerUp={() =>
          setLayoutType((state) => {
            return state === 'flex' ? 'grid' : 'flex';
          })
        }>
        <TablerLayoutListFilled />
        <TablerLayoutDashboardFilled />
      </button>
    </div>
  );
};

export default FDCollectionsMenu;
