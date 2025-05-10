import { useRef, useEffect, forwardRef, type RefObject } from 'react';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDCollectionsCollectionHeader from './FDCollectionsCollectionHeader';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { useCarouselNavigation } from '~/film-database/hooks/useCarouselNavigation';
import type { Sensor, Source, Target } from './FDCollections';
import FDCollectionsNavigation from './FDCollectionsNavigation';
import FDCollectionsCollectionUl from './FDCollectionsCollectionUl';

type Props = {
  mapIndex: number;
  header: string;
  data: Namespace_Tmdb.BaseMedia_Provider[] | null;
  display: 'flex' | 'grid';
  isEditMode: boolean;
  isListFX: boolean;
  collectionRefs: RefObject<HTMLElement[]>;
  sensorRef: RefObject<Sensor>;
  sourceRef: RefObject<Source>;
  targetRef: RefObject<Target>;
  resetStores: () => void;
};

const FDCollectionsCollection = forwardRef<HTMLElement, Props>(
  ({ mapIndex, header, data, display, isEditMode, isListFX, collectionRefs, sensorRef, sourceRef, targetRef, resetStores }, collectionRef) => {
    // Context
    const { setUserCollections, modalChunkSize, userCollections, setModalTrailer } = useCatalogProvider();

    // References
    const ulRef = useRef<HTMLUListElement>(null);

    // Magic constant
    const NOT_FOUND_INDEX = -1 as const;

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
      if (ulRef.current) {
        ulRef.current.addEventListener('pointermove', pointerMove);
        ulRef.current.addEventListener('pointerup', pointerUp);
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

        sourceRef.current.colIndex = collectionRefs.current.findIndex((collection) => collection.querySelector('ul') === currentTarget);
        sourceRef.current.listItem = target as HTMLLIElement;

        const srcColUl = collectionRefs.current[sourceRef.current.colIndex].querySelector('ul');

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
          // Skip iteration to prevent the return from being solely the list item's index
          if (index === sourceRef.current.listItemIndex) return closest;

          // Find center of rect
          const rectCenter: { x: number; y: number } = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          // Calculate uclidean distance: sqrt(x2-x1)^2 + (y2-y1)^2
          const distance = Math.sqrt(Math.pow(rectCenter.x - detach.x, 2) + Math.pow(rectCenter.y - detach.y, 2));

          // If the current rect is closer, update closest
          if (distance < closest.distance) return { rect, index, distance };

          // If this rect is farther, keep the previous closest
          return closest;
        },
        { rect: null, index: NOT_FOUND_INDEX, distance: Infinity }
      ).index;
    };

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
        console.log(x, y, detach.x, detach.y);
        resetInteraction();
        return;
      }

      // Get index of new collection
      const collectionRects: DOMRect[] = collectionRefs.current.map((col) => col.getBoundingClientRect());

      targetRef.current.colIndex = findEuclidean(detach, collectionRects);

      if (targetRef.current.colIndex == NOT_FOUND_INDEX) {
        resetInteraction({ event: 'detach', reason: 'target.colIndex is not valid.' });
        return;
      }

      // Get new collection's unordered list
      const targetCol: HTMLElement = collectionRefs.current[targetRef.current.colIndex];
      const targetColUl: HTMLUListElement | null = targetCol.querySelector('ul');

      if (!targetColUl) {
        resetInteraction({ event: 'detach', reason: 'Failure to identify target.colIndex.' });
        return;
      }

      // Get new collection's list item rects
      const targetColListItems: (HTMLLIElement | HTMLDivElement)[] = Array.from(targetColUl.children) as Array<HTMLDivElement | HTMLLIElement>;
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
        const sourceKey: string = Object.keys(prevCarousels)[sourceRef.current.colIndex];
        const targetKey: string = Object.keys(prevCarousels)[targetRef.current.colIndex];

        const sourceData: Namespace_Tmdb.BaseMedia_Provider[] = prevCarousels[sourceKey]?.data || [];
        const targetData: Namespace_Tmdb.BaseMedia_Provider[] = prevCarousels[targetKey]?.data || [];

        // Remove the item from sourceData
        const newSourceData: Namespace_Tmdb.BaseMedia_Provider[] = sourceData.filter((_, index) => index !== sourceRef.current.listItemIndex);

        // Insert item into targetData
        const newTargetData: Namespace_Tmdb.BaseMedia_Provider[] = [
          ...targetData.slice(0, targetRef.current.listItemIndex),
          sourceData[sourceRef.current.listItemIndex],
          ...targetData.slice(targetRef.current.listItemIndex),
        ];

        const updatedCarousels = {
          ...prevCarousels,
          [sourceKey]: {
            ...prevCarousels[sourceKey],
            data: isSameCollection ? newTargetData : newSourceData,
          },
        };

        if (!isSameCollection) {
          updatedCarousels[targetKey] = {
            ...prevCarousels[targetKey],
            data: newTargetData,
          };
        }

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
      if (isEditMode && sensorRef.current.isInteract && !sensorRef.current.isActiveElement && sourceRef.current.listItem instanceof HTMLLIElement && ulRef.current) {
        ulRef.current.removeEventListener('pointermove', pointerMove);
        ulRef.current.removeEventListener('pointerup', pointerUp);

        sensorRef.current.isActiveElement = true;

        ulRef.current.addEventListener('pointerup', detachListItem);
        sourceRef.current.listItem.addEventListener('pointermove', attachListItem);
      } else {
        resetInteraction();
        return;
      }
    }

    /**
     * @function toggleLiVisibility
     * @description Toggles the visibility of the clicked list item if edit mode is disabled and user is not dragging, set trailers if isListFX is true
     */
    function toggleLiVisibility(): void {
      const listItems: Element[] | null = ulRef.current ? Array.from(ulRef.current.children) : null;

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
        listItems[i].setAttribute('data-list-item-visible', i === elementIndex ? 'true' : 'false');
      }

      if (isListFX) {
        const collectionData = Object.values(userCollections)[mapIndex]?.data;
        const targetData = collectionData?.[elementIndex];
        if (targetData) setModalTrailer(targetData);
      }

      setTimeout(() => resetInteraction(), 0);
    }

    /**
     * @function pointerUp
     * @description Scales all list items and applies filters to their images then invokes @func `resetInteraction`
     */
    function pointerUp(): void {
      if (!isEditMode && !sensorRef.current.isActiveElement) {
        toggleLiVisibility();
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
      ulRef.current?.addEventListener('pointerdown', pointerDown);
      ulRef.current?.addEventListener('pointermove', pointerMove);
      ulRef.current?.addEventListener('pointerup', pointerUp);

      return () => {
        ulRef.current?.removeEventListener('pointerdown', pointerDown);
        ulRef.current?.removeEventListener('pointermove', pointerMove);
        ulRef.current?.removeEventListener('pointerup', pointerUp);
      };
    }, [isEditMode, isListFX]);

    /**
     * @function useCarouselNavigation
     * @description Hook that handles navigation for all carousels across the application
     */
    const updateCarouselIndex = useCarouselNavigation({
      dataLength: data ? data.length : 0,
      chunkSize: modalChunkSize,
      reference: ulRef,
    });

    /**
     * @function FDCollectionsCollection
     * @returns {JSX.Element}
     */
    return (
      <section className='fdCollections__collection' ref={collectionRef}>
        <FDCollectionsCollectionHeader mapIndex={mapIndex} header={header} />
        <div className='fdCollections__collection__wrapper'>
          <FDCollectionsCollectionUl mapIndex={mapIndex} data={data} display={display} isEditMode={isEditMode} ref={ulRef} />
          <FDCollectionsNavigation updateCarouselIndex={updateCarouselIndex} />
        </div>
      </section>
    );
  }
);

export default FDCollectionsCollection;
