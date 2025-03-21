import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useFirestore, type Firestore_UserDocument } from '~/base/firebase/firestore/hooks/useFirestore';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import FDCollectionsModalCollection from './FDCollectionsCollection';

const FDCollections = () => {
  // Prevent additional API calls by calling clientLoader's primaryData
  const { primaryData } = useLoaderData();

  // User collections state
  const [carousels, setCarousels] = useState<{ header: string; data: Namespace_Tmdb.BaseMedia_Provider[] | undefined; display: 'flex' | 'grid' }[]>([]);

  // Gather collection refs
  const collectionRefs = useRef<HTMLElement[]>([]);
  const collectionRef = (reference: HTMLUListElement): void => {
    if (reference && !collectionRefs.current.includes(reference)) {
      collectionRefs.current.push(reference);
    }
  };

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /**
   * @function fetchMovies
   * @returns Promise<void>
   * Utilizes primaryData from loaderData to prevent an api call
   * Flattens primary data from useLoaderData
   * Gets user document from Firestore
   * Filters flattenedPrimaryData to retrieve a list of user's saved movies
   */
  let flattenedPrimaryData: Namespace_Tmdb.BaseMedia_Provider[] | undefined = undefined;

  const fetchMovies = async (): Promise<void> => {
    // Flatten primaryData from loaderData (memoized)
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

    // Set initial collection
    if (moviesArr.length > 0 && !carousels.length) {
      setCarousels([{ header: 'Uncategorized Movies', data: moviesArr, display: 'flex' }]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <section className='fdCollections'>
        {carousels.length > 0 &&
          carousels.map(({ header, data, display }, index) => (
            <FDCollectionsModalCollection
              key={`user-carousel-${index}`}
              mapIndex={index}
              header={header}
              data={data}
              display={display}
              ref={collectionRef}
              collectionRefs={collectionRefs}
              isEditMode={isEditMode}
              setCarousels={setCarousels}
            />
          ))}
      </section>
      <FDCollectionsModalMenu collectionRefs={collectionRefs} isEditMode={isEditMode} setIsEditMode={setIsEditMode} setCarousels={setCarousels} />
    </>
  );
};

export default FDCollections;
