import { useState, useEffect, useMemo } from 'react';
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

type Type_Tmdb_Provider_Arr = {
  US: {
    buy: [
      {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      },
    ];
    link: string;
    rent: [
      {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      },
    ];
  };
};

const FDMenuProperty = ({ heroData }: Type_PropDrill) => {
  const [movieStore, setMovieStore] = useState<any[]>([]);

  const props = useMemo(() => {
    if (heroData) return useTmdbProps(heroData);
  }, [heroData]);

  /** Fetch stores */
  const fetchStores = async (): Promise<void> => {
    const providers = useTmdbUrlBuilder('watchProviders', [{ provider: props?.id }]);
    const cast = useTmdbUrlBuilder('credits', [{ movie_id: props?.id }]);

    const requests = [providers, cast].map((request) => {
      return useFetchTmdbResponse([{ key: request.key, endpoint: request.endpoint }]);
    });

    try {
      const results = await Promise.all(requests);
      const processedData = results.flatMap((data) => data?.flatMap((obj) => obj.endpoint));
      console.log(processedData);
      setMovieStore(processedData);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

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
  return (
    <div className='fdProperty'>
      <section className='fdProperty__container'>.</section>
    </div>
  );
};

export default FDMenuProperty;
