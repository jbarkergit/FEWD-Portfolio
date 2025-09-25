import { useCallback, useEffect, useRef, useState } from 'react';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDCollectionsErrorHandler from './FDCollectionsErrorHandler';
import FDCollectionsCollection from './FDCollectionsCollection';
import { useUserCollection } from '~/film-database/context/UserCollectionContext';

const FDCollections = () => {
  const { userCollections } = useUserCollection(); // Context

  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Edit mode flag

  const errorRef = useRef<HTMLDivElement>(null); // Reference storage to errors occuring in the drop and drag logic

  const ulRefs = useRef<HTMLUListElement[]>([]);

  /** Stores unordered list dom nodes as an array reference */
  const ulRef = (reference: HTMLUListElement): void => {
    if (reference && !ulRefs.current.includes(reference)) {
      ulRefs.current.push(reference);
    }
  };

  /** Handles visibility of the errors notifcation */
  const triggerError = useCallback((): void => {
    const attr: string = 'data-error';
    errorRef.current?.setAttribute(attr, 'true');
    setTimeout(() => errorRef.current?.setAttribute(attr, 'false'), 3200);
  }, []);

  /** Handles interaction visual indicators via dom node attributes for 'data-list-item-fx' */
  useEffect(() => {
    const toggleVisibility = () => {
      if (ulRefs.current) {
        for (let i = 0; i < ulRefs.current.length; i++) {
          const ul = ulRefs.current[i];
          if (!ul || i === 0) continue;
          ul.setAttribute('data-list-item-fx', !isEditMode ? 'true' : 'false');
        }
      }
    };

    toggleVisibility();
  }, [isEditMode]);

  return (
    <>
      <FDiFrame type='modal' />
      <section className='fdCollections'>
        {Object.values(userCollections).map(({ header, data }, index) => (
          <FDCollectionsCollection
            key={`user-collections-collection-${index}`}
            mapIndex={index}
            header={header}
            data={data}
            isEditMode={isEditMode}
            ulRef={ulRef}
            ulRefs={ulRefs}
            triggerError={triggerError}
          />
        ))}
      </section>
      <FDCollectionsModalMenu
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
      <FDCollectionsErrorHandler ref={errorRef} />
    </>
  );
};

export default FDCollections;
