import { useEffect, useReducer, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useFirestore, type Firestore_UserDocument } from '~/base/firebase/firestore/hooks/useFirestore';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import useFormattedDate from '~/film-database/hooks/useFormattedDate';
import useVoteAvgVisual from '~/film-database/hooks/useVoteAvgVisual';

const FDMovieList = () => {
  const { primaryData } = useLoaderData();
  let flattenedPrimaryData: Namespace_Tmdb.BaseMedia_Provider[] | undefined = undefined;
  const [movies, setMovies] = useState<Namespace_Tmdb.BaseMedia_Provider[]>([]);
  const { isListModal } = useCatalogProvider();
  const ulRef = useRef<HTMLUListElement>(null);

  /**
   * @function fetchMovies
   * @returns Promise<void>
   * Utilizes primaryData from loaderData to prevent an api call
   * Flattens primary data from useLoaderData
   * Gets user document from Firestore
   * Filters flattenedPrimaryData to retrieve a list of user's saved movies
   */
  const fetchMovies = async (): Promise<void> => {
    // Flatten primaryData from loaderData
    if (!flattenedPrimaryData) {
      flattenedPrimaryData = (primaryData as Namespace_Tmdb.Response_Union[]).flatMap((entry) =>
        Object.values(entry).flatMap((subEntry) => subEntry.results || [])
      ) as Namespace_Tmdb.BaseMedia_Provider[];
    }

    // Get user's collection document
    const collection: Firestore_UserDocument | undefined = await useFirestore.getDocument('users');
    if (!collection) return;

    // Get, filter and set movies from clientLoader's primaryData to prevent api call
    const movieSet: Set<number> = new Set(collection.movies);
    const moviesArr: Namespace_Tmdb.BaseMedia_Provider[] = flattenedPrimaryData.filter(
      (movie, index, self) => movieSet.has(movie.id) && self.findIndex((m) => m.id === movie.id) === index
    );
    setMovies(moviesArr);
  };

  // Invoke fetchMovies when isListModal is true to ensure the latest data is populated
  useEffect(() => {
    if (isListModal) fetchMovies();
  }, [isListModal]);

  /** Carousel interactivity
   * @function pointerDown
   *
   * @function pointerMove
   *
   * @function pointerLeave
   *
   * @function pointerUp
   *
   */
  let isInteract: boolean = false;
  let isDragging: boolean = false;

  const pointerDown = () => {
    isInteract = true;
  };

  const pointerMove = () => {
    if (isInteract) {
      isDragging = true;
    }
  };

  const pointerLeave = () => {
    if (isDragging) {
      isInteract = false;
      isDragging = false;
    }
  };

  const pointerUp = (event: PointerEvent) => {
    if (!isDragging) animateListItems(event);

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
  function animateListItems(event: PointerEvent) {
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

  /** @returns */
  return (
    <div className='fdUserList'>
      <section className='fdUserList__collection'>
        <header>
          <h2>Uncategorized Movies</h2>
        </header>
        <ul ref={ulRef}>
          {movies.map((movie, index) => (
            <li key={`movie-list-key-${movie.id}`} data-vis={index === 0 ? 'true' : 'false'}>
              <picture>
                <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={`${movie.title}`} fetchPriority={'high'} />
              </picture>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FDMovieList;
