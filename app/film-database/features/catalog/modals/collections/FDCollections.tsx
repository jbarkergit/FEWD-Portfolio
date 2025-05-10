import { useCallback, useEffect, useRef, useState } from 'react';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import FDCollectionsModalCollection from './FDCollectionsCollection';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';

export type Sensor = {
  isInteract: boolean;
  isActiveElement: boolean;
  initialPointerCoords: Record<'x' | 'y', number | null>;
  pointerCoords: Record<'x' | 'y', number | null>;
};

export type Source = {
  colIndex: number;
  listItem: HTMLLIElement | null;
  listItemIndex: number;
};

export type Target = {
  colIndex: number;
  listItemIndex: number;
};

const FDCollections = () => {
  /** @context */
  const { userCollections } = useCatalogProvider();

  useEffect(() => console.log(userCollections), [userCollections]);

  /** @reference Array of all collections */
  const collectionRefs = useRef<HTMLElement[]>([]);

  const collectionRef = (reference: HTMLUListElement): void => {
    if (reference && !collectionRefs.current.includes(reference)) {
      collectionRefs.current.push(reference);
    }
  };

  /** @state User collections edit mode flag (hoisted) */
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /** @state List effect flag (hoisted) */
  const [isListFX, setIsListFX] = useState<boolean>(true);

  /** @constant */
  const NOT_FOUND_INDEX = -1 as const;

  /** @state Sensor store default (hoisted) */
  const createSensorDefault = (): Sensor => ({
    isInteract: false,
    isActiveElement: false,
    initialPointerCoords: { x: null, y: null },
    pointerCoords: { x: null, y: null },
  });

  /** @state Source store default (hoisted)  */
  const createSourceDefault = (): Source => ({
    colIndex: NOT_FOUND_INDEX,
    listItem: null,
    listItemIndex: NOT_FOUND_INDEX,
  });

  /** @state Target store default (hoisted)  */
  const createTargetDefault = (): Target => ({
    colIndex: NOT_FOUND_INDEX,
    listItemIndex: NOT_FOUND_INDEX,
  });

  /** @references (hoisted) */
  let sensorRef = useRef<Sensor>(createSensorDefault());
  let sourceRef = useRef<Source>(createSourceDefault());
  let targetRef = useRef<Target>(createTargetDefault());

  /**
   * @function resetStores
   * @description Rolls stores back to default state
   */
  const resetStores = useCallback((): void => {
    sensorRef.current = createSensorDefault();
    sourceRef.current = createSourceDefault();
    targetRef.current = createTargetDefault();
  }, []);

  return (
    <>
      <FDiFrame type='modal' />
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
            isListFX={isListFX}
            sensorRef={sensorRef}
            sourceRef={sourceRef}
            targetRef={targetRef}
            resetStores={resetStores}
          />
        ))}
      </section>
      <FDCollectionsModalMenu collectionRefs={collectionRefs} isEditMode={isEditMode} isListFX={isListFX} setIsListFX={setIsListFX} setIsEditMode={setIsEditMode} />
    </>
  );
};

export default FDCollections;
