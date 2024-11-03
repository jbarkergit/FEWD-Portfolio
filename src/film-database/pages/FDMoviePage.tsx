// Deps
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      <div className='filmDatabase' data-layout-carousel>
        <div className='fdMovie'>
          <div className='fdMovie__backdrop'>
            <picture>
              <img src={`https://image.tmdb.org/t/p/original/${props.details.details.backdrop_path}`} alt={`${props.details.details.title}`} fetchPriority='high' />
            </picture>
          </div>

          <section className='fdMovie__main'>
            <nav className='fdMovie__main__toolbar'>
              <div className='fdMovie__main__toolbar__title'>
                <Link to='/film-database/browse'>Film Database</Link>
              </div>
              <div className='fdMovie__main__toolbar__nav' aria-label='Website Navigation'>
                <button>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path fill='currentColor' d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z'></path>
                  </svg>
                </button>
              </div>
            </nav>

            <main className='fdMovie__main__general'>
              <article className='fdMovie__main__general__container'>
                <header className='fdMovie__main__general__container__header'>
                  <span className='fdMovie__main__general__container__header--release'>{props.details.details.release_date}</span>
                  <span className='fdMovie__main__general__container__header--title'>{props.details.details.title}</span>
                </header>
                <footer className='fdMovie__main__general__container__footer'>
                  <button aria-label='Watch Trailer'>Watch Trailer</button>
                  <button aria-label='Providers'>Providers</button>
                  <button aria-label='Crew'>Crew</button>
                </footer>
              </article>
            </main>

            <aside className='fdMovie__main__trailers'>
              <FDMovieTrailers videos={props.videos.videos.results} />
            </aside>
          </section>

          <div className='fdMovie__aside'>
            <FDMovieCast details={props.details.details} credits={props.credits.credits} />
          </div>
        </div>
      </div>
    );
};

export default FDMoviePage;
