import { useRef, useEffect, forwardRef, type Dispatch, type SetStateAction } from 'react';
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

const FDCollectionsCollection = forwardRef<HTMLElement, Props>(({ mapIndex, header, data, display, isEditMode, collectionRefs, setCarousels }, collectionRef) => {
  const { maxCarouselNodes } = useCatalogProvider();
  const ulRef = useRef<HTMLUListElement>(null);
  const listItems: Element[] | null = ulRef.current ? [...ulRef.current.children] : null;

  /** Carousel interactivity */
  let isInteract: boolean = false;
  let isDragging: boolean = false;

  /**
   * @function pointerDown
   */
  const pointerDown = (): void => {
    isInteract = true;
  };

  /**
   * @function pointerMove
   */
  let timeoutId: NodeJS.Timeout;
  let isActiveElement: boolean = false;

  function attachListItem(event: PointerEvent): void {
    const target = event.target as HTMLLIElement;
    const elementWidth: number = target.offsetWidth / 2;
    const elementHeight: number = target.offsetHeight / 2;
    target.style.position = 'absolute';
    target.style.transform = `translate(${event.clientX - elementWidth}px, ${event.clientY - elementHeight}px)`;
  }

  function detachListItem(event: PointerEvent): void {
    // Get position of the list item the user is interacting with upon detachment
    const detachmentPosition: Record<'x' | 'y', number> = { x: event.clientX, y: event.clientY };

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

      // Check if the detachmentPosition is within the bounds of this collection
      if (detachmentPosition.x >= left && detachmentPosition.x <= right && detachmentPosition.y >= top && detachmentPosition.y <= bottom) {
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
        const distance: number = Math.abs(detachmentPosition.y - itemRect.top);

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
    (event.target as HTMLLIElement).style.transform = '';

    // Remove event listeners
    (event.target as HTMLLIElement).removeEventListener('pointermove', attachListItem);
    (event.target as HTMLLIElement).removeEventListener('pointerup', detachListItem);
    isActiveElement = false;
  }

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
   * @function pointerLeave
   */
  const pointerLeave = (): void => {
    clearTimeout(timeoutId);
    isInteract = false;
    isDragging = false;
  };

  /**
   * @function pointerUp
   */
  const pointerUp = (event: PointerEvent): void => {
    animateListItems(event);
    clearTimeout(timeoutId);
    isInteract = false;
    isDragging = false;
  };

  useEffect(() => {
    ulRef.current?.addEventListener('pointerdown', pointerDown);
    ulRef.current?.addEventListener('pointermove', pointerMove);
    ulRef.current?.addEventListener('pointerleave', pointerLeave);
    ulRef.current?.addEventListener('pointerup', pointerUp);

    return () => {
      ulRef.current?.removeEventListener('pointerdown', pointerDown);
      ulRef.current?.removeEventListener('pointermove', pointerMove);
      ulRef.current?.removeEventListener('pointerleave', pointerLeave);
      ulRef.current?.removeEventListener('pointerup', pointerUp);
    };
  }, [isEditMode]);

  /**
   * @function animateListItems
   * Scales all list items and applies filters to their images
   */
  function animateListItems(event: PointerEvent): void {
    if (!isEditMode && !isDragging && listItems) {
      const elementIndex: number = listItems.findIndex((item) => item === event.target);

      if (elementIndex !== -1) {
        // Iterate ulRef.current.children to disable/enable data-attr
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].setAttribute('data-list-item-visible', i === elementIndex ? 'true' : 'false');
        }
      }
    }
  }

  return (
    <section className='fdCollections__collection' ref={collectionRef}>
      <header>
        <TablerCategoryFilled />
        <h2 contentEditable='true' suppressContentEditableWarning={true}>
          {header.length > 0 ? header : 'Unnamed Collection'}
        </h2>
      </header>
      <ul ref={ulRef} data-layout={display} data-list-item-fx='true' data-edit-mode={isEditMode}>
        {data && data.length > 0 ? (
          data.map((movie, index) => (
            <li key={`movie-list-key-${movie ? movie.id : index}`} data-list-item-visible={index === 0 ? 'true' : 'false'}>
              <picture>{movie && <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={`${movie.title}`} fetchPriority={'high'} />}</picture>
            </li>
          ))
        ) : (
          <>
            {Array.from({ length: maxCarouselNodes }).map((eli, index) => (
              <div key={`movie-list-empty-key-${index}`}>
                <span />
                <IcBaselinePlus />
              </div>
            ))}
          </>
        )}
      </ul>
    </section>
  );
});

export default FDCollectionsCollection;
