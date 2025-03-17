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

  /**
   * @function reducer
   * Handles carousel interactivity
   */
  const initState = {
    isInteract: false,
    isDragging: false,
  };

  const reducer = (
    state: typeof initState,
    action: { type: 'POINTER_DOWN' } | { type: 'POINTER_MOVE' } | { type: 'POINTER_LEAVE' } | { type: 'POINTER_UP' }
  ): typeof initState => {
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, isInteract: true };
      case 'POINTER_MOVE':
        if (state.isInteract) return { ...state, isDragging: true };
        return state;
      case 'POINTER_LEAVE':
        if (state.isDragging) return { ...state, isInteract: false, isDragging: false };
        return state;
      case 'POINTER_UP':
        if (state.isDragging) return { ...state, isInteract: false, isDragging: false };
        return state;
      default:
        throw new Error('Unknown action type.');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);
  // useEffect(() => console.log(state), [state]);

  const pointerdown = () => {
    dispatch({
      type: 'POINTER_DOWN',
    });
  };

  const pointermove = () => {
    dispatch({
      type: 'POINTER_MOVE',
    });
  };

  const pointerleave = () => {
    dispatch({
      type: 'POINTER_LEAVE',
    });
  };

  const pointerup = (event: PointerEvent) => {
    /**
     * @function
     * Create an array of ulRef's children, iterate to enable/disable data-attr
     */
    if (!state.isDragging) {
      const listItems: Element[] | null = ulRef.current ? [...ulRef.current.children] : null;

      if (listItems) {
        const element: Node | null = !state.isDragging ? (event.target as Node) : null;
        const elementIndex: number = listItems.findIndex((item) => item === element);

        if (element && elementIndex !== -1) {
          // Iterate ulRef.current.children to disable/enable data-attr
          for (let i = 0; i < listItems.length; i++) {
            listItems[i].setAttribute('data-vis', i === elementIndex ? 'true' : 'false');
          }
        }
      }
    }

    /** @returns */
    dispatch({
      type: 'POINTER_UP',
    });
  };

  useEffect(() => {
    ulRef.current?.addEventListener('pointerdown', pointerdown);
    ulRef.current?.addEventListener('pointermove', pointermove);
    ulRef.current?.addEventListener('pointerleave', pointerleave);
    ulRef.current?.addEventListener('pointerup', pointerup);

    return () => {
      ulRef.current?.removeEventListener('pointerdown', pointerdown);
      ulRef.current?.removeEventListener('pointermove', pointermove);
      ulRef.current?.removeEventListener('pointerleave', pointerleave);
      ulRef.current?.removeEventListener('pointerup', pointerup);
    };
  }, []);

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
