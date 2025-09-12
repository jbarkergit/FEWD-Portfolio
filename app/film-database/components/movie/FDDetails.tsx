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

export function MaterialSymbolsOpenRun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill='currentColor'
        d='m12 19.175l2.125-2.125l1.425 1.4L12 22l-3.55-3.55l1.425-1.4zM4.825 12l2.125 2.125l-1.4 1.425L2 12l3.55-3.55l1.4 1.425zm14.35 0L17.05 9.875l1.4-1.425L22 12l-3.55 3.55l-1.4-1.425zM12 4.825L9.875 6.95L8.45 5.55L12 2l3.55 3.55l-1.425 1.4z'
      />
    </svg>
  );
}

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

  const genreIds = useMemo(() => heroData?.genre_ids.map((id) => discoveryIdMap[id]?.replaceAll('_', ' ')), [heroData]);

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
      <li aria-label={`Vote Average ${voteAvg / 2} out of 5`}>
        {stars.map((Star, index) => (
          <span key={`star-${index}`}>{Star}</span>
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
          className='fdDetails__row__formattedReleaseDate'
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
          className='fdDetails__row__formattedReleaseDate'
          data-status='green'>
          Now Available to Stream
        </li>
      );
    } else if (isPurchasable && isRentable) {
      return (
        <li
          className='fdDetails__row__formattedReleaseDate'
          data-status='green'>
          Purchase or Rent
        </li>
      );
    } else if (isPurchasable) {
      return (
        <li
          className='fdDetails__row__formattedReleaseDate'
          data-status='green'>
          Available for Purchase
        </li>
      );
    } else if (isRentable) {
      return (
        <li
          className='fdDetails__row__formattedReleaseDate'
          data-status='green'>
          Rental Available
        </li>
      );
    } else if (isInTheatres) {
      return (
        <li
          className='fdDetails__row__formattedReleaseDate'
          data-status='green'>
          Now In Theatres
        </li>
      );
    } else {
      return (
        <li
          className='fdDetails__row__formattedReleaseDate'
          data-status='red'>
          Viewing Options Unknown
        </li>
      );
    }
  }, [watchProviders]);

  /**
   * Reduce provider categories by combining providers that offer 'buy' and 'rent' options
   * Then handle providers that offer only 'buy' or 'rent'
   */
  const providers = useMemo(() => {
    if (!watchProviders || !watchProviders.buy || !watchProviders.rent) return undefined;

    const combined = Array.from(
      new Map([...watchProviders.buy, ...watchProviders.rent].map((entry) => [entry.provider_id, entry])).values()
    );
    const combinedIds = new Set(combined.map((entry) => entry.provider_id));
    const purchasable = watchProviders.buy.filter((entry) => !combinedIds.has(entry.provider_id));
    const rentable = watchProviders.rent.filter((entry) => !combinedIds.has(entry.provider_id));

    return { combined, purchasable, rentable };
  }, [watchProviders]);

  /** @returns */
  return (
    <article
      className='fdDetails'
      data-modal={modal}>
      {modal && (
        <button
          className='fdDetails--close'
          aria-label='Close View More Modal'
          onPointerUp={() => setIsModal(undefined)}>
          <MaterialSymbolsLogoutSharp />
        </button>
      )}

      <footer className='fdDetails__footer'>
        <Link to='https://www.themoviedb.org/?language=en-US'>
          <TheMovieDatabaseLogo />
        </Link>
        <Link to='https://www.justwatch.com/us/JustWatch-Streaming-API'>
          <img
            aria-label='JustWatch API'
            src='/app/film-database/assets/api/JustWatch-logo-large.webp'
          />
        </Link>
      </footer>

      <header className='fdDetails__header'>
        <h2>{heroData.title}</h2>
      </header>

      <p className='fdDetails__overview'>{heroData.overview}</p>

      {modal && (
        <>
          {genreIds.length && (
            <ul className='fdDetails__genres'>
              {genreIds.map((genre, index) => (
                <li key={`genre-${genre}-index-${index}`}>
                  {genre}&nbsp;
                  {index !== heroData.genre_ids.length - 1 ? '•' : null}&nbsp;
                </li>
              ))}
            </ul>
          )}

          {watchProviders && (
            <div className='fdDetails__providers'>
              {watchProviders.flatrate && (
                <div className='fdDetails__providers__provider'>
                  <header>
                    <h3>{heroData.title} is Streaming on:</h3>
                  </header>
                  <ul aria-label='Streaming Platforms'>
                    {watchProviders.flatrate.map((provider, index) => (
                      <li key={`provider-stream-${provider.provider_id}-${index}`}>
                        {/* {provider.provider_name} */}
                        {/* {index !== watchProviders.flatrate!.length - 1 ? ',' : null} */}
                        <img src={`https://image.tmdb.org/t/p/${`original`}/${provider.logo_path}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {providers && providers.combined && (
                <div className='fdDetails__providers__provider'>
                  <header>
                    <h3>Rent or Purchase {heroData.title}</h3>
                  </header>
                  <ul aria-label='Purchase or rental available on Platforms'>
                    {providers.combined.map((entry) => (
                      <li
                        aria-label={entry.provider_name}
                        key={`provider-buy-${entry.provider_id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w780/${entry.logo_path}`}
                          alt={`${entry.provider_name}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {providers && providers.purchasable && providers.purchasable.length > 0 && (
                <div className='fdDetails__providers__provider'>
                  <header>
                    <h3>Purchase {heroData.title}</h3>
                  </header>
                  <ul aria-label='Purchase available on Platforms'>
                    {providers.purchasable.map((entry) => (
                      <li
                        aria-label={entry.provider_name}
                        key={`provider-buy-${entry.provider_id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w780/${entry.logo_path}`}
                          alt={`${entry.provider_name}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {providers && providers.purchasable && providers.purchasable.length > 0 && (
                <div className='fdDetails__providers__provider'>
                  <header>
                    <h3>Rent {heroData.title}</h3>
                  </header>
                  <ul aria-label='Rental available on Platforms'>
                    {providers.purchasable.map((entry) => (
                      <li
                        aria-label={entry.provider_name}
                        key={`provider-rent-${entry.provider_id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w780/${entry.logo_path}`}
                          alt={`${entry.provider_name}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <ul className='fdDetails__row'>
        {!modal && (
          <>
            {getAvailability}
            <li>
              <nav>
                <button
                  aria-label={`View more details about ${heroData.title}`}
                  onPointerUp={() => {
                    setIsModal('movie');
                    setModalTrailer(heroData);
                  }}>
                  <MaterialSymbolsOpenRun />
                  More Details
                </button>
              </nav>
            </li>
          </>
        )}
      </ul>

      <ul className='fdDetails__voteAvgVisual'>{getVoteAverageVisual}</ul>
    </article>
  );
};

export default FDDetails;
