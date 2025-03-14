import { useEffect, useState } from 'react';
import { Link } from 'react-router';
// Context
import { useCatalogProvider } from '../../context/CatalogContext';
// Firebase
import { useFirestore } from '~/base/firebase/firestore/hooks/useFirestore';
// Hooks
import { useTmdbFetcher, type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import useVoteAvgVisual from '~/film-database/hooks/useVoteAvgVisual';
// Data
import { tmdbMovieGenres } from '~/film-database/composables/tmdb-api/data/tmdbGenres';
// Assets
import {
  Exit,
  MaterialSymbolsHeartPlus,
  MaterialSymbolsLightHeartMinusRounded,
  SvgSpinnersRingResize,
  TheMovieDatabaseLogo,
} from '../../assets/google-material-symbols/GoogleMaterialIcons';
import useFormattedDate from '~/film-database/hooks/useFormattedDate';

const FDDetails = (modal: { modal: boolean }) => {
  const { heroData, setIsMovieModal } = useCatalogProvider();

  if (!heroData)
    return (
      <section className='fdDetails'>
        <SvgSpinnersRingResize />
      </section>
    );

  /**
   * @function Anonymous
   * Fetches watchProviders
   */
  const [watchProviders, setWatchProviders] = useState<Namespace_Tmdb.WatchProviders_Obj['watchProviders']['results']['US']['flatrate'] | undefined>(undefined);

  const fetchWatchProviders = async () => {
    const data = (await useTmdbFetcher({ watchProviders: heroData?.id })) as Namespace_Tmdb.WatchProviders_Obj;
    setWatchProviders(data.watchProviders.results.US.flatrate);
  };

  useEffect(() => {
    fetchWatchProviders();
  }, [heroData]);

  /**
   * @function getMovieBtn
   * @returns Promise<void>
   * Stores boolean based on whether or not userDoc.movies contains heroData.id (if userDocs contains movie)
   */
  const [isMovieBtn, setIsMovieBtn] = useState<boolean | null>(null);
  useEffect(() => console.log(isMovieBtn), [isMovieBtn]);

  const getMovieBtn = async (): Promise<void> => {
    const userDoc = await useFirestore.getDocument('users');

    setIsMovieBtn(() => {
      if (!userDoc) return null;
      if (!userDoc.movies.some((num) => num === heroData.id)) return true;
      return false;
    });
  };

  useEffect(() => {
    getMovieBtn();
  }, [heroData]);

  /** @returns */
  return (
    <section className='fdDetails' data-modal={modal.modal}>
      <article className='fdDetails__article'>
        <button className='fdDetails__article--exit' id='fdDetails--exit' aria-label='Close View More Modal' onPointerUp={() => setIsMovieModal(false)}>
          <Exit />
        </button>

        <footer className='fdDetails__article__footer'>
          <Link to='https://www.themoviedb.org/?language=en-US'>
            <TheMovieDatabaseLogo />
          </Link>
        </footer>
        <header className='fdDetails__article__header'>
          <h2>{heroData.title}</h2>
          {isMovieBtn ? (
            <button
              aria-label='Add to your movie list'
              onPointerUp={async () => {
                await useFirestore.updateDocumentMovies('users', { movieId: heroData.id, concat: true });
                await getMovieBtn();
              }}>
              <MaterialSymbolsHeartPlus />
            </button>
          ) : (
            <button
              aria-label='Remove from your movie list'
              onPointerUp={async () => {
                await useFirestore.updateDocumentMovies('users', { movieId: heroData.id, concat: false });
                await getMovieBtn();
              }}>
              <MaterialSymbolsLightHeartMinusRounded />
            </button>
          )}
        </header>

        <ul className='fdDetails__article__col'>
          <li>{useVoteAvgVisual(heroData.vote_average)}</li>
          {useFormattedDate(heroData.release_date)}
          <li>
            <nav id='fdDetails--nav'>
              <button aria-label={`View more details about ${heroData.title}`} onClick={() => setIsMovieModal(true)}>
                View more details
              </button>
            </nav>
          </li>
        </ul>

        <p>{heroData.overview}</p>

        <ul className='fdDetails__article__col' id='fdDetails--genres'>
          Genres:
          {heroData?.genre_ids.map((genreId) => {
            const genreName = Object.keys(tmdbMovieGenres).find((key) => tmdbMovieGenres[key as keyof typeof tmdbMovieGenres] === genreId);
            return genreName ? <li key={`genreId-${genreId}`}>{genreName.replaceAll('_', ' ') + ','}</li> : null;
          })}
        </ul>

        {watchProviders?.length && (
          <ul className='fdDetails__article__col' id='fdDetails--providers'>
            Available on:{' '}
            {watchProviders?.map((provider, index) => (
              <li key={`provider-${index}`}>
                {provider.provider_name}
                {index !== watchProviders.length - 1 ? ',' : null}
                {/* <img src={`https://image.tmdb.org/t/p/${`original`}/${provider.logo_path}`} /> */}
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
};

export default FDDetails;
