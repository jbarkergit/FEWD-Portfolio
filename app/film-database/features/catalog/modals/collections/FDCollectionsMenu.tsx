import { useEffect, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import {
  TablerCategoryPlus,
  TablerEdit,
  TablerEye,
  TablerEyeOff,
  MaterialSymbolsLogoutSharp,
} from '~/film-database/assets/svg/icons';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { addUserCollection } from '~/film-database/hooks/addUserCollection';

type Props = {
  collectionRefs: RefObject<HTMLElement[]>;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  isListFX: boolean;
  setIsListFX: React.Dispatch<React.SetStateAction<boolean>>;
};

const FDCollectionsMenu = ({ collectionRefs, isEditMode, setIsEditMode, isListFX, setIsListFX }: Props) => {
  const { userCollections, setUserCollections, setIsModal } = useCatalogProvider();

  const [collectionUls, setCollectionUls] = useState<HTMLUListElement[]>([]);

  // const [layoutType, setLayoutType] = useState<'flex' | 'grid'>('flex');

  const editModeBtn = useRef<HTMLButtonElement>(null),
    listItemFxBtn = useRef<HTMLButtonElement>(null),
    layoutTypeBtn = useRef<HTMLButtonElement>(null);

  /**
   * @function toggleBtn
   * Toggles the primary/secondary svg for the desired button
   * Typically utilizes e.currentTarget as param, but we've constructed it with more control via refs
   */
  const toggleBtn = (button: HTMLButtonElement | null, state: boolean): void => {
    if (button) button.setAttribute('data-toggle', String(state));
  };

  /**
   * @function setCollectionUls
   * @returns {HTMLUListElement[] | undefined}
   * Reduces computations for dependant functions
   */
  useEffect(() => {
    if (!collectionRefs.current) return;

    const uls: HTMLUListElement[] = [];

    for (const collection of collectionRefs.current) {
      if (!collection) continue;
      const divElement = collection.querySelector('div');
      const ulElement = divElement?.querySelector('ul') as HTMLUListElement | null;
      if (ulElement) uls.push(ulElement);
    }

    setCollectionUls(uls);
  }, [collectionRefs.current]);

  /**
   * @function useEffect
   * Toggles modes when corresponding state is altered
   */
  useEffect(() => {
    if (!collectionUls) return;

    toggleBtn(editModeBtn.current, !isEditMode);
    toggleBtn(listItemFxBtn.current, !isListFX);
    // toggleBtn(layoutTypeBtn.current, layoutType === 'flex');

    for (const ul of collectionUls) {
      // ul.setAttribute('data-layout', layoutType);
      ul.setAttribute('data-list-item-fx', String(isListFX));
    }
  }, [
    isEditMode,
    isListFX,
    // layoutType,
    collectionUls,
  ]);

  /** @returns */
  return (
    <div className='fdCollectionsMenu'>
      <button
        className='fdCollectionsMenu--collection'
        aria-label='Create new list'
        data-toggle='true'
        onPointerUp={() =>
          addUserCollection({
            userCollections,
            setUserCollections,
            isEditMode: isEditMode,
            payload: {
              data: undefined,
              colIndex: Object.keys(userCollections).length + 1,
            },
          })
        }>
        <TablerCategoryPlus />
      </button>
      <button
        ref={editModeBtn}
        className='fdCollectionsMenu--edit'
        aria-label='Switch to edit mode'
        data-toggle='true'
        onPointerUp={() => setIsEditMode((state) => !state)}>
        <TablerEdit />
      </button>
      <button
        ref={listItemFxBtn}
        className='fdCollectionsMenu--visibility'
        aria-label='Lower visibility of unselected movies'
        data-toggle='false'
        onPointerUp={() => setIsListFX((state) => !state)}>
        <TablerEye />
        <TablerEyeOff />
      </button>
      {/* <button
        ref={layoutTypeBtn}
        className='fdCollectionsMenu--layout'
        aria-label={layoutType === 'grid' ? 'Collapse view all lists' : 'Expand view of all lists'}
        data-toggle='true'
        onPointerUp={() =>
          setLayoutType((state) => {
            return state === 'flex' ? 'grid' : 'flex';
          })
        }>
        <TablerLayoutDashboardFilled />
        <TablerLayoutListFilled />
      </button> */}
      <button
        className='fdCollectionsMenu--close'
        aria-label='Close collections modal'
        onPointerUp={() => setIsModal(undefined)}>
        <MaterialSymbolsLogoutSharp />
      </button>
    </div>
  );
};

export default FDCollectionsMenu;
