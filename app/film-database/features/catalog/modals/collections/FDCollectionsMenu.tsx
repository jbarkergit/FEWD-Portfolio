import { forwardRef, type Dispatch, type SetStateAction } from 'react';
import { TablerCategoryPlus, TablerEdit, MaterialSymbolsLogoutSharp } from '~/film-database/assets/svg/icons';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { addUserCollection } from '~/film-database/hooks/addUserCollection';

type Props = {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
};

const FDCollectionsMenu = forwardRef<HTMLButtonElement, Props>(({ isEditMode, setIsEditMode }, ref) => {
  const { userCollections, setUserCollections, setIsModal } = useCatalogProvider();

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
        ref={ref}
        className='fdCollectionsMenu--edit'
        aria-label='Switch to edit mode'
        data-toggle='true'
        onPointerUp={() => setIsEditMode((state) => !state)}>
        <TablerEdit />
      </button>
      <button
        className='fdCollectionsMenu--close'
        aria-label='Close collections modal'
        onPointerUp={() => setIsModal(undefined)}>
        <MaterialSymbolsLogoutSharp />
      </button>
    </div>
  );
});

export default FDCollectionsMenu;
