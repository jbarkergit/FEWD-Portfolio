import type { Dispatch, SetStateAction } from 'react';
import type { UserCollection } from '~/film-database/context/UserCollectionContext';

/**
 * @function addCollection
 * Adds new collection to carousels state
 */
type Params = {
  userCollections: Record<string, UserCollection>;
  setUserCollections: Dispatch<SetStateAction<Record<string, UserCollection>>>;
  isEditMode: boolean;
  payload: {
    data: UserCollection['data'] | undefined;
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

  const key: string = `user-collection-${payload.colIndex}`;
  // const display: 'grid' | 'flex' = isEditMode ? 'grid' : 'flex';
  const display = 'flex' as const;
  const header: string = userCollections[payload.colIndex]?.header ?? 'Unnamed Collection';

  setUserCollections((prev) => {
    const existing = prev[key];
    if (!existing) return prev;

    return {
      ...prev,
      [key]: {
        ...existing,
        header,
        display,
        data: payload?.data ? [...(existing.data ?? []), ...payload.data] : (existing.data ?? []),
      },
    };
  });
};
