import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useFirestore, type Firestore_UserDocument } from '~/base/firebase/firestore/hooks/useFirestore';
import FDUserCarousel from '~/film-database/components/carousel/FDUserCarousel';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import useFormattedDate from '~/film-database/hooks/useFormattedDate';
import useVoteAvgVisual from '~/film-database/hooks/useVoteAvgVisual';

const FDMovieList = () => {
  const { primaryData } = useLoaderData();
  let flattenedPrimaryData: Namespace_Tmdb.BaseMedia_Provider[] | undefined = undefined;
  const [movies, setMovies] = useState<Namespace_Tmdb.BaseMedia_Provider[]>([]);
  const { isListModal, maxCarouselNodes } = useCatalogProvider();

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

  return (
    <div className='fdUserList'>
      <FDUserCarousel header={'Uncategorized Movies'} data={movies} display='grid' />
      <FDUserCarousel data={Array(maxCarouselNodes + 1).fill(undefined)} display='flex' />
    </div>
  );
};

export default FDMovieList;
