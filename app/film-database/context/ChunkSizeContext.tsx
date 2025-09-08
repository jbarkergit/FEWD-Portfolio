import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRootRef } from '~/film-database/context/RootRefContext';

const Context = createContext<
  | {
      chunkSize: Record<'viewport' | 'modal', number>;
      setChunkSize: React.Dispatch<React.SetStateAction<Record<'viewport' | 'modal', number>>>;
    }
  | undefined
>(undefined);

export const ChunkSizeProvider = ({ children }: { children: ReactNode }) => {
  const [chunkSize, setChunkSize] = useState<Record<'viewport' | 'modal', number>>({ viewport: 2, modal: 2 });
  const { root } = useRootRef();

  useEffect(() => {
    /**
     * Determines the number of carousel items based on the viewport or modal size.
     * This ensures that the carousel adapts to variable screen sizes within their feature.
     */
    const getDynamicChunkSize = (): void => {
      if (!root.current) return;

      const styles: CSSStyleDeclaration = getComputedStyle(root.current);

      function getQuantity(value: string): number {
        return parseInt(styles.getPropertyValue(value).trim());
      }

      const carouselQuantity: number = getQuantity('--fd-carousel-items-per-page');
      const collectionQuantity: number = getQuantity('--fd-collection-items-per-page');

      setChunkSize({
        viewport: isNaN(carouselQuantity) ? 2 : carouselQuantity,
        modal: isNaN(collectionQuantity) ? 2 : collectionQuantity,
      });
    };

    getDynamicChunkSize();
    window.addEventListener('resize', getDynamicChunkSize);
    return () => window.removeEventListener('resize', getDynamicChunkSize);
  }, []);

  return <Context.Provider value={{ chunkSize, setChunkSize }}>{children}</Context.Provider>;
};

export const useChunkSize = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ChunkSize.');
  return context;
};
