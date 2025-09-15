import { useUserCollection, type UserCollection } from '~/film-database/context/UserCollectionContext';

export const useNewUserCollectionEntry = (payload: {
  data: UserCollection['data'] | undefined;
  colIndex: number;
}): void => {
  const { userCollections, setUserCollections } = useUserCollection();

  if (Object.keys(userCollections).length >= 5) return;

  const key: string = `user-collection-${payload.colIndex}`;
  const header: string = userCollections[payload.colIndex]?.header ?? 'Unnamed Collection';

  setUserCollections((prev) => {
    const existing = prev[key];
    if (!existing) return prev;

    return {
      ...prev,
      [key]: {
        ...existing,
        header,
        data: payload?.data ? [...(existing.data ?? []), ...payload.data] : (existing.data ?? []),
      },
    };
  });
};
