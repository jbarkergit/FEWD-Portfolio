import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useUserCollection } from '~/film-database/context/UserCollectionContext';

const Context = createContext<
  | {
      modalTrailer: TmdbMovieProvider | undefined;
      setModalTrailer: Dispatch<SetStateAction<TmdbMovieProvider | undefined>>;
    }
  | undefined
>(undefined);

export const TrailerQueueProvider = ({ children }: { children: ReactNode }) => {
  const [modalTrailer, setModalTrailer] = useState<TmdbMovieProvider | undefined>(undefined);
  const { userCollections } = useUserCollection();

  useEffect(() => {
    /**
     * Sets the modal trailer data for the featured media item.
     */
    const handleModalTrailerQueue = (): void => {
      if (userCollections) {
        const collection = userCollections['user-collection-0'];
        if (!collection) return;

        const data = collection.data;
        if (!data) return;

        setModalTrailer(data[0]);
      }
    };
    handleModalTrailerQueue();
  }, [userCollections]);

  return <Context.Provider value={{ modalTrailer, setModalTrailer }}>{children}</Context.Provider>;
};

export const useModalTrailer = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume TrailerQueue.');
  return context;
};
