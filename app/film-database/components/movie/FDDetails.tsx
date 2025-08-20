import { useEffect, useState, type JSX } from 'react';
import { Link } from 'react-router';
import { useCatalogProvider } from '../../context/CatalogContext';
import {
  EmptyStar,
  FullStar,
  HalfStar,
  MaterialSymbolsLogoutSharp,
  SvgSpinnersRingResize,
  TheMovieDatabaseLogo,
} from '../../assets/svg/icons';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { tmdbDiscoveryIds } from '~/film-database/composables/const/tmdbDiscoveryIds';

const FDDetails = ({ modal }: { modal: boolean }) => {
  const { heroData, setIsMovieModal } = useCatalogProvider();

  if (!heroData)
    return (
      <section className='fdDetails'>
        <SvgSpinnersRingResize />
      </section>
    );

  const [watchProviders, setWatchProviders] = useState<TmdbResponseFlat['watchProviders']['results']['US'] | undefined>(
    undefined
  );

  /**
   * @function fetchWatchProviders
   */
  const fetchWatchProviders = async () => {
    const data = await tmdbCall({ watchProviders: heroData?.id });
    setWatchProviders(data.response.results.US);
  };

  useEffect(() => {
    fetchWatchProviders();
  }, [heroData]);

  /**
   * @function voteAvg
   * @returns Visual rating of movie out of 5 stars
   */
  const voteAvg = (): JSX.Element | undefined => {
    const voteAvg = heroData.vote_average;

    // 0-10 vote scale (contains floating point value) floored and converted to 0-5 vote scale
    const flooredVoteAverage: number = Math.floor(voteAvg / 2);

    // Helpers
    const hasFloatingValue: boolean = voteAvg % 2 >= 1;
    const maxStars: number = 5;

    const fullStars: number = flooredVoteAverage;
    const halfStars: 1 | 0 = hasFloatingValue ? 1 : 0;
    const emptyStars: number = maxStars - fullStars - halfStars;

    const stars: JSX.Element[] = [
      ...Array(fullStars).fill(<FullStar />),
      ...Array(halfStars).fill(<HalfStar />),
      ...Array(emptyStars).fill(<EmptyStar />),
    ];

    return (
      <li
        className='voteAvgVisual'
        aria-label={`Vote Average ${voteAvg / 2} out of 5`}>
        {stars.map((Star, index) => (
          <span
            className='voteAvgVisual__star'
            key={`star-${index}`}>
            {Star}
          </span>
        ))}
      </li>
    );
  };

  /**
   * @function getAvailability
   * @returns Movie availability
   * Determines if movie has been released by comparing current date to movie release date
   * Checks for rent or buy options and streaming service availability
   * Note: Some services offer early streaming for movies in theatres via rental and/or purchase
   */
  const earlyViewingProviders = ['Google Play Movies', 'Apple TV', 'Prime Video'];

  const hasEarlyViewing =
    watchProviders &&
    watchProviders.buy?.some(
      (p) =>
        earlyViewingProviders.includes(p.provider_name) ||
        watchProviders.rent?.some((p) => earlyViewingProviders.includes(p.provider_name))
    );

  const getAvailability = (): JSX.Element | undefined => {
    const rel = heroData!.release_date.replaceAll('-', ''); // YYYY/MM/DD ISO format converted to 8 digits

    const relDates = {
      year: parseInt(rel.slice(0, 4), 10),
      month: parseInt(rel.slice(4, 6), 10) - 1,
      day: parseInt(rel.slice(6, 8), 10),
    };

    const release = new Date(relDates.year, relDates.month, relDates.day);
    const local = new Date();

    // Not yet released
    if (release > local) {
      return (
        <li className='formattedReleaseDate'>
          {`Available ${release.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}
        </li>
      );
    }

    if (watchProviders) {
      // Streaming
      if (watchProviders.flatrate && watchProviders.flatrate.length > 0) {
        return (
          <li
            className='formattedReleaseDate'
            data-status='green'>
            Streaming
          </li>
        );
      }
      // In Theatres & Early Streaming
      // Note that the TMDB API does not list these providers as streaming service (.flatrate property) if available for early streaming
      if ((!watchProviders.flatrate && watchProviders.buy) || (!watchProviders.flatrate && watchProviders.rent)) {
        return (
          <li
            className='formattedReleaseDate'
            data-status='green'>
            {hasEarlyViewing ? 'In Theatres & Early Streaming' : 'In Theatres'}
          </li>
        );
      }
    }
  };

  const genreIds = heroData?.genre_ids.map((genreId) =>
    Object.keys(tmdbDiscoveryIds).find((key) => tmdbDiscoveryIds[key as keyof typeof tmdbDiscoveryIds] === genreId)
  );

  /** @returns */
  return (
    <article className='fdDetails'>
      <footer className='fdDetails__footer'>
        <Link to='https://www.themoviedb.org/?language=en-US'>
          <TheMovieDatabaseLogo />
        </Link>
        {modal && (
          <Link to='https://www.justwatch.com/us/JustWatch-Streaming-API'>
            <picture>
              <img
                aria-label='JustWatch API'
                src='/app/film-database/assets/api/JustWatch-logo-large.webp'
              />
            </picture>
          </Link>
        )}
      </footer>
      <button
        className='fdDetails--close'
        aria-label='Close View More Modal'
        onPointerUp={() => setIsMovieModal(false)}>
        <MaterialSymbolsLogoutSharp />
      </button>
      <header className='fdDetails__header'>
        <h2>{heroData.title}</h2>
      </header>
      <ul className='fdDetails__col'>
        {voteAvg()}
        {getAvailability()}
        <li>
          <nav>
            <button
              aria-label={`View more details about ${heroData.title}`}
              onClick={() => setIsMovieModal(true)}>
              View more details
            </button>
          </nav>
        </li>
      </ul>
      <p>{heroData.overview}</p>
      {modal && (
        <ul className='fdDetails__col'>
          {genreIds.map((genre, index) => (
            <li key={`genre-${genre}-index-${index}`}>
              {genre?.replaceAll('_', ' ')}
              {index !== heroData.genre_ids.length - 1 ? ' •' : null}
            </li>
          ))}
        </ul>
      )}
      <div className='fdDetails__providers'>
        {modal && watchProviders?.flatrate?.length && (
          <ul
            className='fdDetails__providers__provider'
            aria-label='Streaming Platforms'>
            Streaming on:{' '}
            {watchProviders.flatrate?.map((provider, index) => (
              <li key={`provider-${index}`}>
                {provider.provider_name}
                {index !== watchProviders.flatrate!.length - 1 ? ',' : null}
                <img src={`https://image.tmdb.org/t/p/${`original`}/${provider.logo_path}`} />
              </li>
            ))}
          </ul>
        )}
        {modal && watchProviders?.buy?.length && (
          <div className='fdDetails__providers__provider'>
            <div>Purchase {heroData.title}</div>
            <ul aria-label='Purchase available on Platforms'>
              {watchProviders.buy.map((entry) => (
                <li aria-label={entry.provider_name}>
                  <picture>
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${entry.logo_path}`}
                      alt={`${entry.provider_name}`}
                    />
                  </picture>
                </li>
              ))}
            </ul>
          </div>
        )}
        {modal && watchProviders?.rent?.length && (
          <div className='fdDetails__providers__provider'>
            <div>Rent {heroData.title}</div>
            <ul aria-label='Rental available on Platforms'>
              {watchProviders.rent.map((entry) => (
                <li aria-label={entry.provider_name}>
                  <picture>
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${entry.logo_path}`}
                      alt={`${entry.provider_name}`}
                    />
                  </picture>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};

export default FDDetails;
