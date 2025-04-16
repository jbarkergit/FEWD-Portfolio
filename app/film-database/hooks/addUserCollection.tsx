import { useCatalogProvider, type User_Collection } from '../context/CatalogContext';

/**
 * @function addCollection
 * Adds new collection to carousels state
 */

type Params = {
  userCollections: Record<string, User_Collection>;
  setUserCollections: React.Dispatch<React.SetStateAction<Record<string, User_Collection>>>;
  isEditMode: boolean;
};

export const addUserCollection = (
  userCollections: Params['userCollections'],
  setUserCollections: Params['setUserCollections'],
  isEditMode: Params['isEditMode']
): void => {
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
