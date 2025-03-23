import { useRef, useEffect, forwardRef, type Dispatch, type SetStateAction, type JSX } from 'react';
import { IcBaselinePlus, TablerCategoryFilled } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

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
  setCarousels: Dispatch<
    SetStateAction<
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
    // Dynamic integer limitation of list items in a carousel
    const { maxCarouselNodes } = useCatalogProvider();

    // This collection's references
    const ulRef = useRef<HTMLUListElement>(null);
    const listItems: Element[] | null = ulRef.current ? [...ulRef.current.children] : null;

    /**
     * @function pointerDown
     * @returns void
     * @description Sets interactivity in motion by toggling a flag and assigning dependency values
     */
    let isInteract: boolean = false;
    let targetCollection: HTMLUListElement | null = null;
    let targetElement: HTMLLIElement | null = null;

    const pointerDown = (event: PointerEvent): void => {
      if (event.currentTarget instanceof HTMLUListElement && event.target instanceof HTMLLIElement) {
        isInteract = true;
        targetCollection = event.currentTarget;
        targetElement = event.target;
      }
    };

    /**
     * @function detachListItem
     * @returns {void}
     * @description Attaches active list item to cursor
     */
    function attachListItem(event: PointerEvent): void {
      if (event.target instanceof HTMLLIElement) {
        const target = event.target;

        target.style.position = 'absolute';
        target.style.zIndex = '2';
        target.style.transform = `translate(${event.clientX - target.offsetWidth}px, ${event.clientY - target.offsetHeight}px)`;
      }
    }

    /**
     * @function detachListItem
     * @returns {void}
     * @description Detaches active list item from cursor
     */
    let isActiveElement: boolean = false;

    function detachListItem(event: PointerEvent): void {
      // Get position of the list item the user is interacting with upon detachment
      const detach: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY };

      // Create array containing all carousel's rects
      let collectionsRect: Array<Record<'top' | 'right' | 'bottom' | 'left', number>> = [];

      for (const collection of collectionRefs.current) {
        const unorderedList = Array.from(collection.children)[1] as HTMLUListElement;
        const rect: DOMRect = unorderedList.getBoundingClientRect();
        collectionsRect.push({ top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left });
      }

      // Check for a valid detach area
      let validCollectionIndex: number | null = null;

      for (let i = 0; i < collectionsRect.length; i++) {
        const { top, right, bottom, left } = collectionsRect[i];

        // Check if the detach is within the bounds of this collection
        if (detach.x >= left && detach.x <= right && detach.y >= top && detach.y <= bottom) {
          validCollectionIndex = i;
          break;
        }
      }

      // Handle detachment validation
      if (validCollectionIndex !== null) {
        const targetCollection: HTMLElement = collectionRefs.current[validCollectionIndex];
        const unorderedList: HTMLUListElement = Array.from(targetCollection.children)[1] as HTMLUListElement;
        const listItems: HTMLLIElement[] = Array.from(unorderedList.children) as HTMLLIElement[];

        // Identify closest list item position to the detachment position
        let closestItemIndex: number = -1;
        let closestDistance: number = Number.MAX_VALUE;

        for (let i = 0; i < listItems.length; i++) {
          const itemRect: DOMRect = listItems[i].getBoundingClientRect();
          const distance: number = Math.abs(detach.y - itemRect.top);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestItemIndex = i;
          }
        }

        // If valid index is available, add item to closest collection
        if (closestItemIndex !== -1) {
          // Remove list item from original collection
          const originalCollection: HTMLElement | null = (event.target as HTMLLIElement).parentElement;
          originalCollection?.removeChild(event.target as HTMLLIElement);

          // Add list item to closest collection
          unorderedList.insertBefore(event.target as HTMLLIElement, listItems[closestItemIndex] || null);
        }
      }

      // Reset inline styles
      (event.target as HTMLLIElement).style.position = 'relative';
      (event.target as HTMLLIElement).style.zIndex = '1';
      (event.target as HTMLLIElement).style.transform = '';

      // Remove event listeners
      (event.target as HTMLLIElement).removeEventListener('pointermove', attachListItem);
      (event.target as HTMLLIElement).removeEventListener('pointerup', detachListItem);
      isActiveElement = false;
    }

    /**
     * @function pointerMove
     * @returns {void}
     * @description Tracks collections and their items
     */
    let isDragging: boolean = false;
    let timeoutId: NodeJS.Timeout;

    const pointerMove = (event: PointerEvent): void => {
      if (isInteract && !isDragging) {
        // Debounce isDragging to allow for minor mouse movement post click to allow for wiggle room for pointerUp
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => (isDragging = true), 20);
      }
      // Attach and detach list item from cursor for user movie categorization
      if (isEditMode && isDragging && !isActiveElement && event.target instanceof HTMLLIElement) {
        event.target.addEventListener('pointermove', attachListItem);
        event.target.addEventListener('pointerup', detachListItem);
        isActiveElement = true;
      }
    };

    /**
     * @function resetInteraction
     * @returns {void}
     * @description Resets interaction dependencies
     */
    const resetInteraction = (): void => {
      clearTimeout(timeoutId);
      isInteract = false;
      isDragging = false;
      targetCollection = null;
      targetElement = null;
    };

    /**
     * @function pointerUp
     * @returns {void}
     * @description Scales all list items and applies filters to their images then invokes @func `resetInteraction`
     *
     */
    const pointerUp = (event: PointerEvent): void => {
      if (!isEditMode && !isDragging && listItems) {
        const elementIndex: number = listItems.findIndex((item) => item === event.target);

        if (elementIndex !== -1) {
          // Iterate ulRef.current.children to disable/enable data-attr
          for (let i = 0; i < listItems.length; i++) {
            listItems[i].setAttribute('data-list-item-visible', i === elementIndex ? 'true' : 'false');
          }
        }
      }
      resetInteraction();
    };

    /**
     * @function useEffect
     * @returns {void}
     * @description Handles module's event listeners
     */
    useEffect(() => {
      ulRef.current?.addEventListener('pointerdown', pointerDown);
      ulRef.current?.addEventListener('pointermove', pointerMove);
      ulRef.current?.addEventListener('pointerleave', resetInteraction);
      ulRef.current?.addEventListener('pointerup', pointerUp);

      return () => {
        ulRef.current?.removeEventListener('pointerdown', pointerDown);
        ulRef.current?.removeEventListener('pointermove', pointerMove);
        ulRef.current?.removeEventListener('pointerleave', resetInteraction);
        ulRef.current?.removeEventListener('pointerup', pointerUp);
      };
    }, [isEditMode]);

    /**
     * @function ListItem
     * @function @EmptyListItem
     * @function Collection
     * @returns {JSX.Element}
     * @description Simplifies otherwise convoluted JSX mappings
     */
    const ListItem = ({ movie, index }: { movie: Namespace_Tmdb.BaseMedia_Provider; index: number }): JSX.Element => {
      return (
        <li data-list-item-visible={index === 0 ? 'true' : 'false'}>
          <picture>{movie && <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={`${movie.title}`} fetchPriority={'high'} />}</picture>
        </li>
      );
    };

    const EmptyListItem = (): JSX.Element => {
      return (
        <div>
          <span />
          <IcBaselinePlus />
        </div>
      );
    };

    const Collection = () => {
      // If data has list items
      if (data && data.length > 0) {
        // Create new array of list items with data
        let initMap = data.map((movie, index) => <ListItem movie={movie} index={index} key={`collection-${mapIndex}-listItem-${index}`} />);

        // If initMap's length is greater than or equal to maxcarouselNodes, return initMap
        if (initMap.length + 1 >= maxCarouselNodes) {
          initMap.push(<EmptyListItem key={`collection-${mapIndex}-emptyListItem-${initMap.length + 1}`} />);
          return initMap;
        }

        // If initMap isn't at least the length of maxCarouselNodes, push empty lists
        for (let i = 0; i < maxCarouselNodes; i++) {
          let listAtIndex = initMap[i];
          if (!listAtIndex) initMap.push(<EmptyListItem key={`collection-${mapIndex}-emptyListItem-${initMap.length + i + 1}`} />);
        }

        // Else return initMap
        return initMap;
      }

      // If data is empty
      const EmptyList = Array.from({ length: maxCarouselNodes }).map((eli, index) => <EmptyListItem key={`collection-${mapIndex}-emptyListItem-${index}`} />);
      return EmptyList;
    };

    /**
     * @function FDCollectionsCollection
     * @returns {JSX.Element}
     */
    return (
      <section className='fdCollections__collection' ref={collectionRef}>
        <header>
          <TablerCategoryFilled />
          <h2 contentEditable='true' suppressContentEditableWarning={true}>
            {header.length > 0 ? header : 'Unnamed Collection'}
          </h2>
        </header>
        <ul ref={ulRef} data-layout={display} data-list-item-fx='true' data-edit-mode={isEditMode}>
          <Collection />
        </ul>
      </section>
    );
  }
);

export default FDCollectionsCollection;
