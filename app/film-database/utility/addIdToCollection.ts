import type { Dispatch, SetStateAction } from 'react';
import { type UserCollection } from '~/film-database/context/UserCollectionContext';

type Payload = {
  data: UserCollection['data'] | undefined;
  colIndex: number;
};

export const addIdToCollection = (
  userCollections: Record<string, UserCollection>,
  setUserCollections: Dispatch<SetStateAction<Record<string, UserCollection>>>,
  payload: Payload
): void => {
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
