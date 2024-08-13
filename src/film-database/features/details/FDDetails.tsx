// Deps
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Composable Hooks
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
// Composable Hook Types
import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';
// Assets
import { TheMovieDatabaseLogo } from '../../assets/google-material-symbols/tmdbSymbols';

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

type Type_Tmdb_Provider_Arr = {
  US: {
    link: string;
    buy: {
      logo_path: string;
      provider_id: number;
      provider_name: string;
      display_priority?: number;
    }[];
  };
};

const FDDetails = ({ heroData }: Type_PropDrill) => {
  if (!heroData) return;
  const props = useTmdbProps(heroData);

  // const [providers, setProviders] = useState<Type_Tmdb_Provider_Arr[]>([]);

  // const getProviders = async (): Promise<void> => {
  //   const fetchUrl = useTmdbUrlBuilder('watchProviders', [{ provider: props!.id }]);
  //   const getResults = useFetchTmdbResponse([{ key: fetchUrl.key, endpoint: fetchUrl.endpoint }]);

  //   getResults.then((data) => {
  //     if (data) {
  //       const dataResults = data.flatMap((obj) => obj.endpoint) as unknown as Type_Tmdb_Provider_Arr[];
  //       setProviders(dataResults);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (props) getProviders();
  // }, [heroData]);

  return (
    <section className='fdDetails'>
      <article className='fdDetails__article'>
        <header className='fdDetails__article__header'>
          <Link to='https://www.themoviedb.org/?language=en-US'>
            <TheMovieDatabaseLogo />
          </Link>
          <hgroup className='fdDetails__article__header__hgroup'>
            <h2>{props?.heading}</h2>
            <p>{props?.overview}</p>
          </hgroup>
        </header>
      </article>
    </section>
  );
};

export default FDDetails;
