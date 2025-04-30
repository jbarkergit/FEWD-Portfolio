import { useRef, useState } from 'react';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import FDCollectionsModalCollection from './FDCollectionsCollection';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

const FDCollections = () => {
  const { userCollections } = useCatalogProvider();

  // User collections edit mode (Hoisted)
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Reference of all collections
  const collectionRefs = useRef<HTMLElement[]>([]);

  const collectionRef = (reference: HTMLUListElement): void => {
    if (reference && !collectionRefs.current.includes(reference)) {
      collectionRefs.current.push(reference);
    }
  };

  return (
    <>
      <section className='fdCollections'>
        {Object.values(userCollections).map(({ header, data, display }, index) => (
          <FDCollectionsModalCollection
            key={`user-collections-collection-${index}`}
            mapIndex={index}
            header={header}
            data={data}
            display={display}
            ref={collectionRef}
            collectionRefs={collectionRefs}
            isEditMode={isEditMode}
          />
        ))}
      </section>
      <FDCollectionsModalMenu collectionRefs={collectionRefs} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
    </>
  );
};

export default FDCollections;
