// Deps
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Provider
import { LayoutProvider } from '../context/LayoutProvider';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import { Namespace_TmdbEndpointsKeys } from '../composables/tmdb-api/data/tmdbEndPoints';
// Features
import FDMovieCast from '../features/movie/FDMovieCast';
import FDMovieBackdrop from '../features/movie/FDMovieBackdrop';
import FDMovieInfo from '../features/movie/FDMovieInfo';
import FDMovieTrailers from '../features/movie/FDMovieTrailers';

const FDMoviePage = () => {
  const [movieStore, setMovieStore] = useState<
    Array<
      Namespace_Tmdb.Details_Obj | Namespace_Tmdb.WatchProviders_Obj | Namespace_Tmdb.Videos_Obj | Namespace_Tmdb.Credits_Obj | Namespace_Tmdb.Recommendations_Obj
    >
  >([]);
  const propertyId = parseInt(useLocation().pathname.slice('/film-database/'.length));

  /** Fetch */
  const fetchStores = async () => {
    const data = (await useTmdbFetcher([
      { details: propertyId },
      { watchProviders: propertyId },
      { videos: propertyId },
      { credits: propertyId },
      { recommendations: propertyId },
    ])) as typeof movieStore;
    setMovieStore(data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  /** Create references to store data */
  const getProp = (key: Namespace_TmdbEndpointsKeys.Keys_Union) => {
    return movieStore.find((obj) => Object.keys(obj)[0] === key);
  };

  const props = useMemo(() => {
    const details = getProp('details') as Namespace_Tmdb.Details_Obj;
    const watchProviders = getProp('watchProviders') as Namespace_Tmdb.WatchProviders_Obj;
    const videos = getProp('videos') as Namespace_Tmdb.Videos_Obj;
    const credits = getProp('credits') as Namespace_Tmdb.Credits_Obj;
    const recommendations = getProp('recommendations') as Namespace_Tmdb.Recommendations_Obj;
    return { details, watchProviders, videos, credits, recommendations };
  }, [movieStore]);

  /** Component */
  if (movieStore && movieStore.length > 0 && props)
    return (
      <LayoutProvider>
        <div className='fdMovie'>
          <div className='fdMovie__container'>
            <FDMovieBackdrop details={props.details.details} />
            <FDMovieInfo details={props.details.details} />
            <FDMovieTrailers videos={props.videos.videos.results} />
            <FDMovieCast details={props.details.details} credits={props.credits.credits} />
          </div>
        </div>
      </LayoutProvider>
    );
};

export default FDMoviePage;
