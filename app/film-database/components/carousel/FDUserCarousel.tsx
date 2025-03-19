import { useRef, useEffect, useState, forwardRef } from 'react';
import { TablerCategoryFilled } from '~/film-database/assets/svg/icons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

type Props = { header: string; data: Namespace_Tmdb.BaseMedia_Provider[] | undefined[]; display: 'flex' | 'grid'; isEdit: boolean };

const FDUserCarousel = forwardRef<HTMLElement, Props>(({ header, data, display, isEdit }, collectionRef) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const listItems: Element[] | null = ulRef.current ? [...ulRef.current.children] : null;

  /** Carousel interactivity */
  const [layout, setLayout] = useState<'flex' | 'grid'>(display);
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
    // startingPosition =
    const elementWidth: number = target.offsetWidth / 2;
    const elementHeight: number = target.offsetHeight / 2;
    target.style.position = 'absolute';
    target.style.transform = `translate(${event.clientX - elementWidth}px, ${event.clientY - elementHeight}px)`;
  }

  function detachListItem(event: PointerEvent): void {
    // if (xyz) {
    // } else {
    //   // If element is not in valid parameters, reset position
    //   // event.target.style.position = 'relative';
    // }

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
    if (isEdit && isDragging && !isActiveElement && event.target instanceof HTMLLIElement) {
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
  }, [isEdit]);

  /**
   * @function animateListItems
   * Scales all list items and applies filters to their images
   */
  function animateListItems(event: PointerEvent): void {
    if (!isEdit && !isDragging && listItems) {
      const elementIndex: number = listItems.findIndex((item) => item === event.target);

      if (elementIndex !== -1) {
        // Iterate ulRef.current.children to disable/enable data-attr
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].setAttribute('data-vis', i === elementIndex ? 'true' : 'false');
        }
      }
    }
  }

  return (
    <section className='fdUserCarousel' ref={collectionRef}>
      <header>
        <TablerCategoryFilled />
        <h2>{header}</h2>
      </header>
      <ul ref={ulRef} data-layout={layout} data-edit='false'>
        {data.map((movie, index) => (
          <li key={`movie-list-key-${movie ? movie.id : index}`} data-vis={index === 0 ? 'true' : 'false'}>
            <picture>{movie && <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={`${movie.title}`} fetchPriority={'high'} />}</picture>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default FDUserCarousel;
