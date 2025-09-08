import { useEffect, type RefObject } from 'react';
import FDCollectionsCollectionHeader from './FDCollectionsCollectionHeader';
import type { Sensor, Source, Target } from './FDCollections';
import FDCollectionsCollectionUl from './FDCollectionsCollectionUl';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import GenericCarouselNavigation from '~/film-database/components/carousel/GenericCarouselNavigation';
import { useUserCollection, type UserCollection } from '~/film-database/context/UserCollectionContext';
import { useTrailerQueue } from '~/film-database/context/TrailerQueueContext';

// Magic constant
const NOT_FOUND_INDEX = -1 as const;

/**
 * @function findEuclidean
 * @returns {number}
 * @description Finds Eudclidean distance within supplied DOMRect[] and returns the index of the closest element
 */
const findEuclidean = (detach: Record<'x' | 'y', number>, data: DOMRect[]): number => {
  return data.reduce<{
    rect: DOMRect | null;
    index: number;
    distance: number;
  }>(
    (closest, rect, index) => {
      // Check if the detachment point is within the bounds of the current rect
      const isWithinBounds =
        detach.x >= rect.left && detach.x <= rect.right && detach.y >= rect.top && detach.y <= rect.bottom;

      if (isWithinBounds) return { rect, index, distance: 0 };

      // Find the center of the rect
      const rectCenter: { x: number; y: number } = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      // Calculate Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2)
      const distance = Math.sqrt(Math.pow(rectCenter.x - detach.x, 2) + Math.pow(rectCenter.y - detach.y, 2));

      // If the current rect is closer, update closest
      if (distance < closest.distance) return { rect, index, distance };

      // If this rect is farther, keep the previous closest
      return closest;
    },
    { rect: null, index: NOT_FOUND_INDEX, distance: Infinity }
  ).index;
};

type Props = {
  mapIndex: number;
  header: string;
  data: TmdbMovieProvider[] | null;
  isEditMode: boolean;
  ulRef: (reference: HTMLUListElement) => void;
  ulRefs: React.RefObject<HTMLUListElement[]>;
  sensorRef: RefObject<Sensor>;
  sourceRef: RefObject<Source>;
  targetRef: RefObject<Target>;
  resetStores: () => void;
  triggerError: () => void;
};

