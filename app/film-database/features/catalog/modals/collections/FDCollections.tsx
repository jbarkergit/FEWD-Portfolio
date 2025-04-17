import { useRef, useState } from 'react';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import FDCollectionsModalCollection from './FDCollectionsCollection';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

export type User_Collection = {
  header: string;
  data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
  display: 'flex' | 'grid';
};

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
      <section className='fdCollections' data-layout-collection>
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
