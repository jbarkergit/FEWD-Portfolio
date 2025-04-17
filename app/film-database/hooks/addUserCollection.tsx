import type { Dispatch, SetStateAction } from 'react';
import { type User_Collection } from '../context/CatalogContext';

/**
 * @function addCollection
 * Adds new collection to carousels state
 */
type Params = {
  userCollections: Record<string, User_Collection>;
  setUserCollections: Dispatch<SetStateAction<Record<string, User_Collection>>>;
  isEditMode: boolean;
  payload?: {
    data: User_Collection['data'];
    colIndex: number;
  };
};

// export const addUserCollection = ({ userCollections, setUserCollections, isEditMode, payload }: Params): void => {
//   if (Object.keys(userCollections).length >= 5) return;

//   const index = payload?.colIndex ?? Object.keys(userCollections).length + 1;
//   const key = `user-collection-${index}`;
//   const newHeader = 'Uncategorized Movies';
//   const newDisplay: 'grid' | 'flex' = isEditMode ? 'grid' : 'flex';

//   if (payload && userCollections[index]) {
//     // Append to existing collection
//     setUserCollections((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         data: [...(prev[key].data ?? []), ...payload.data!],
//       },
//     }));
//   } else if (payload) {
//     // Create new collection with payload data
//     setUserCollections((prev) => ({
//       ...prev,
//       [key]: {
//         header: newHeader,
//         data: [...payload.data!],
//         display: newDisplay,
//       },
//     }));
//   } else {
//     // Create new empty collection
//     setUserCollections((prev) => ({
//       ...prev,
//       [key]: {
//         header: newHeader,
//         data: undefined,
//         display: newDisplay,
//       },
//     }));
//   }
// };

export const addUserCollection = ({ userCollections, setUserCollections, isEditMode, payload }: Params): void => {
  if (Object.keys(userCollections).length >= 5) return;

  const index: number = payload?.colIndex ?? Object.keys(userCollections).length + 1;
  const key: string = `user-collection-${index}`;
  const display = isEditMode ? 'grid' : 'flex';
  const header: string = userCollections[index]?.header ?? ('Uncategorized Movies' as const);

  setUserCollections((prev) => {
    const existing = prev[key];
    const newData = payload?.data ? [...(existing?.data ?? []), ...payload.data] : undefined;

    return {
      ...prev,
      [key]: {
        ...existing,
        header,
        display,
        data: newData,
      },
    };
  });
};
