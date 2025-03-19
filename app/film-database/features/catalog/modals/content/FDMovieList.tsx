import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useFirestore, type Firestore_UserDocument } from '~/base/firebase/firestore/hooks/useFirestore';
import FDUserCarousel from '~/film-database/components/carousel/FDUserCarousel';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDMovieListMenu from './FDMovieListMenu';
import useFormattedDate from '~/film-database/hooks/useFormattedDate';
import useVoteAvgVisual from '~/film-database/hooks/useVoteAvgVisual';

const FDMovieList = () => {
  const { primaryData } = useLoaderData();
  const { isListModal, maxCarouselNodes } = useCatalogProvider();

  const [movies, setMovies] = useState<Namespace_Tmdb.BaseMedia_Provider[]>([]);
  let flattenedPrimaryData: Namespace_Tmdb.BaseMedia_Provider[] | undefined = undefined;

  const collectionRefs = useRef<HTMLElement[]>([]);

  const collectionRef = (reference: HTMLUListElement): void => {
    if (reference && !collectionRefs.current.includes(reference)) {
      collectionRefs.current.push(reference);
    }
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);

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
    const moviesArr: Namespace_Tmdb.BaseMedia_Provider[] = flattenedPrimaryData.filter((movie) => collection.movies.some((id) => id === movie.id));
    setMovies(moviesArr);
  };

  // Invoke fetchMovies when isListModal is true to ensure the latest data is populated
  useEffect(() => {
    if (isListModal) fetchMovies();
  }, [isListModal]);

  /**
   * @function addCollection
   * Adds new collection
   */
  const addCollection = (): void => {};

  return (
    <div className='fdUserList'>
      <section className='fdUserList__collections'>
        <FDUserCarousel header={'Uncategorized Movies'} data={movies} display='flex' ref={collectionRef} isEdit={isEdit} collectionRefs={collectionRefs} />
      </section>
      <FDMovieListMenu collectionRefs={collectionRefs} addCollection={addCollection} setIsEdit={setIsEdit} isEdit={isEdit} />
    </div>
  );
};

export default FDMovieList;
