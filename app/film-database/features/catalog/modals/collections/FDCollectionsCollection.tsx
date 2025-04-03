import { useRef, useEffect, forwardRef, type Dispatch, type SetStateAction } from 'react';
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
  carousels: {
    header: string;
    data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
    display: 'flex' | 'grid';
  }[];
  setCarousels: React.Dispatch<
    React.SetStateAction<
      {
        header: string;
        data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
        display: 'flex' | 'grid';
      }[]
    >
  >;
};

const FDCollectionsCollection = forwardRef<HTMLElement, Props>(
  ({ mapIndex, header, data, display, isEditMode, collectionRefs, carousels, setCarousels }, collectionRef) => {
    const ulRef = useRef<HTMLUListElement>(null);

    const NOT_FOUND_INDEX = -1 as const;

    let sensor: {
      isInteract: boolean;
      isActiveElement: boolean;
      pointerCoords: Record<'x' | 'y', number | null>;
    } = {
      isInteract: false,
      isActiveElement: false,
      pointerCoords: { x: null, y: null },
    };

    let source: {
      colIndex: number;
      listItem: HTMLLIElement | null;
      listItemIndex: number;
    } = {
      colIndex: NOT_FOUND_INDEX,
      listItem: null,
      listItemIndex: NOT_FOUND_INDEX,
    };

    let target: {
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
      if (source.listItem && source.listItem.hasAttribute('style')) source.listItem.style.cssText = '';
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
      }
      // else {
      //   if (!(source.listItem instanceof HTMLLIElement)) resetInteraction({ event: 'attach', reason: `event.target instance of ${typeof event.target}` });
      //   if (!x) resetInteraction({ event: 'attach', reason: 'sensor.pointerCoordinates.x is not valid.' });
      //   if (!y) resetInteraction({ event: 'attach', reason: 'sensor.pointerCoordinates.y is not valid.' });
      //   return;
      // }
    }

    /**
     * @function detachListItem
     * @returns {void}
     * @description Detaches active list item from cursor, handles transfer of list item inbetween collections
     */

    function detachListItem(event: PointerEvent): void {
      // Get index of new collection (currentTarget)
      target.colIndex = collectionRefs.current.findIndex((collection) => collection.querySelector('ul') === event.currentTarget);

      if (target.colIndex === NOT_FOUND_INDEX) {
        resetInteraction({ event: 'detach', reason: 'target.colIndex is not valid.' });
        return;
      }

      // Get detachment position
      const detach: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY };

      // Get new collection's unordered list
      const targetCol: HTMLElement = collectionRefs.current[target.colIndex];
      const targetColUl: HTMLUListElement | null = targetCol.querySelector('ul');

      if (!targetColUl) {
        resetInteraction({ event: 'detach', reason: 'Failure to identify target.colIndex.' });
        return;
      }

      // Get new collection's list item rects
      const targetColListItems = Array.from(targetColUl.children) as Array<HTMLDivElement | HTMLLIElement>;
      const targetColRects: DOMRect[] = targetColListItems.map((li) => li.getBoundingClientRect());

      // Find the closest item index to the detach point
      target.listItemIndex = targetColRects.reduce<{
        rect: DOMRect | null;
        index: number;
        distance: number;
      }>(
        (closest, rect, index) => {
          // Skip iteration to prevent the return from being solely the list item's index
          if (index === source.listItemIndex) return closest;

          // Find center of rect
          const rectCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          // Calculate uclidean distance sqrt(x2-x1)^2 + (y2-y1)^2
          const distance = Math.sqrt(Math.pow(rectCenter.x - detach.x, 2) + Math.pow(rectCenter.y - detach.y, 2));

          // If the current rect is closer, update closest
          if (distance < closest.distance) return { rect, index, distance };

          // If this rect is farther, keep the previous closest
          return closest;
        },
        { rect: null, index: NOT_FOUND_INDEX, distance: Infinity }
      ).index;

      // Create a deep clone of state
      let clone = carousels.map((collection) => ({
        ...collection,
        data: collection.data ? [...collection.data] : undefined,
      }));

      // Update carousels reference when user drops and drags a list item in the same collection
      function handleSourceCol(): void {
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
          if (i === target.listItemIndex) {
            const originalData = carousels[source.colIndex].data;

            if (!originalData) {
              resetInteraction({ event: 'detach', reason: 'source.colIndex data is unavailable.' });
              return;
            }

            reordered.push(originalData[source.listItemIndex]);
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
          const before = arr.slice(0, target.listItemIndex);
          const after = arr.slice(target.listItemIndex);

          // Replace collectionUl's children with a reordered array
          collectionUl.replaceChildren(...before, listItemTarget, ...after);
        } else {
          resetInteraction({ event: 'detach', reason: 'collectionUl type is not HTMLUListElement.' });
        }
      }

      // Update carousels reference when user drops and drags a list item in a new collection
      function handleTargetCol(): void {
        // Identify collections
        const originalCollection = clone[source.colIndex].data;
        const targetCol = clone[target.colIndex].data;

        if (!originalCollection) {
          resetInteraction({ event: 'detach', reason: 'Clone data at source.colIndex could not be reached.' });
          return;
        }

        if (!targetCol) {
          resetInteraction({ event: 'detach', reason: 'Clone data at target.colIndex could not be reached.' });
          return;
        }

        // Add list item to new collection
        let reordered = [];

        for (let i = 0; i < targetCol.length; i++) {
          // Skip iteration if index is the dragged list item
          if (i === source.listItemIndex) continue;

          // If the iteration is the detached position, push dragged list item
          if (i === target.listItemIndex) {
            const originalData = clone[source.colIndex].data;
            if (originalData) reordered.push(originalData[source.listItemIndex]);
          }

          // Push iteration's list item
          reordered.push(targetCol[i]);
        }

        // Remove list item from original collection
        originalCollection.splice(source.listItemIndex, 1);

        // Mutate clone
        clone[target.colIndex].data = reordered;
      }

      // Handle cases where the list item is being dragged to the same collection or a new collection
      if (target.colIndex === source.colIndex) handleSourceCol();
      else handleTargetCol();

      // Handle state, reset interaction
      setCarousels((state) => {
        return state.map((col, index) => (index === target.colIndex ? { ...col, data: clone[target.colIndex].data } : col));
      });

      resetInteraction();
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
  }
);

export default FDCollectionsCollection;