const FDCollectionsCollection = ({
  mapIndex,
  header,
  data,
  isEditMode,
  ulRef,
  ulRefs,
  sensorRef,
  sourceRef,
  targetRef,
  resetStores,
  triggerError,
}: Props) => {
  // Context
  const { userCollections, setUserCollections } = useUserCollection();
  const { setModalTrailer } = useTrailerQueue();

  /**
   * @function resetEventListeners
   * @description Rolls event listeners back to original mount state
   */
  function resetEventListeners(): void {
    // Remove target's inline styles and event listeners
    if (sourceRef.current.listItem instanceof HTMLLIElement) {
      if (sourceRef.current.listItem.hasAttribute('style')) sourceRef.current.listItem.removeAttribute('style');
      sourceRef.current.listItem.removeEventListener('pointermove', attachListItem);
    }

    // Re-add event listeners to ulRef
    if (ulRefs.current[mapIndex]) {
      ulRefs.current[mapIndex].addEventListener('pointermove', pointerMove);
      ulRefs.current[mapIndex].addEventListener('pointerup', pointerUp);
    }
  }

  /**
   * @function resetInteraction
   * @description Invokes @function resetStores and @function resetEventListeners to prepare dom for new potential interactions
   */
  function resetInteraction(error?: { event: 'down' | 'move' | 'up' | 'attach' | 'detach'; reason: string }): void {
    resetEventListeners();
    resetStores();
    if (error) console.error(`Event ${error.event.toLocaleUpperCase()} failed. ${error.reason}`);
  }

  /**
   * @function pointerDown
   * @description Sets interactivity in motion by toggling a flag and assigning dependency values
   */

  function pointerDown(event: PointerEvent): void {
    const currentTarget: EventTarget | null = event.currentTarget;
    const target: EventTarget | null = event.target;

    if (currentTarget instanceof HTMLUListElement && target instanceof HTMLLIElement) {
      sensorRef.current.isInteract = true;
      sensorRef.current.initialPointerCoords = { x: event.clientX, y: event.clientY };
      sensorRef.current.pointerCoords = { x: event.clientX, y: event.clientY };

      sourceRef.current.colIndex = ulRefs.current.findIndex((collection) => collection === currentTarget);
      sourceRef.current.listItem = target as HTMLLIElement;

      const srcColUl = ulRefs.current[sourceRef.current.colIndex];

      if (sourceRef.current.colIndex == NOT_FOUND_INDEX || !srcColUl) {
        resetInteraction({ event: 'down', reason: 'Source collection index not found.' });
        return;
      }

      const liElements = Array.from(srcColUl.children) as Array<HTMLLIElement | HTMLDivElement>;
      const targetIndex: number = liElements.findIndex((li) => li === target);
      sourceRef.current.listItemIndex = targetIndex;

      if (sourceRef.current.listItemIndex == NOT_FOUND_INDEX) {
        resetInteraction({ event: 'down', reason: 'Source list item index not found.' });
        return;
      }
    }
  }

  /**
   * @function attachListItem
   * @description Attaches active list item to cursor
   */
  function attachListItem(event: PointerEvent): void {
    const x: number | null = sensorRef.current.pointerCoords.x;
    const y: number | null = sensorRef.current.pointerCoords.y;

    if (sourceRef.current.listItem instanceof HTMLLIElement && x !== null && y !== null) {
      const rect: DOMRect = sourceRef.current.listItem.getBoundingClientRect();
      const offsetX: number = x - rect.width / 2;
      const offsetY: number = y - rect.height / 2;

      sourceRef.current.listItem.style.cssText = `position: fixed; z-index: 2; left: ${offsetX}px; top: ${offsetY}px;`;
      sensorRef.current.pointerCoords = { x: event.clientX, y: event.clientY };
    }
  }

  /**
   * @function detachListItem
   * @description Detaches active list item from cursor, handles transfer of list item inbetween collections
   */
  function detachListItem(event: PointerEvent): void {
    // Get detachment position
    const detach: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY };

    // Ensure that the user isn't misclicking
    const { x, y } = sensorRef.current.initialPointerCoords;

    if (detach.x === x && detach.y === y) {
      resetInteraction();
      return;
    }

    // Get index of new collection
    const collectionRects: DOMRect[] = ulRefs.current.map((col) => col.getBoundingClientRect());

    targetRef.current.colIndex = findEuclidean(detach, collectionRects);

    if (targetRef.current.colIndex == NOT_FOUND_INDEX) {
      resetInteraction({ event: 'detach', reason: 'target.colIndex is not valid.' });
      return;
    }

    // Get new collection's unordered list
    const targetCol = ulRefs.current[targetRef.current.colIndex];

    if (!targetCol) {
      resetInteraction({ event: 'detach', reason: 'Failure to identify target.colIndex.' });
      return;
    }

    // Get new collection's list item rects
    const targetColListItems: (HTMLLIElement | HTMLDivElement)[] = Array.from(targetCol.children) as Array<
      HTMLDivElement | HTMLLIElement
    >;
    const targetColRects: DOMRect[] = targetColListItems.map((li) => li.getBoundingClientRect());

    // Find the closest item index to the detach point
    targetRef.current.listItemIndex = findEuclidean(detach, targetColRects);

    if (targetRef.current.listItemIndex == NOT_FOUND_INDEX) {
      resetInteraction({ event: 'detach', reason: 'target.listItemIndex is not valid.' });
      return;
    }

    // Update carousels when user drags a list item to a collection and drops it in a new position
    setUserCollections((prevCarousels) => {
      const isSameCollection: boolean = sourceRef.current.colIndex == targetRef.current.colIndex;
      const isSameListItemIndex: boolean = sourceRef.current.listItemIndex == targetRef.current.listItemIndex;

      // If the dragged list item is dropped in the same collection at the same position
      if (isSameCollection && isSameListItemIndex) return prevCarousels;

      // Identify the source and target collections by their keys
      const sourceKey = Object.keys(prevCarousels)[sourceRef.current.colIndex];
      const targetKey = Object.keys(prevCarousels)[targetRef.current.colIndex];
      if (!sourceKey || !targetKey) return prevCarousels;

      const source = prevCarousels[sourceKey];
      const target = prevCarousels[targetKey];

      const sourceData = (source && (source.data as TmdbMovieProvider[])) || [];
      const targetData = (target && (target.data as TmdbMovieProvider[])) || [];

      // If the dragged list item is dropped in a collection that already contains the list item
      const containsListItem: boolean = targetData.some(
        (item) => item.id === sourceData[sourceRef.current.listItemIndex]?.id
      );

      if (containsListItem) {
        triggerError();
        return prevCarousels;
      }

      // Remove the item from sourceData
      const newSourceData: TmdbMovieProvider[] = sourceData.filter(
        (_, index) => index !== sourceRef.current.listItemIndex
      );

      // Insert item into targetData
      const newTargetData = [
        ...targetData.slice(0, targetRef.current.listItemIndex),
        sourceData[sourceRef.current.listItemIndex],
        ...targetData.slice(targetRef.current.listItemIndex),
      ];

      if (!newTargetData || !newTargetData.length) return prevCarousels;

      // State object
      const updatedCarousels = {
        ...prevCarousels,
        [sourceKey]: {
          ...prevCarousels[sourceKey]!,
          data: newSourceData,
        } as UserCollection,
        [targetKey]: {
          ...prevCarousels[targetKey]!,
          data: newTargetData,
        } as UserCollection,
      };

      // Update state
      return updatedCarousels;
    });

    setTimeout(() => resetInteraction(), 0);
  }

  /**
   * @function pointerMove
   * @description Tracks collections and their items
   */
  function pointerMove(): void {
    if (
      isEditMode &&
      sensorRef.current.isInteract &&
      !sensorRef.current.isActiveElement &&
      sourceRef.current.listItem instanceof HTMLLIElement &&
      ulRefs.current[mapIndex]
    ) {
      ulRefs.current[mapIndex].removeEventListener('pointermove', pointerMove);
      ulRefs.current[mapIndex].removeEventListener('pointerup', pointerUp);

      sensorRef.current.isActiveElement = true;

      ulRefs.current[mapIndex].addEventListener('pointerup', detachListItem);
      sourceRef.current.listItem.addEventListener('pointermove', attachListItem);
    } else {
      resetInteraction();
      return;
    }
  }

  /**
   * @function handleModalTrailer
   * @description Sets modal trailer
   */
  function handleModalTrailer(): void {
    const listItems: Element[] | null = ulRefs.current[mapIndex] ? Array.from(ulRefs.current[mapIndex].children) : null;

    if (!listItems) {
      resetInteraction({ event: 'up', reason: 'Failure to identify list items.' });
      return;
    }

    const elementIndex: number = listItems.findIndex((item) => item === sourceRef.current.listItem);

    if (elementIndex == NOT_FOUND_INDEX) {
      resetInteraction({ event: 'up', reason: 'Element index not found.' });
      return;
    }

    for (let i = 0; i < listItems.length; i++) {
      listItems[i]?.setAttribute('data-list-item-visible', i === elementIndex ? 'true' : 'false');
    }

    const collectionData = Object.values(userCollections)[mapIndex]?.data;
    const targetData = collectionData?.[elementIndex];
    if (targetData) setModalTrailer(targetData);

    setTimeout(() => resetInteraction(), 0);
  }

  /**
   * @function pointerUp
   * @description Scales all list items and applies filters to their images then invokes @func `resetInteraction`
   */
  function pointerUp(): void {
    if (!isEditMode && !sensorRef.current.isActiveElement) {
      handleModalTrailer();
    } else {
      if (sensorRef.current.isActiveElement) resetInteraction({ event: 'up', reason: 'An element is already active.' });
      return;
    }
  }

  /**
   * @function useEffect
   * @description Handles module's event listeners
   */
  useEffect(() => {
    ulRefs.current[mapIndex]?.addEventListener('pointerdown', pointerDown);
    ulRefs.current[mapIndex]?.addEventListener('pointermove', pointerMove);
    ulRefs.current[mapIndex]?.addEventListener('pointerup', pointerUp);

    return () => {
      ulRefs.current[mapIndex]?.removeEventListener('pointerdown', pointerDown);
      ulRefs.current[mapIndex]?.removeEventListener('pointermove', pointerMove);
      ulRefs.current[mapIndex]?.removeEventListener('pointerup', pointerUp);
    };
  }, [isEditMode]);

  /**
   * @function FDCollectionsCollection
   * @returns {JSX.Element}
   */
  if (data)
    return (
      <section className='fdCollections__collection'>
        <FDCollectionsCollectionHeader
          mapIndex={mapIndex}
          header={header}
        />
        <div className='fdCollections__collection__wrapper'>
          <FDCollectionsCollectionUl
            mapIndex={mapIndex}
            data={data}
            isEditMode={isEditMode}
            ref={ulRef}
            sensorRef={sensorRef}
          />
          {ulRefs.current[mapIndex] && (
            <GenericCarouselNavigation
              dataLength={data.length}
              reference={ulRefs.current[mapIndex]}
              chunkSizePref='modal'
            />
          )}
        </div>
      </section>
    );
};
export default FDCollectionsCollection;
