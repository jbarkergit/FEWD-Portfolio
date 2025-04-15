import { useEffect, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { TablerCategoryFilled } from '~/film-database/assets/svg/icons';
import type { User_Collection } from './FDCollections';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

type Props = {
  mapIndex: number;
  header: string;
  carousels: Record<string, User_Collection>;
  setCarousels: Dispatch<SetStateAction<Record<string, User_Collection>>>;
};

const FDCollectionsCollectionHeader = ({ mapIndex, header, carousels, setCarousels }: Props) => {
  const [inputValue, setInputValue] = useState(carousels[Object.keys(carousels)[mapIndex]]?.header || 'Uncategorized Movies');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { isMovieModal } = useCatalogProvider();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    // Clear the previous timeout
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Set a new timeout to delay the update
    const timeout = setTimeout(() => {
      const key = Object.keys(carousels)[mapIndex];
      if (!key) return;

      setCarousels((prevCarousels: any) => {
        const updatedCarousels = { ...prevCarousels };

        updatedCarousels[key] = {
          ...updatedCarousels[key],
          header: event.target.value,
        };

        return updatedCarousels;
      });
    }, 1500);

    debounceTimeout.current = timeout;
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [debounceTimeout]);

  // useEffect(() => {
  //   if (!isMovieModal) {
  //     const key = Object.keys(carousels)[mapIndex];
  //     if (!key) return;

  //     setCarousels((prevCarousels: any) => {
  //       const updatedCarousels = { ...prevCarousels };
  //       updatedCarousels[key] = {
  //         ...updatedCarousels[key],
  //         header: inputValue,
  //       };
  //       return updatedCarousels;
  //     });
  //   }
  // }, [isMovieModal]);

  return (
    <header>
      <TablerCategoryFilled />
      <h2>
        <input type='text' value={header.length > 0 ? inputValue : 'Unnamed Collection'} onChange={handleInputChange} />
      </h2>
    </header>
  );
};

export default FDCollectionsCollectionHeader;
