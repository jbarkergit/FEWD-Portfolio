import { useEffect, useMemo, useState, type JSX, type SVGProps } from 'react';
import { Link } from 'react-router';
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
import { useHeroData } from '~/film-database/context/HeroDataContext';
import { useModal } from '~/film-database/context/ModalContext';
import { useModalTrailer } from '~/film-database/context/ModalTrailerContext';

const discoveryIdMap = Object.fromEntries(Object.entries(tmdbDiscoveryIds).map(([k, v]) => [v, k]));

// const earlyViewingProviders = ['Google Play Movies', 'Apple TV', 'Prime Video'];

const FDDetails = ({ modal }: { modal: boolean }) => {
  const { heroData } = useHeroData();

  if (!heroData)
    return (
      <section className='fdDetails'>
        <SvgSpinnersRingResize />
      </section>
    );

  const { setModalTrailer } = useModalTrailer();
  const { setIsModal } = useModal();

  const [watchProviders, setWatchProviders] = useState<TmdbResponseFlat['watchProviders']['results']['US'] | undefined>(
    undefined
  );

  const genreIds = useMemo(() => heroData?.genre_ids.map((id) => discoveryIdMap[id]), [heroData]);

  /**
   * Fetch watch providers when heroData changes
   */
  useEffect(() => {
    if (!heroData) return;

    let cancelled: boolean = false;

    const fetchWatchProviders = async () => {
      const data = await tmdbCall({ watchProviders: heroData.id });
      if (!cancelled) setWatchProviders(data.response.results.US);
    };

    fetchWatchProviders();

    return () => {
      cancelled = true;
    };
  }, [heroData]);

  /**
   * Get visual representation of vote average as stars
   */
  const getVoteAverageVisual = useMemo((): JSX.Element | undefined => {
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
  }, [heroData]);

  /**
   * Determine a movie's availability on streaming platforms or theatres
   * This includes early viewing options (rent or buy) on major platforms
   * NOTE: TMDB API does not list early streaming providers as streaming service (.flatrate property)
   * NOTE: TMDB API is not fully reliable, so we'll simplify "STREAMING" prompt as the primary handler of "EARLY VIEWING"
   */
  const getAvailability = useMemo((): JSX.Element | undefined => {
    if (!heroData || !heroData.release_date) return undefined;

    const releaseDate = heroData.release_date.replaceAll('-', ''); // YYYY/MM/DD ISO format converted to 8 digits
    const releaseDates = {
      year: parseInt(releaseDate.slice(0, 4), 10),
      month: parseInt(releaseDate.slice(4, 6), 10) - 1,
      day: parseInt(releaseDate.slice(6, 8), 10),
    };

    const release = new Date(releaseDates.year, releaseDates.month, releaseDates.day);
    const local = new Date();

    // NOTE: These variables are in priority order to ensure the correct status is prompted, handle them accordingly
    const isReleased = release < local;
    const isStreaming = watchProviders?.flatrate?.length;
    const isPurchasable = watchProviders?.buy?.length;
    const isRentable = watchProviders?.rent?.length;
    const isInTheatres = local > release;
    // const hasEarlyBuy = watchProviders.buy?.some((p) => earlyViewingProviders.includes(p.provider_name));
    // const hasEarlyRent = watchProviders.rent?.some((p) => earlyViewingProviders.includes(p.provider_name));
    // const hasEarlyViewing = hasEarlyBuy || hasEarlyRent;

    if (!isReleased) {
      return (
        <li
          className='formattedReleaseDate'
          data-status='gold'>
          {`Available ${release.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}
        </li>
      );
    } else if (isStreaming) {
      return (
        <li
          className='formattedReleaseDate'
          data-status='green'>
          Streaming
        </li>
      );
    } else if (isPurchasable && isRentable) {
      return (
        <li
          className='formattedReleaseDate'
          data-status='green'>
          Purchase or Rent
        </li>
      );
    } else if (isPurchasable) {
      return (
        <li
          className='formattedReleaseDate'
          data-status='green'>
          Purchase
        </li>
      );
    } else if (isRentable) {
      return (
        <li
          className='formattedReleaseDate'
          data-status='green'>
          Rent
        </li>
      );
    } else if (isInTheatres) {
      return (
        <li
          className='formattedReleaseDate'
          data-status='green'>
          In Theatres
        </li>
      );
    } else {
      return (
        <li
          className='formattedReleaseDate'
          data-status='red'>
          Viewing Options Unknown
        </li>
      );
    }
  }, [watchProviders]);

  /** @returns */
  return (
    <article
      className='fdDetails'
      data-modal={modal}>
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
      {modal && (
        <button
          className='fdDetails--close'
          aria-label='Close View More Modal'
          onPointerUp={() => setIsModal(undefined)}>
          <MaterialSymbolsLogoutSharp />
        </button>
      )}

      <header className='fdDetails__header'>
        <h2>{heroData.title}</h2>
      </header>
      <ul className='fdDetails__col'>
        {getVoteAverageVisual}
        {getAvailability}
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
              <li key={`provider-stream-${provider.provider_id}`}>
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
                <li
                  aria-label={entry.provider_name}
                  key={`provider-buy-${entry.provider_id}`}>
                  {/* <Link to={`${entry.}`}></Link> */}
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
                <li
                  aria-label={entry.provider_name}
                  key={`provider-rent-${entry.provider_id}`}>
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
        {!modal && (
          <nav>
            <button
              aria-label={`View more details about ${heroData.title}`}
              onClick={() => {
                setIsModal('movie');
                setModalTrailer(heroData);
              }}>
              View more details
            </button>
          </nav>
        )}
      </div>
    </article>
  );
};

export default FDDetails;
