import { useEffect, useRef, useState } from 'react';
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
   * @function handleSelect
   * @returns void
   * Creates an array of ulRef's children, iterates to enable/disable data-attr
   */
  const ulRef = useRef<HTMLUListElement>(null);

  const handleSelect = (index: number): void => {
    // Get all unordered list elements
    if (!ulRef.current) return;
    const elements: Element[] = [...ulRef.current.children];

    // Iterate elements to disable/enable data-attr
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('data-vis', i === index ? 'true' : 'false');
    }
  };

  /** @returns */
  return movies.length ? (
    <div className='fdMovieModal__carousel'>
      <ul ref={ulRef}>
        {movies.map((movie, index) => (
          <li key={`movie-list-key-${movie.id}`} data-vis={index === 0 ? 'true' : 'false'}>
            <button onPointerUp={() => handleSelect(index)}>
              <picture>
                <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={`${movie.title}`} fetchPriority={'high'} />
              </picture>
            </button>
          </li>
        ))}
      </ul>
      <article>
        <header>{/* <h2>{movie.title}</h2> */}</header>
        {/* {useFormattedDate(movie.release_date)} */}
        {/* {useVoteAvgVisual(movie.vote_average)} */}
      </article>
    </div>
  ) : (
    <p>Whoops! It appears you haven't saved a movie yet!</p>
  );
};

export default FDMovieList;
