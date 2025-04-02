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
  // This collection's references
  const ulRef = useRef<HTMLUListElement>(null);

  /**
   * @function resetInteraction
   * @returns {void}
   * Handle storage of the entire interaction's dependencies and event listeners
   */
  let isInteract: boolean = false;
  let isActiveElement: boolean = false;

  let pointerCoordinates: Record<'x' | 'y', number | null> = { x: null, y: null };

  let originalCollectionIndex: number = -1;
  let originalCollectionListItemIndex: number = -1;

  let newCollectionIndex: number = -1;
  let originalCollectionListItem: HTMLLIElement | null = null;
  let newCollectionListItemIndex: number = -1;

  function resetInteraction(): void {
    // Remove target's inline styles and event listeners
    if (originalCollectionListItem instanceof HTMLLIElement) {
      if (originalCollectionListItem.hasAttribute('style')) originalCollectionListItem.removeAttribute('style');
      originalCollectionListItem.removeEventListener('pointermove', attachListItem);
      // originalCollectionListItem.removeEventListener('pointerup', detachListItem);
    }

    // Re-add event listeners to ulRef
    if (ulRef.current) {
      ulRef.current.addEventListener('pointermove', pointerMove);
      ulRef.current.addEventListener('pointerup', pointerUp);
    }

    // Reset dependencies
    isInteract = false;
    isActiveElement = false;

    isInteract = false;
    isActiveElement = false;

    pointerCoordinates = { x: null, y: null };

    originalCollectionIndex = -1;
    originalCollectionListItem = null;
    originalCollectionListItemIndex = -1;

    newCollectionIndex = -1;
    newCollectionListItemIndex = -1;
  }

  /**
   * @function pointerDown
   * @returns void
   * @description Sets interactivity in motion by toggling a flag and assigning dependency values
   */

  const pointerDown = (event: PointerEvent): void => {
    const currentTarget = event.currentTarget;
    const target = event.target;

    if (currentTarget instanceof HTMLUListElement && target instanceof HTMLLIElement) {
      isInteract = true;

      pointerCoordinates = { x: event.clientX, y: event.clientY };

      originalCollectionIndex = collectionRefs.current.findIndex((collection) => collection.querySelector('ul') === currentTarget);

      originalCollectionListItem = target as HTMLLIElement;

      const originalCollectionUl = collectionRefs.current[originalCollectionIndex].querySelector('ul');

      if (originalCollectionIndex === -1 || !originalCollectionUl) {
        resetInteraction();
        console.log('Event pointerdown rejection: Original Collection Index === -1 OR originalCollectionUl unavailable.');
        return;
      }

      const liElements = Array.from(originalCollectionUl.children) as Array<HTMLLIElement | HTMLDivElement>;
      const targetIndex: number = liElements.findIndex((li) => li === target);
      originalCollectionListItemIndex = targetIndex;

      if (originalCollectionListItemIndex === -1) {
        resetInteraction();
        console.log('Event pointerdown rejection: Original Collection List Item Index === -1');
        return;
      }
    } else {
      resetInteraction();
      return;
    }
  };

  /**
   * @function attachListItem
   * @returns {void}
   * @description Attaches active list item to cursor
   */
  function attachListItem(event: PointerEvent): void {
    const x: number | null = pointerCoordinates.x;
    const y: number | null = pointerCoordinates.y;

    if (originalCollectionListItem instanceof HTMLLIElement && x && y) {
      const rect: DOMRect = originalCollectionListItem.getBoundingClientRect();
      const offsetX: number = x - rect.width / 2;
      const offsetY: number = y - rect.height / 2;

      originalCollectionListItem.style.cssText = `position: absolute; z-index: 2; left: ${offsetX}px; top: ${offsetY}px;`;
      pointerCoordinates = { x: event.clientX, y: event.clientY };
    } else {
      if (!x) {
        console.log('Event pointerdown pointermove (attach) rejection: X may be null.');
      } else if (!y) {
        console.log('Event pointerdown pointermove (attach) rejection: Y may be null.');
      } else {
        console.log('Event pointerdown pointermove (attach) rejection: Target may not be an instanceof HTMLLIElement.');
      }
    }
  }

  /**
   * @function detachListItem
   * @returns {void}
   * @description Detaches active list item from cursor, handles transfer of list item inbetween collections
   */

  function detachListItem(event: PointerEvent): void {
    const currentTarget: EventTarget | null = event.currentTarget;

    if (currentTarget instanceof HTMLUListElement && originalCollectionListItem instanceof HTMLLIElement && collectionRefs.current) {
      // Get index of new collection (currentTarget)
      newCollectionIndex = collectionRefs.current.findIndex((collection) => collection.querySelector('ul') === currentTarget);

      if (newCollectionIndex === -1) {
        console.log('Event pointerup (detach) rejection: newCollectionIndex === -1');
        resetInteraction();
        return;
      }

      // Get detachment position
      const detach: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY };

      // Get new collection's unordered list
      const newCollection: HTMLElement = collectionRefs.current[newCollectionIndex];
      const newCollectionUl: HTMLUListElement | null = newCollection.querySelector('ul');
      if (!newCollectionUl) {
        console.log('Event pointerup (detach) rejection: newCollectionUl may be null.');
        resetInteraction();
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
          if (index === originalCollectionListItemIndex) return closest;

          const rectCenterX = rect.left + rect.width / 2;
          const rectCenterY = rect.top + rect.height / 2;
          const distance = Math.sqrt(Math.pow(rectCenterX - detach.x, 2) + Math.pow(rectCenterY - detach.y, 2));

          // If closest rect isn't available yet or the current rect is closer, return updated acc with rect and index
          if (distance < closest.distance) {
            return { rect, index, distance };
          }

          return closest;
        },
        { rect: null, index: -1, distance: Infinity }
      ).index;

      // Edge case: User drops list item on itself
      if (originalCollectionIndex === newCollectionIndex && originalCollectionListItemIndex === newCollectionListItemIndex) {
        resetInteraction();
        return;
      }

      //  else {
      //   console.log(
      //     originalCollectionIndex === newCollectionIndex,
      //     `originalCollectionIndex: ${originalCollectionIndex}, newCollectionIndex: ${newCollectionIndex}`
      //   );
      //   console.log(
      //     originalCollectionListItemIndex === newCollectionListItemIndex,
      //     `originalCollectionListItemIndex: ${originalCollectionListItemIndex}, newCollectionListItemIndex: ${newCollectionListItemIndex}`
      //   );
      // }

      // Create a deep clone of state
      let clone = carousels.current.map((collection) => ({
        ...collection,
        data: collection.data ? [...collection.data] : undefined,
      }));

      // Update carousels reference when user drops and drags a list item in the same collection
      function handleSameCollection() {
        let targetData = clone[originalCollectionIndex].data;

        if (!targetData) {
          console.log('Event pointerup (detach) rejection: handleSameCollection misfire, targetData unavailable.');
          resetInteraction();
          return;
        }

        let reordered = [];

        for (let i = 0; i < targetData.length; i++) {
          // Skip iteration if index is the dragged list item
          if (i === originalCollectionListItemIndex) continue;

          // If the iteration is the detached position, push dragged list item
          if (i === newCollectionListItemIndex) {
            const originalData = carousels.current[originalCollectionIndex].data;
            if (originalData) reordered.push(originalData[originalCollectionListItemIndex]);
          }

          // Push iteration's list item
          reordered.push(targetData[i]);
        }

        // Mutate clone
        console.log(clone[0].data?.map((i) => i.title));
        clone[originalCollectionIndex].data = reordered;
        console.log(clone[0].data?.map((i) => i.title));

        // Handle DOM manipulation
        const collection: HTMLElement = collectionRefs.current[originalCollectionIndex];
        const collectionUl: HTMLUListElement | null = collection.querySelector('ul');

        if (collectionUl instanceof HTMLUListElement) {
          const arr = Array.from(collectionUl.children) as Array<HTMLLIElement | HTMLDivElement>;

          // Remove the list item from its original position
          const listItemTarget = arr.splice(originalCollectionListItemIndex, 1)[0];

          // Slice the array into before and after parts
          const before = arr.slice(0, newCollectionListItemIndex);
          const after = arr.slice(newCollectionListItemIndex);

          // Replace collectionUl's children with the reordered array
          collectionUl.replaceChildren(...before, listItemTarget, ...after);
        }
      }

      // Update carousels reference when user drops and drags a list item in a new collection
      function handleNewCollection() {
        // Identify collections
        const originalCollection = clone[originalCollectionIndex].data;
        const newCollection = clone[newCollectionIndex].data;

        if (!originalCollection || !newCollection) {
          console.log('Event pointerup (detach) rejection: handleNewCollection misfire, originalCollection or newCollection may be unavailable.');
          resetInteraction();
          return;
        }

        // Add list item to new collection
        let reordered = [];

        for (let i = 0; i < newCollection.length; i++) {
          // Skip iteration if index is the dragged list item
          if (i === originalCollectionListItemIndex) continue;

          // If the iteration is the detached position, push dragged list item
          if (i === newCollectionListItemIndex) {
            const originalData = clone[originalCollectionIndex].data;
            if (originalData) reordered.push(originalData[originalCollectionListItemIndex]);
          }

          // Push iteration's list item
          reordered.push(newCollection[i]);
        }

        // Remove list item from original collection
        originalCollection.splice(originalCollectionListItemIndex, 1);

        // Mutate clone
        clone[newCollectionIndex].data = reordered;
      }

      // Handle cases where the list item is being dragged to the same collection or a new collection
      if (newCollectionIndex === originalCollectionIndex) handleSameCollection();
      else handleNewCollection();

      // Update carousels.current
      // carousels.current = clone;

      // Handle DOM manipulation
      const collection: HTMLElement = collectionRefs.current[originalCollectionIndex];
      const collectionUl: HTMLUListElement | null = collection.querySelector('ul');

      if (collectionUl instanceof HTMLUListElement) {
        const arr = Array.from(collectionUl.children) as Array<HTMLLIElement | HTMLDivElement>;
        collectionUl.insertBefore(arr[originalCollectionListItemIndex], arr[newCollectionListItemIndex]);
      }
    } else {
      if (!(currentTarget instanceof HTMLUListElement)) {
        console.log('Event pointerup detach rejection: Current target is not an instance of HTMLULListElement.');
      }
      if (!(originalCollectionListItem instanceof HTMLLIElement)) {
        console.log('Event pointerup detach rejection: Target is not an instance of HTMLLIElement.');
      }
    }

    resetInteraction();
  }

  /**
   * @function pointerMove
   * @returns {void}
   * @description Tracks collections and their items
   */
  const pointerMove = (): void => {
    if (isEditMode && isInteract && !isActiveElement && originalCollectionListItem instanceof HTMLLIElement && ulRef.current) {
      ulRef.current.removeEventListener('pointermove', pointerMove);
      ulRef.current.removeEventListener('pointerup', pointerUp);

      ulRef.current.addEventListener('pointerup', detachListItem);
      originalCollectionListItem.addEventListener('pointermove', attachListItem);
      // originalCollectionListItem.addEventListener('pointerup', detachListItem);
      isActiveElement = true;
    }
    //  else {
    //   if (!isEditMode) {
    //     console.log('Event pointermove rejection: Edit mode is not enabled.');
    //   } else if (!isInteract) {
    //     console.log('Event pointermove rejection: Flag isInteract is false.');
    //   } else if (isActiveElement) {
    //     console.log('Event pointermove rejection: There is already an active element.');
    //   } else if (!(originalCollectionListItem instanceof HTMLLIElement)) {
    //     console.log('Event pointermove rejection: Target is not an instanceof HTMLLIElement.');
    //   } else if (!ulRef.current) {
    //     console.log('Event pointermove rejection: ulRef.current is not available.');
    //   } else {
    //     return;
    //   }
    // }
  };

  /**
   * @function pointerUp
   * @returns {void}
   * @description Scales all list items and applies filters to their images then invokes @func `resetInteraction`
   *
   */
  const pointerUp = (): void => {
    // Visibility effect
    if (!isEditMode && !isActiveElement) {
      const listItems: Element[] | null = ulRef.current ? Array.from(ulRef.current.children) : null;

      if (listItems) {
        const elementIndex: number = listItems.findIndex((item) => item === originalCollectionListItem);

        if (elementIndex !== -1) {
          for (let i = 0; i < listItems.length; i++) {
            listItems[i].setAttribute('data-list-item-visible', i === elementIndex ? 'true' : 'false');
          }
        }
      } else {
        console.log('Event pointerup rejection: List items may be null.');
      }
    } else {
      if (isEditMode) {
        console.log('Event pointerup rejection: Edit mode is enabled.');
      }
      if (isActiveElement) {
        console.log('Event pointerup rejection: An element is already active.');
      }
    }

    // Reset interaction dependencies
    isInteract = false;
  };

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
