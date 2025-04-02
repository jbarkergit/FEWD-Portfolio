import { useRef, useEffect, forwardRef } from 'react';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDCollectionsCollectionUl from './FDCollectionsCollectionUl';
import FDCollectionsCollectionHeader from './FDCollectionsCollectionHeader';

type Props = {
  mapIndex: number;
  header: string;
  data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
  display: 'flex' | 'grid';
  isEditMode: boolean;
  collectionRefs: React.RefObject<HTMLElement[]>;
  carousels: React.RefObject<
    {
      header: string;
      data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
      display: 'flex' | 'grid';
    }[]
  >;
};

const FDCollectionsCollection = forwardRef<HTMLElement, Props>(({ mapIndex, header, data, display, isEditMode, collectionRefs, carousels }, collectionRef) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const NOT_FOUND_INDEX = -1 as const;

  const sensor: {
    isInteract: boolean;
    isActiveElement: boolean;
    pointerCoords: Record<'x' | 'y', number | null>;
  } = {
    isInteract: false,
    isActiveElement: false,
    pointerCoords: { x: null, y: null },
  };

  const source: {
    colIndex: number;
    listItem: HTMLLIElement | null;
    listItemIndex: number;
  } = {
    colIndex: NOT_FOUND_INDEX,
    listItem: null,
    listItemIndex: NOT_FOUND_INDEX,
  };

  const target: {
    colIndex: number;
    listItemIndex: number;
  } = {
    colIndex: NOT_FOUND_INDEX,
    listItemIndex: NOT_FOUND_INDEX,
  };

  /**
   * @function resetStores
   * @returns {void}
   * Rolls stores back to default state
   */
  const resetStores = (): void => {
    sensor.isInteract = false;
    sensor.isActiveElement = false;
    sensor.pointerCoords = { x: null, y: null };

    source.colIndex = NOT_FOUND_INDEX;
    source.listItem = null;
    source.listItemIndex = NOT_FOUND_INDEX;

    target.colIndex = NOT_FOUND_INDEX;
    target.listItemIndex = NOT_FOUND_INDEX;
  };

  /**
   * @function resetEventListeners
   * @returns {void}
   * Rolls event listeners back to original mount state
   */
  function resetEventListeners(): void {
    // Remove target's inline styles and event listeners
    if (source.listItem instanceof HTMLLIElement) {
      if (source.listItem.hasAttribute('style')) source.listItem.removeAttribute('style');
      source.listItem.removeEventListener('pointermove', attachListItem);
      // originalCollectionListItem.removeEventListener('pointerup', detachListItem);
    }

    // Re-add event listeners to ulRef
    if (ulRef.current) {
      ulRef.current.addEventListener('pointermove', pointerMove);
      ulRef.current.addEventListener('pointerup', pointerUp);
    }
  }

  /**
   * @function resetInteraction
   * @returns {void}
   * Invokes @function resetStores and @function resetEventListeners to prepare dom for new potential interactions
   */
  function resetInteraction(error?: { event: 'down' | 'move' | 'up' | 'attach' | 'detach'; reason: string }): void {
    resetStores();
    resetEventListeners();
    if (error) console.log(`Event ${error.event.toLocaleUpperCase()} failed. ${error.reason}`);
  }

  /**
   * @function pointerDown
   * @returns void
   * @description Sets interactivity in motion by toggling a flag and assigning dependency values
   */

  function pointerDown(event: PointerEvent): void {
    const currentTarget = event.currentTarget;
    const target = event.target;

    if (currentTarget instanceof HTMLUListElement && target instanceof HTMLLIElement) {
      sensor.isInteract = true;
      sensor.pointerCoords = { x: event.clientX, y: event.clientY };

      source.colIndex = collectionRefs.current.findIndex((collection) => collection.querySelector('ul') === currentTarget);
      source.listItem = target as HTMLLIElement;

      const srcColUl = collectionRefs.current[source.colIndex].querySelector('ul');

      if (source.colIndex === NOT_FOUND_INDEX || !srcColUl) {
        resetInteraction({ event: 'down', reason: 'Source collection index not found.' });
        return;
      }

      const liElements = Array.from(srcColUl.children) as Array<HTMLLIElement | HTMLDivElement>;
      const targetIndex: number = liElements.findIndex((li) => li === target);
      source.listItemIndex = targetIndex;

      if (source.listItemIndex === NOT_FOUND_INDEX) {
        resetInteraction({ event: 'down', reason: 'Source list item index not found.' });
        return;
      }
    } else {
      if (!(currentTarget instanceof HTMLUListElement)) {
        resetInteraction({ event: 'down', reason: `event.currentTarget instance of ${typeof event.currentTarget}` });
      } else {
        resetInteraction({ event: 'down', reason: `event.target instance of ${typeof event.target}` });
      }
      return;
    }
  }

  /**
   * @function attachListItem
   * @returns {void}
   * @description Attaches active list item to cursor
   */
  function attachListItem(event: PointerEvent): void {
    const x: number | null = sensor.pointerCoords.x;
    const y: number | null = sensor.pointerCoords.y;

    if (source.listItem instanceof HTMLLIElement && x && y) {
      const rect: DOMRect = source.listItem.getBoundingClientRect();
      const offsetX: number = x - rect.width / 2;
      const offsetY: number = y - rect.height / 2;

      source.listItem.style.cssText = `position: absolute; z-index: 2; left: ${offsetX}px; top: ${offsetY}px;`;
      sensor.pointerCoords = { x: event.clientX, y: event.clientY };
    } else {
      if (!(source.listItem instanceof HTMLLIElement)) resetInteraction({ event: 'attach', reason: `event.target instance of ${typeof event.target}` });
      if (!x) resetInteraction({ event: 'attach', reason: 'sensor.pointerCoordinates.x is not valid.' });
      if (!y) resetInteraction({ event: 'attach', reason: 'sensor.pointerCoordinates.y is not valid.' });
      return;
    }
  }

  /**
   * @function detachListItem
   * @returns {void}
   * @description Detaches active list item from cursor, handles transfer of list item inbetween collections
   */

  function detachListItem(event: PointerEvent): void {
    const currentTarget: EventTarget | null = event.currentTarget;

    if (currentTarget instanceof HTMLUListElement && source.listItem instanceof HTMLLIElement && collectionRefs.current) {
      // Get index of new collection (currentTarget)
      target.colIndex = collectionRefs.current.findIndex((collection) => collection.querySelector('ul') === currentTarget);

      if (target.colIndex === NOT_FOUND_INDEX) {
        resetInteraction({ event: 'detach', reason: 'target.colIndex is not valid.' });
        return;
      }

      // Get detachment position
      const detach: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY };

      // Get new collection's unordered list
      const newCollection: HTMLElement = collectionRefs.current[target.colIndex];
      const newCollectionUl: HTMLUListElement | null = newCollection.querySelector('ul');

      if (!newCollectionUl) {
        resetInteraction({ event: 'detach', reason: 'Failure to identify target.colIndex.' });
        return;
      }

      // Get new collection's list item rects
      const newCollectionListItems = Array.from(newCollectionUl.children) as Array<HTMLDivElement | HTMLLIElement>;
      const newCollectionRects: DOMRect[] = newCollectionListItems.map((li) => li.getBoundingClientRect());

      // Find the closest item index to the detach point using the Euclidean distance sqrt(x2-x1)^2 + (y2-y1)^2
      const newCollectionListItemIndex: number = newCollectionRects.reduce<{
        rect: DOMRect | null;
        index: number;
        distance: number;
      }>(
        (closest, rect, index) => {
          // Skip iteration to prevent the return from being solely the list item's index
          if (index === source.listItemIndex) return closest;

          const rectCenterX = rect.left + rect.width / 2;
          const rectCenterY = rect.top + rect.height / 2;
          const distance = Math.sqrt(Math.pow(rectCenterX - detach.x, 2) + Math.pow(rectCenterY - detach.y, 2));

          // If closest rect isn't available yet or the current rect is closer, return updated acc with rect and index
          if (distance < closest.distance) return { rect, index, distance };

          return closest;
        },
        { rect: null, index: NOT_FOUND_INDEX, distance: Infinity }
      ).index;

      // Edge case: User drops list item on itself
      if (source.colIndex === target.colIndex && source.listItemIndex === target.listItemIndex) {
        resetInteraction();
        return;
      }

      // Create a deep clone of state
      let clone = carousels.current.map((collection) => ({
        ...collection,
        data: collection.data ? [...collection.data] : undefined,
      }));

      // Update carousels reference when user drops and drags a list item in the same collection
      function handleSameCollection(): void {
        let targetData = clone[source.colIndex].data;

        if (!targetData) {
          resetInteraction({ event: 'detach', reason: 'Clone data at source.colIndex could not be reached.' });
          return;
        }

        let reordered = [];

        for (let i = 0; i < targetData.length; i++) {
          // Skip iteration if index is the dragged list item
          if (i === source.listItemIndex) continue;

          // If the iteration is the detached position, push dragged list item
          if (i === newCollectionListItemIndex) {
            const originalData = carousels.current[source.colIndex].data;
            if (originalData) reordered.push(originalData[source.listItemIndex]);
          }

          // Push iteration's list item
          reordered.push(targetData[i]);
        }

        // Mutate clone
        // console.log(clone[0].data?.map((i) => i.title));
        clone[source.colIndex].data = reordered;
        // console.log(clone[0].data?.map((i) => i.title));

        // Handle DOM manipulation
        const collection: HTMLElement = collectionRefs.current[source.colIndex];
        const collectionUl: HTMLUListElement | null = collection.querySelector('ul');

        if (collectionUl instanceof HTMLUListElement) {
          const arr = Array.from(collectionUl.children) as Array<HTMLLIElement | HTMLDivElement>;

          // Remove the list item from its original position
          const listItemTarget = arr.splice(source.listItemIndex, 1)[0];

          // Slice the array into before and after parts
          const before = arr.slice(0, newCollectionListItemIndex);
          const after = arr.slice(newCollectionListItemIndex);

          // Replace collectionUl's children with the reordered array
          collectionUl.replaceChildren(...before, listItemTarget, ...after);
        }
      }

      // Update carousels reference when user drops and drags a list item in a new collection
      function handleNewCollection(): void {
        // Identify collections
        const originalCollection = clone[source.colIndex].data;
        const newCollection = clone[target.colIndex].data;

        if (!originalCollection) {
          resetInteraction({ event: 'detach', reason: 'Clone data at source.colIndex could not be reached.' });
          return;
        }

        if (!newCollection) {
          resetInteraction({ event: 'detach', reason: 'Clone data at target.colIndex could not be reached.' });
          return;
        }

        // Add list item to new collection
        let reordered = [];

        for (let i = 0; i < newCollection.length; i++) {
          // Skip iteration if index is the dragged list item
          if (i === source.listItemIndex) continue;

          // If the iteration is the detached position, push dragged list item
          if (i === newCollectionListItemIndex) {
            const originalData = clone[source.colIndex].data;
            if (originalData) reordered.push(originalData[source.listItemIndex]);
          }

          // Push iteration's list item
          reordered.push(newCollection[i]);
        }

        // Remove list item from original collection
        originalCollection.splice(source.listItemIndex, 1);

        // Mutate clone
        clone[target.colIndex].data = reordered;
      }

      // Handle cases where the list item is being dragged to the same collection or a new collection
      if (target.colIndex === source.colIndex) handleSameCollection();
      else handleNewCollection();

      // Update carousels.current
      // carousels.current = clone;

      // Handle DOM manipulation
      const collection: HTMLElement = collectionRefs.current[source.colIndex];
      const collectionUl: HTMLUListElement | null = collection.querySelector('ul');

      if (collectionUl instanceof HTMLUListElement) {
        const arr = Array.from(collectionUl.children) as Array<HTMLLIElement | HTMLDivElement>;
        collectionUl.insertBefore(arr[source.listItemIndex], arr[newCollectionListItemIndex]);
      } else {
        resetInteraction({ event: 'detach', reason: `Failure to identify collection's unordered list.` });
        return;
      }
    } else {
      if (!(currentTarget instanceof HTMLUListElement)) {
        resetInteraction({ event: 'detach', reason: `event.target is not an instance of HTMLULListElement. ${typeof event.target}` });
        return;
      }
      if (!(source.listItem instanceof HTMLLIElement)) {
        resetInteraction({ event: 'detach', reason: `source.listItem is not an instance of HTMLLIElement. ${typeof source.listItem}` });
        return;
      }
    }

    resetInteraction();
    return;
  }

  /**
   * @function pointerMove
   * @returns {void}
   * @description Tracks collections and their items
   */
  function pointerMove(): void {
    if (isEditMode && sensor.isInteract && !sensor.isActiveElement && source.listItem instanceof HTMLLIElement && ulRef.current) {
      ulRef.current.removeEventListener('pointermove', pointerMove);
      ulRef.current.removeEventListener('pointerup', pointerUp);

      ulRef.current.addEventListener('pointerup', detachListItem);
      source.listItem.addEventListener('pointermove', attachListItem);
      // originalCollectionListItem.addEventListener('pointerup', detachListItem);
      sensor.isActiveElement = true;
    }
  }

  /**
   * @function pointerUp
   * @returns {void}
   * @description Scales all list items and applies filters to their images then invokes @func `resetInteraction`
   *
   */
  function pointerUp(): void {
    if (!isEditMode && !sensor.isActiveElement) {
      const listItems: Element[] | null = ulRef.current ? Array.from(ulRef.current.children) : null;

      if (!listItems) {
        resetInteraction({ event: 'up', reason: 'Failure to identify list items.' });
        return;
      }

      const elementIndex: number = listItems.findIndex((item) => item === source.listItem);

      if (elementIndex === NOT_FOUND_INDEX) {
        resetInteraction({ event: 'up', reason: 'Element index not found.' });
        return;
      }

      for (let i = 0; i < listItems.length; i++) {
        listItems[i].setAttribute('data-list-item-visible', i === elementIndex ? 'true' : 'false');
      }
    } else {
      if (isEditMode) resetInteraction({ event: 'up', reason: 'Edit mode is enabled.' });
      if (sensor.isActiveElement) resetInteraction({ event: 'up', reason: 'An element is already active.' });
      return;
    }

    resetInteraction();
  }

  /**
   * @function useEffect
   * @returns {void}
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
  }, [isEditMode]);

  /**
   * @function FDCollectionsCollection
   * @returns {JSX.Element}
   */
  return (
    <section className='fdCollections__collection' ref={collectionRef}>
      <FDCollectionsCollectionHeader header={header} />
      <FDCollectionsCollectionUl mapIndex={mapIndex} data={data} display={display} isEditMode={isEditMode} ulRef={ulRef} />
    </section>
  );
});

export default FDCollectionsCollection;
