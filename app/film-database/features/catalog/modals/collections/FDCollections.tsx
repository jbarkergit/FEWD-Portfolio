import { useCallback, useEffect, useRef, useState } from 'react';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDCollectionsErrorHandler from './FDCollectionsErrorHandler';
import FDCollectionsCollection from './FDCollectionsCollection';

const NOT_FOUND_INDEX = -1 as const;

export type Sensor = {
  isInteract: boolean;
  isActiveElement: boolean;
  initialPointerCoords: Record<'x' | 'y', number | null>;
  pointerCoords: Record<'x' | 'y', number | null>;
};

const createSensorDefault = (): Sensor => ({
  isInteract: false,
  isActiveElement: false,
  initialPointerCoords: { x: null, y: null },
  pointerCoords: { x: null, y: null },
});

export type Source = {
  colIndex: number;
  listItem: HTMLLIElement | null;
  listItemIndex: number;
};

const createSourceDefault = (): Source => ({
  colIndex: NOT_FOUND_INDEX,
  listItem: null,
  listItemIndex: NOT_FOUND_INDEX,
});

export type Target = {
  colIndex: number;
  listItemIndex: number;
};

const createTargetDefault = (): Target => ({
  colIndex: NOT_FOUND_INDEX,
  listItemIndex: NOT_FOUND_INDEX,
});

const FDCollections = () => {
  const { userCollections } = useCatalogProvider(); // Context

  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Edit mode flag

  const ulRefs = useRef<HTMLUListElement[]>([]);
  const editModeBtn = useRef<HTMLButtonElement>(null); // Reference to the "Edit Mode" button forwarded from CollectionsMenu
  const errorRef = useRef<HTMLDivElement>(null); // Reference storage to errors occuring in the drop and drag logic

  const sensorRef = useRef<Sensor>(createSensorDefault()); // Sensor
  const sourceRef = useRef<Source>(createSourceDefault()); // Source
  const targetRef = useRef<Target>(createTargetDefault()); // Target

  /**
   * @function ulRef
   * @description Stores unordered list dom nodes as an array reference
   */
  const ulRef = (reference: HTMLUListElement): void => {
    if (reference && !ulRefs.current.includes(reference)) {
      ulRefs.current.push(reference);
    }
  };

  /**
   * @function triggerError
   * @description Handles visibility of the errors notifcation
   */
  const triggerError = useCallback((): void => {
    const attr: string = 'data-error';
    errorRef.current?.setAttribute(attr, 'true');
    setTimeout(() => errorRef.current?.setAttribute(attr, 'false'), 3200);
  }, []);

  /**
   * @function resetStores
   * @description Rolls stores back to default state
   */
  const resetStores = useCallback((): void => {
    sensorRef.current = createSensorDefault();
    sourceRef.current = createSourceDefault();
    targetRef.current = createTargetDefault();
  }, []);

  /**
   * @function toggleAttributes
   * @description Handles visual indicators via dom node attributes for both 'data-toggle' and 'data-list-item-fx'
   */
  const toggleAttributes = () => {
    if (editModeBtn.current) {
      editModeBtn.current.setAttribute('data-toggle', String(isEditMode));
    }

    if (ulRefs.current) {
      for (let i = 0; i < ulRefs.current.length; i++) {
        const ul = ulRefs.current[i];
        if (!ul || i === 0) continue;
        ul.setAttribute('data-list-item-fx', !isEditMode ? 'true' : 'false');
      }
    }
  };

  useEffect(() => {
    toggleAttributes();
  }, [isEditMode]);

  return (
    <>
      <FDiFrame type='modal' />
      <section className='fdCollections'>
        {Object.values(userCollections).map(({ header, data, display }, index) => (
          <FDCollectionsCollection
            key={`user-collections-collection-${index}`}
            mapIndex={index}
            header={header}
            data={data}
            display={display}
            isEditMode={isEditMode}
            ulRef={ulRef}
            ulRefs={ulRefs}
            sensorRef={sensorRef}
            sourceRef={sourceRef}
            targetRef={targetRef}
            resetStores={resetStores}
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
