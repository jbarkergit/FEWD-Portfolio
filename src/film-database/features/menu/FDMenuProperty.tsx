// Deps
import { useState, useEffect, useMemo, RefObject, forwardRef } from 'react';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../composables/tmdb-api/hooks/useTmdbFetcher';

type Type_PropDrill = {
  heroData: Namespace_Tmdb.BaseMedia_Provider | undefined;
};

const FDMenuProperty = forwardRef<HTMLElement, Type_PropDrill>(({ heroData }, menuPropertyRef) => {
  const [movieStore, setMovieStore] = useState<Array<Namespace_Tmdb.WatchProviders_Obj | Namespace_Tmdb.Credits_Obj>>([]);

  /** Fetch stores */
  const fetchStores = async (): Promise<void> => {
    const requests = (await useTmdbFetcher([{ watchProviders: props?.id }, { credits: props?.id }])) as typeof movieStore;
    setMovieStore(requests);
  };

  const props = useMemo(() => {
    if (heroData) return heroData;
  }, [heroData]);

  useEffect(() => {
    if (props) fetchStores();
  }, [props]);

  /** Data */
  // const movieProviders = useMemo(() => {
  //   const buy = movieStore.flatMap((provider) => provider.US.buy.map((result) => result.provider_name));
  //   const rent = movieStore.flatMap((provider) => provider.US.rent.map((result) => result.provider_name));
  //   return { buy, rent };
  // }, [movieStore]);

  // const movieCast = useMemo(() => {}, [heroData]);

  /** Component */
  return <section className='fdProperty' ref={menuPropertyRef} data-menu='closed'></section>;
});

export default FDMenuProperty;
