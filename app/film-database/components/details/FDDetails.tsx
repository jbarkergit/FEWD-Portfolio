import { useEffect, useMemo, useState, type JSX } from 'react';
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
import { useHeroDataContext } from '~/film-database/context/HeroDataContext';
import { useModalTrailerContext } from '~/film-database/context/ModalTrailerContext';
import DetailsCollectionDropdown from '~/film-database/components/details/DetailsCollectionDropdown';
import { useModalContext } from '~/film-database/context/ModalContext';

const discoveryIdMap = Object.fromEntries(Object.entries(tmdbDiscoveryIds).map(([k, v]) => [v, k]));

// const earlyViewingProviders = ['Google Play Movies', 'Apple TV', 'Prime Video'];

const FDDetails = ({ modal }: { modal: boolean }) => {
  const { heroData } = useHeroDataContext();
  const { modalTrailer, setModalTrailer } = useModalTrailerContext();
  const data = !modal ? heroData : modalTrailer;

  if (!data)
    return (
      <section className='fdDetails'>
        <SvgSpinnersRingResize />
      </section>
    );

  const { setModal } = useModalContext();
  const [watchProviders, setWatchProviders] = useState<TmdbResponseFlat['watchProviders']['results']['US'] | undefined>(
    undefined
  );

  const genreIds = useMemo(() => data?.genre_ids.map((id) => discoveryIdMap[id]?.replaceAll('_', ' ')), [data]);

  /**
   * Fetch watch providers when data changes
   */
  useEffect(() => {
    if (!data) return;
    const controller = new AbortController();

    const fetchWatchProviders = async () => {
      const res = await tmdbCall(controller, { watchProviders: data.id });
      setWatchProviders(res.response.results.US);
    };

    fetchWatchProviders();

    return () => controller.abort();
  }, [data]);

  /**
   * Get visual representation of vote average as stars
   */
  const getVoteAverageVisual = useMemo((): JSX.Element | undefined => {
    const voteAvg = data.vote_average;

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
      <div
        className='fdDetails__extra__inf__voteAvgVisual'
        aria-label={`Vote Average ${voteAvg / 2} out of 5`}>
        {stars.map((Star, index) => (
          <span key={`star-${index}`}>{Star}</span>
        ))}
      </div>
    );
  }, [data]);

  /**
   * Determine a movie's availability on streaming platforms or theatres
   * This includes early viewing options (rent or buy) on major platforms
   * NOTE: TMDB API does not list early streaming providers as streaming service (.flatrate property)
   * NOTE: TMDB API is not fully reliable, so we'll simplify "STREAMING" prompt as the primary handler of "EARLY VIEWING"
   */
  const getAvailability = useMemo((): JSX.Element | undefined => {
    if (!data || !data.release_date) return undefined;

    const releaseDate = data.release_date.replaceAll('-', ''); // YYYY/MM/DD ISO format converted to 8 digits
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
        <div data-status='gold'>
          {`Available ${release.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}
        </div>
      );
    } else if (isStreaming) {
      return <div data-status='green'>Available to Stream</div>;
    } else if (isPurchasable && isRentable) {
      return <div data-status='green'>Available for Purchase or Rent</div>;
    } else if (isPurchasable) {
      return <div data-status='green'>Available for Purchase</div>;
    } else if (isRentable) {
      return <div data-status='green'>Rental Available</div>;
    } else if (isInTheatres) {
      return <div data-status='green'>Playing In Theatres</div>;
    } else {
      return <div data-status='red'>Whoops! Viewing Options Unavailable.</div>;
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
          onPointerUp={() => setModal(undefined)}>
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
        <h2>{data.title}</h2>
      </header>

      <p className='fdDetails__overview'>{data.overview}</p>

      {genreIds.length && (
        <ul className='fdDetails__genres'>
          {genreIds.map((genre, index) => (
            <li key={`genre-${genre}-index-${index}`}>
              {genre}&nbsp;
              {index !== data.genre_ids.length - 1 ? '•' : null}&nbsp;
            </li>
          ))}
        </ul>
      )}

      <div className='fdDetails__extra'>
        <div className='fdDetails__extra__inf'>
          {getVoteAverageVisual}
          {getAvailability}
        </div>
        {!modal && (
          <nav className='fdDetails__extra__nav'>
            <button
              className='fdDetails__extra__nav--details'
              aria-label={`View more details about ${data.title}`}
              onPointerUp={() => {
                setModal('movie');
                setModalTrailer(data);
              }}>
              More Details
            </button>
            <DetailsCollectionDropdown />
          </nav>
        )}
      </div>

      {modal && (
        <>
          {watchProviders && (
            <div className='fdDetails__providers'>
              {watchProviders.flatrate && (
                <div className='fdDetails__providers__provider'>
                  <header>
                    <h3>{data.title} is Streaming on:</h3>
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
                    <h3>Rent or Purchase {data.title}</h3>
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
                    <h3>Purchase {data.title}</h3>
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
                    <h3>Rent {data.title}</h3>
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
    </article>
  );
};

export default FDDetails;
