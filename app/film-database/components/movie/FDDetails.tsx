import { useEffect, useState, type JSX } from 'react';
import { Link } from 'react-router';
// Context
import { useCatalogProvider } from '../../context/CatalogContext';
// Hooks
import { useTmdbFetcher, type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
// Data
import { tmdbMovieGenres } from '~/film-database/composables/tmdb-api/data/tmdbGenres';
// Assets
import { EmptyStar, Exit, FullStar, HalfStar, SvgSpinnersRingResize, TheMovieDatabaseLogo } from '../../assets/svg/icons';

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
   * @function useFormattedDate
   * @returns Movie release date OR 'Now Available'
   * Compares current date to movie release date to determine if the film has been released
   */
  const useFormattedDate = (release: string): JSX.Element => {
    // Handle dates
    const currentDate: string = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const releaseDate: string = release.replaceAll('-', '');

    // Convert releaseDate to Date object
    const releaseDateObj = new Date(`${releaseDate.slice(0, 4)}-${releaseDate.slice(4, 6)}-${releaseDate.slice(6, 8)}`);

    // Return JSX.Element indicating release status
    if (releaseDate > currentDate) {
      return (
        <div className='formattedReleaseDate'>{`Available ${releaseDateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`}</div>
      );
    }

    return (
      <div className='formattedReleaseDate' data-status='green'>
        {'Now Available'}
      </div>
    );
  };

  /**
   * @function useVoteAvgVisual
   * @returns Vote average in svg star visual reference
   */
  const useVoteAvgVisual = (voteAvg: number): JSX.Element | undefined => {
    // 0-10 vote scale (contains floating point value) floored and converted to 0-5 vote scale
    const flooredVoteAverage: number = Math.floor(voteAvg / 2);

    // Helpers
    const hasFloatingValue: boolean = voteAvg % 2 >= 1;
    const maxStars: number = 5;

    const fullStars: number = flooredVoteAverage;
    const halfStars: 1 | 0 = hasFloatingValue ? 1 : 0;
    const emptyStars: number = maxStars - fullStars - halfStars;

    const stars: JSX.Element[] = [...Array(fullStars).fill(<FullStar />), ...Array(halfStars).fill(<HalfStar />), ...Array(emptyStars).fill(<EmptyStar />)];

    return (
      <ul className='voteAvgVisual' aria-label={`Vote Average ${voteAvg / 2} out of 5`}>
        {stars.map((Star, index) => (
          <li className='voteAvgVisual__star' key={`star-${index}`}>
            {Star}
          </li>
        ))}
      </ul>
    );
  };
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
          {heroData?.genre_ids.map((genreId, index) => {
            const genreName = Object.keys(tmdbMovieGenres).find((key) => tmdbMovieGenres[key as keyof typeof tmdbMovieGenres] === genreId);
            if (genreName)
              return (
                <li key={`genreId-${genreId}`}>
                  {genreName}
                  {index !== heroData.genre_ids.length - 1 ? ',' : null}
                </li>
              );
          })}
        </ul>

        {watchProviders?.length && (
          <ul className='fdDetails__article__col' id='fdDetails--providers'>
            Available on:{' '}
            {watchProviders?.map((provider, index) => (
              <li key={`provider-${index}`}>
                {provider.provider_name}
                {index !== watchProviders.length - 1 ? ',' : null}
                <img src={`https://image.tmdb.org/t/p/${`original`}/${provider.logo_path}`} />
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
};

export default FDDetails;
