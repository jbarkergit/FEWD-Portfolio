import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { useFirestore, type Firestore_UserDocument } from '~/base/firebase/firestore/hooks/useFirestore';
import FDUserCarousel from '~/film-database/components/carousel/FDUserCarousel';
import { type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDMovieListMenu from './FDMovieListMenu';

const FDMovieList = () => {
  const { primaryData } = useLoaderData();
  const { isListModal } = useCatalogProvider();

  const [movies, setMovies] = useState<Namespace_Tmdb.BaseMedia_Provider[]>([]);

  const [carousels, setCarousels] = useState<{ header: string; data: typeof movies | undefined; display: 'flex' | 'grid' }[]>([]);

  useEffect(() => {
    if (movies.length > 0 && !carousels.length) setCarousels((state) => [...state, { header: 'Uncategorized Movies', data: movies, display: 'flex' }]);
  }, [movies]);

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
  let flattenedPrimaryData: Namespace_Tmdb.BaseMedia_Provider[] | undefined = undefined;

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

  return (
    <div className='fdUserList'>
      <section className='fdUserList__collections'>
        {carousels.map(({ header, data, display }, index) => (
          <FDUserCarousel
            key={`user-carousel-${index}`}
            mapIndex={index}
            header={header}
            data={data}
            display={display}
            ref={collectionRef}
            isEdit={isEdit}
            collectionRefs={collectionRefs}
            carousels={carousels}
            setCarousels={setCarousels}
          />
        ))}
      </section>
      <FDMovieListMenu collectionRefs={collectionRefs} setIsEdit={setIsEdit} isEdit={isEdit} carousels={carousels} setCarousels={setCarousels} />
    </div>
  );
};

export default FDMovieList;
