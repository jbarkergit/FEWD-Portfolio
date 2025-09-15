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
  const hasHitCollectionLimit: boolean = Object.keys(userCollections).length >= 5;
  if (hasHitCollectionLimit) return;

  const key: string = `user-collection-${payload.colIndex}`;

  setUserCollections((s) => {
    const target = s[key];

    return {
      ...s,
      [key]: {
        header: target?.header ?? 'New Collection',
        data: target?.data && payload.data ? [...target.data, ...payload.data] : payload.data ? [...payload.data] : [],
      },
    };
  });
};
