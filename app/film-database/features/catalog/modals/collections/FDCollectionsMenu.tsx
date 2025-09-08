import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { TablerCategoryPlus, TablerEdit, MaterialSymbolsLogoutSharp } from '~/film-database/assets/svg/icons';
import { useModal } from '~/film-database/context/ModalContext';
import { useUserCollection } from '~/film-database/context/UserCollectionContext';
import { addUserCollection } from '~/film-database/hooks/addUserCollection';

type Props = {
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
};

const FDCollectionsMenu = ({ isEditMode, setIsEditMode }: Props) => {
  const { userCollections, setUserCollections } = useUserCollection();
  const { setIsModal } = useModal();
  const editBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (editBtnRef.current) {
      editBtnRef.current.setAttribute('data-toggle', String(isEditMode));
    }
  }, [isEditMode]);

  /** @returns */
  return (
    <div className='fdCollectionsMenu'>
      <button
        className='fdCollectionsMenu--collection'
        aria-label='Create new list'
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
        ref={editBtnRef}
        className='fdCollectionsMenu--edit'
        aria-label='Switch to edit mode'
        data-toggle='false'
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
};

export default FDCollectionsMenu;
