import { useState, type JSX } from 'react';
import { Link } from 'react-router';
// Context
import { useCatalogProvider } from '../../context/CatalogContext';
// Hooks
import { useTmdbFetcher, type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
// Data
import { tmdbMovieGenres } from '~/film-database/composables/tmdb-api/data/tmdbGenres';
// Assets
import { EmptyStar, Exit, FullStar, HalfStar, SvgSpinnersRingResize, TheMovieDatabaseLogo } from '../../assets/google-material-symbols/GoogleMaterialIcons';

const FDDetails = (modal: { modal: boolean }) => {
  const { heroData, setIsModalOpen } = useCatalogProvider();

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

  (async () => {
    const data = (await useTmdbFetcher({ watchProviders: heroData?.id })) as Namespace_Tmdb.WatchProviders_Obj;
    setWatchProviders(data.watchProviders.results.US.flatrate);
  })();

  /**
   * @function renderStars
   * @returns JSX.Element[] containing svgs to indicate vote average
   */
  const renderStars = (): JSX.Element[] => {
    // 0-10 vote scale (contains floating point value)
    const voteAverage: number = heroData.vote_average;
    // Vote average floored and converted to 0-5 vote scale
    const flooredVoteAverage: number = Math.floor(voteAverage / 2);

    // Helpers
    const hasFloatingValue: boolean = voteAverage % 2 >= 1;
    const maxStars: number = 5;

    const fullStars: number = flooredVoteAverage;
    const halfStars: 1 | 0 = hasFloatingValue ? 1 : 0;
    const emptyStars: number = maxStars - fullStars - halfStars;

    return [...Array(fullStars).fill(<FullStar />), ...Array(halfStars).fill(<HalfStar />), ...Array(emptyStars).fill(<EmptyStar />)];
  };

  /**
   * @function renderDate
   * @returns Movie release date OR 'Now Available'
   * Compares current date to movie release date to determine if the film has been released
   */
  const renderDate = (): string => {
    const currentDate: string = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const releaseDate: string = heroData.release_date.replaceAll('-', '');
    // Convert releaseDate to Date object
    const releaseDateObj = new Date(`${releaseDate.slice(0, 4)}-${releaseDate.slice(4, 6)}-${releaseDate.slice(6, 8)}`);

    if (releaseDate > currentDate) {
      return `Available ${releaseDateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`;
    }

    return 'Now Available';
  };

  /** @returns */
  return (
    <section className='fdDetails' data-modal={modal.modal}>
      <article className='fdDetails__article'>
        <button className='fdDetails__article--exit' id='fdDetails--exit' aria-label='Close View More Modal' onPointerUp={() => setIsModalOpen(false)}>
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
          <li aria-label='Vote Average Stars'>
            {renderStars().map((Star, index) => {
              return <span key={`vote-average-star-${index}`}>{Star}</span>;
            })}
          </li>
          <li data-status={renderDate() === 'Now Available' ? 'green' : ''}>{renderDate()}</li>
          <li>
            <nav id='fdDetails--nav'>
              <button aria-label={`View more details about ${heroData.title}`} onClick={() => setIsModalOpen(true)}>
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

        <ul className='fdDetails__article__col' id='fdDetails--providers'>
          Available on:{' '}
          {watchProviders?.map((provider, index) => (
            <li key={`provider-${provider}`}>
              {provider.provider_name}
              {index !== watchProviders.length - 1 ? ',' : null}
              {/* <img src={`https://image.tmdb.org/t/p/${`original`}/${provider.logo_path}`} /> */}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default FDDetails;
