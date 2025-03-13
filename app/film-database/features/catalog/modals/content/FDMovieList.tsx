import { useEffect, useState } from 'react';
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

  const fetchMovies = async () => {
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
    const moviesArr: Namespace_Tmdb.BaseMedia_Provider[] = flattenedPrimaryData.filter((movie) => movieSet.has(movie.id));
    setMovies(moviesArr);
  };

  // Invoke fetchMovies when isListModal is true to ensure the latest data is populated
  useEffect(() => {
    if (isListModal) fetchMovies();
  }, [isListModal]);

  // JSX
  return movies.length ? (
    <ul className='fdMovieModal__ul'>
      {movies.map((movie) => (
        <button onPointerUp={() => {}}>
          <li key={`movie-list-key-${movie}`}>
            <picture>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
                    : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
                }
                alt={`${movie.title}`}
                fetchPriority={'high'}
              />
            </picture>
            <header>
              <h2>{movie.title}</h2>
              {useFormattedDate(movie.release_date)}
              {useVoteAvgVisual(movie.vote_average)}
            </header>
          </li>
        </button>
      ))}
    </ul>
  ) : (
    <p>Whoops! It appears you haven't saved a movie yet!</p>
  );
};

export default FDMovieList;
