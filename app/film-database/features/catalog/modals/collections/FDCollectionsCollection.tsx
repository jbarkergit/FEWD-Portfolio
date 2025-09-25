import { memo, useEffect, type RefObject } from 'react';
import FDCollectionsCollectionHeader from './FDCollectionsCollectionHeader';
import type { Sensor, Source, Target } from './FDCollections';
import FDCollectionsCollectionUl from './FDCollectionsCollectionUl';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import GenericCarouselNavigation from '~/film-database/components/carousel/GenericCarouselNavigation';
import { useUserCollection, type UserCollection } from '~/film-database/context/UserCollectionContext';
import { useModalTrailer } from '~/film-database/context/ModalTrailerContext';

// Magic constant
const NOT_FOUND_INDEX = -1 as const;

/** Finds Eudclidean distance within supplied DOMRect[] and returns the index of the closest element */
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

const FDCollectionsCollection = memo(
  ({
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
    const { setModalTrailer } = useModalTrailer();

    /** Rolls event listeners back to original mount state */
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

    /** Invokes resetStores and resetEventListeners to prepare dom for new potential interactions */
    function resetInteraction(error?: { event: 'down' | 'move' | 'up' | 'attach' | 'detach'; reason: string }): void {
      resetEventListeners();
      resetStores();
      if (error) console.error(`Event ${error.event.toLocaleUpperCase()} failed. ${error.reason}`);
    }

    /** Sets interactivity in motion by toggling a flag and assigning dependency values */
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

    /** Attaches active list item to cursor */
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

    /** Detaches active list item from cursor, handles transfer of list item inbetween collections */
    function detachListItem(event: PointerEvent): void {
      const { x, y } = sensorRef.current.initialPointerCoords; // Attachment position
      const detach: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY }; // Detachment position

      // Handle misclicks
      if (detach.x === x && detach.y === y) {
        resetInteraction();
        return;
      }

      // Identify target collection index
      const collectionRects: DOMRect[] = ulRefs.current.map((col) => col.getBoundingClientRect());
      const targetCollectionIndex = findEuclidean(detach, collectionRects);

      if (targetCollectionIndex == NOT_FOUND_INDEX) {
        resetInteraction({ event: 'detach', reason: 'Failure to identify target index.' });
        return;
      }

      targetRef.current.colIndex = targetCollectionIndex;

      // Get target collection's list item rects
      const targetCol = ulRefs.current[targetCollectionIndex];
      if (!targetCol) {
        resetInteraction({
          event: 'detach',
          reason: 'Failure to identify target index within unordered list reference array.',
        });
        return;
      }

      const targetColListItems: (HTMLLIElement | HTMLDivElement)[] = Array.from(targetCol.children) as Array<
        HTMLDivElement | HTMLLIElement
      >;
      const targetColRects: DOMRect[] = targetColListItems.map((li) => li.getBoundingClientRect());

      // Find the closest item index to the detach point
      const targetListIndex: number = findEuclidean(detach, targetColRects);
      if (targetListIndex == NOT_FOUND_INDEX) {
        resetInteraction({ event: 'detach', reason: 'Failure to identify euclidean.' });
        return;
      }

      targetRef.current.listItemIndex = targetListIndex;

      // Capture source information prior to state sets to avoid mutable ref issues
      const sourceColIndex = sourceRef.current.colIndex;
      const sourceListIndex = sourceRef.current.listItemIndex;
      const sourceKey = Object.keys(userCollections)[sourceColIndex];
      const targetKey = Object.keys(userCollections)[targetCollectionIndex];

      if (sourceColIndex === NOT_FOUND_INDEX || sourceListIndex === NOT_FOUND_INDEX || !sourceKey || !targetKey) {
        resetInteraction({ event: 'detach', reason: 'Invalid source and/or target keys.' });
        return;
      }

      // Establish flag determining if the dragged list item is dropped in the same collection at the same position
      const isSameCollection: boolean = sourceColIndex === targetCollectionIndex;
      const isSameListItemIndex: boolean = sourceListIndex === targetListIndex;
      const isFaultyInteraction: boolean = isSameCollection && isSameListItemIndex;

      // Update carousels when user drags a list item to a collection and drops it in a new position
      setUserCollections((prevCarousels) => {
        if (isFaultyInteraction) return prevCarousels;

        const prevSourceData = prevCarousels[sourceKey]?.data as TmdbMovieProvider[];
        const prevTargetData = prevCarousels[targetKey]?.data as TmdbMovieProvider[];

        // Determine if the dragged list item is dropped in a target collection (not source collection for reordering) that already contains the list item
        const targetIncludesListItem: boolean =
          !isSameCollection && prevTargetData.some((item) => item.id === prevSourceData[sourceListIndex]?.id);

        if (targetIncludesListItem) {
          triggerError();
          return prevCarousels;
        }

        let newSourceData: TmdbMovieProvider[];
        let newTargetData: TmdbMovieProvider[];

        if (isSameCollection) {
          // Reordering within the same collection
          newSourceData = [...prevSourceData];
          const [movedItem] = newSourceData.splice(sourceListIndex, 1); // Remove original
          if (!movedItem) return prevCarousels;
          newSourceData.splice(targetListIndex, 0, movedItem); // Insert at new index
          newTargetData = newSourceData; // Same array for source and target
        } else {
          // Moving to target collection
          newSourceData = prevSourceData.filter((_, index) => index !== sourceListIndex);
          const movedItem = structuredClone(prevSourceData[sourceListIndex]);
          if (!movedItem) return prevCarousels;
          newTargetData = [
            ...prevTargetData.slice(0, targetListIndex),
            movedItem,
            ...prevTargetData.slice(targetListIndex),
          ];
        }

        return {
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
      });

      setTimeout(() => resetInteraction(), 0);
    }

    /** Tracks collections and their items */
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

    /** Sets modal trailer */
    function handleModalTrailer(): void {
      const listItems: Element[] | null = ulRefs.current[mapIndex]
        ? Array.from(ulRefs.current[mapIndex].children)
        : null;

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

    /** Scales all list items and applies filters to their images then invokes resetInteraction */
    function pointerUp(): void {
      if (!isEditMode && !sensorRef.current.isActiveElement) {
        handleModalTrailer();
      } else {
        if (sensorRef.current.isActiveElement)
          resetInteraction({ event: 'up', reason: 'An element is already active.' });
        return;
      }
    }

    /** Handles module's event listeners */
    useEffect(() => {
      ulRefs.current[mapIndex]?.addEventListener('pointerdown', pointerDown);
      ulRefs.current[mapIndex]?.addEventListener('pointermove', pointerMove);
      ulRefs.current[mapIndex]?.addEventListener('pointerup', pointerUp);

      return () => {
        ulRefs.current[mapIndex]?.removeEventListener('pointerdown', pointerDown);
        ulRefs.current[mapIndex]?.removeEventListener('pointermove', pointerMove);
        ulRefs.current[mapIndex]?.removeEventListener('pointerup', pointerUp);
      };
    }, [isEditMode, userCollections]);

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
  }
);
export default FDCollectionsCollection;
