import { useRef, useEffect, useState, forwardRef } from 'react';
import { TablerCategoryFilled, TablerCategoryPlus } from '~/film-database/assets/google-material-symbols/GoogleMaterialIcons';
import type { Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';

type Props = { header: string; data: Namespace_Tmdb.BaseMedia_Provider[] | undefined[]; display: 'flex' | 'grid'; isEdit: boolean };

const FDUserCarousel = forwardRef<HTMLElement, Props>(({ header, data, display, isEdit }, collectionRef) => {
  const ulRef = useRef<HTMLUListElement>(null);

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

  const pointerMove = (): void => {
    if (isInteract) {
      // Debounce isDragging to allow for minor mouse movement post click to allow for wiggle room
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => (isDragging = true), 50);
    }
  };

  /**
   * @function pointerLeave
   */
  const pointerLeave = (): void => {
    if (isDragging) {
      clearTimeout(timeoutId);
      isInteract = false;
      isDragging = false;
    }
  };

  /**
   * @function pointerUp
   */
  const pointerUp = (event: PointerEvent): void => {
    clearTimeout(timeoutId);
    if (!isDragging && !isEdit) animateListItems(event);

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
  }, []);

  /**
   * @function animateListItems
   * Scales all list items and applies filters to their images
   */
  function animateListItems(event: PointerEvent): void {
    if (!isDragging) {
      const listItems: Element[] | null = ulRef.current ? [...ulRef.current.children] : null;

      if (listItems) {
        const element: Node | null = !isDragging ? (event.target as Node) : null;
        const elementIndex: number = listItems.findIndex((item) => item === element);

        if (element && elementIndex !== -1) {
          // Iterate ulRef.current.children to disable/enable data-attr
          for (let i = 0; i < listItems.length; i++) {
            listItems[i].setAttribute('data-vis', i === elementIndex ? 'true' : 'false');
          }
        }
      }
    }
  }

  return (
    <section className='fdUserList__collections__wrapper' ref={collectionRef}>
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
