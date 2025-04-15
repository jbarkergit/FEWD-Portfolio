import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useFirestore, type Firestore_UserDocument } from '~/base/firebase/firestore/hooks/useFirestore';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import FDCollectionsModalMenu from './FDCollectionsMenu';
import FDCollectionsModalCollection from './FDCollectionsCollection';
import { SvgSpinnersRingResize } from '~/film-database/assets/svg/icons';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

export type User_Collection = {
  header: string;
  data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
  display: 'flex' | 'grid';
};

const FDCollections = () => {
  // User collections
  const [carousels, setCarousels] = useState<Record<string, User_Collection>>({});

  // Reference of all collections
  const collectionRefs = useRef<HTMLElement[]>([]);
  const collectionRef = (reference: HTMLUListElement): void => {
    if (reference && !collectionRefs.current.includes(reference)) {
      collectionRefs.current.push(reference);
    }
  };

  // User collections edit mode (Hoisted)
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /**
   * @function initializeCarousels
   * @description
   * Retrieves the user's saved movies by flattening primary data from `useLoaderData` and filtering it based on the user's saved movies in Firestore, avoiding an extra API call.
   */
  const [isFetching, setIsFetching] = useState<boolean>(true); // Loading state
  const { primaryData } = useLoaderData(); // Client loader data
  const { maxCarouselNodes } = useCatalogProvider(); // Dynamic carousel chunk size
  let flattenedPrimaryData: Namespace_Tmdb.BaseMedia_Provider[] | undefined = undefined;

  const initializeCarousels = async (): Promise<void> => {
    // Flatten primaryData from loaderData (memoized)
    if (!flattenedPrimaryData) {
      flattenedPrimaryData = (primaryData as Namespace_Tmdb.Response_Union[]).flatMap((entry) =>
        Object.values(entry).flatMap((subEntry) => subEntry.results || [])
      ) as Namespace_Tmdb.BaseMedia_Provider[];
    }

    // Get user's collection document
    // const collection: Firestore_UserDocument | undefined = await useFirestore.getDocument('users');
    // if (!collection) return;

    // Get, filter and set movies from clientLoader's primaryData to prevent api call
    // const moviesArr: Namespace_Tmdb.BaseMedia_Provider[] = flattenedPrimaryData.filter((movie) => collection.movies.some((id) => id === movie.id));

    // Set initial collection
    // if (moviesArr.length > 0 && !carousels.length) {
    setCarousels({
      'user-collection-0': {
        header: 'Uncategorized Movies',
        data: Array.from(flattenedPrimaryData).splice(0, maxCarouselNodes),
        display: 'flex',
      },
      'user-collection-1': {
        header: 'Uncategorized Movies',
        data: Array.from(flattenedPrimaryData).splice(maxCarouselNodes, maxCarouselNodes),
        display: 'flex',
      },
    });

    setIsFetching(false);
  };
  // };

  useEffect(() => {
    if (isFetching) initializeCarousels();
  }, [isFetching]);

  if (isFetching)
    return (
      <div className='fetching'>
        <SvgSpinnersRingResize />
      </div>
    );
  else
    return (
      <>
        <section className='fdCollections'>
          {Object.values(carousels).map(({ header, data, display }, index) => (
            <FDCollectionsModalCollection
              key={`user-collections-collection-${index}`}
              mapIndex={index}
              header={header}
              data={data}
              display={display}
              ref={collectionRef}
              collectionRefs={collectionRefs}
              isEditMode={isEditMode}
              carousels={carousels}
              setCarousels={setCarousels}
            />
          ))}
        </section>
        <FDCollectionsModalMenu
          collectionRefs={collectionRefs}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          carousels={carousels}
          setCarousels={setCarousels}
        />
      </>
    );
};

export default FDCollections;
