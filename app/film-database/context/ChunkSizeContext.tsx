import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { useRootRef } from '~/film-database/context/RootRefContext';

type ChunkSize = { viewport: number; modal: number };

const DEFAULT_CHUNK_SIZE: ChunkSize = { viewport: 2, modal: 2 };

const Context = createContext<
  | {
      chunkSize: ChunkSize;
      setChunkSize: Dispatch<SetStateAction<ChunkSize>>;
    }
  | undefined
>(undefined);

export const ChunkSizeProvider = ({ children }: { children: ReactNode }) => {
  const [chunkSize, setChunkSize] = useState(DEFAULT_CHUNK_SIZE);
  const { root } = useRootRef();

  useEffect(() => {
    /**
     * Determines the number of carousel items based on the viewport or modal size.
     * This ensures that the carousel adapts to variable screen sizes within their feature.
     */
    const updateChunkSize = () => {
      if (!root.current) return;

      const styles = getComputedStyle(root.current);
      const viewport = Number(styles.getPropertyValue('--fd-carousel-items-per-page')) || DEFAULT_CHUNK_SIZE.viewport;
      const modal = Number(styles.getPropertyValue('--fd-collection-items-per-page')) || DEFAULT_CHUNK_SIZE.modal;

      setChunkSize({ viewport, modal });
    };

    updateChunkSize();
    window.addEventListener('resize', updateChunkSize);
    return () => window.removeEventListener('resize', updateChunkSize);
  }, [root]);

  return <Context.Provider value={{ chunkSize, setChunkSize }}>{children}</Context.Provider>;
};

export const useChunkSize = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ChunkSize.');
  return context;
};
