// Deps
import { Link } from 'react-router-dom';
// Context
import { useCatalogProvider } from '../../../../context/CatalogContext';
// Assets
import { TheMovieDatabaseLogo } from '../../../../assets/google-material-symbols/tmdbSymbols';
import { useMemo } from 'react';

const FDDetails = () => {
  const { heroData } = useCatalogProvider();
  if (!heroData) return;

  const voteSymbols = {
    full: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path fill='currentColor' d='m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z'></path>
      </svg>
    ),
    half: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path fill='currentColor' d='m15.15 16.85l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4v7.8zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z'></path>
      </svg>
    ),
    empty: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path fill='currentColor' d='m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25'></path>
      </svg>
    ),
  };

  const renderStars: JSX.Element[] = useMemo(() => {
    // 0 to 10 with floating point value
    const voteAverage: number = heroData.vote_average;

    // Init jsx arr
    let stars: JSX.Element[] = [];

    // Push full stars
    const flooredVoteAverage: number = Math.floor(voteAverage / 2); // Floored vote average converted to 0-5
    for (let i = 0; i < flooredVoteAverage; i++) stars.push(voteSymbols.full);

    // Push half star if applicable
    const hasFloatingValue: boolean = voteAverage % 2 >= 1; // Half star boolean
    if (hasFloatingValue) stars.push(voteSymbols.half);

    // Calculate empty stars
    const maxStars: number = 5; // Total stars to display
    const emptyStars = maxStars - stars.length; // Calculate empty space in stars arr
    for (let i = 0; i < emptyStars; i++) stars.push(voteSymbols.empty);

    return stars;
  }, [heroData]);

  const renderDate: string = useMemo(() => {
    // Get current date
    const date: Date = new Date();
    const currentDate: Record<'month' | 'day' | 'year', number> = { month: date.getMonth() + 1, day: date.getDay(), year: date.getFullYear() };

    // Get movie release date
    const dataReleaseDate: string = heroData.release_date.replaceAll('-', '');
    const releaseDate: typeof currentDate = {
      month: parseInt(dataReleaseDate.slice(4, 6)),
      day: parseInt(dataReleaseDate.slice(6, 8)),
      year: parseInt(dataReleaseDate.slice(0, 4)),
    };

    // Compare dates
    const isMovieReleased: boolean = releaseDate.year > currentDate.year || (releaseDate.year === currentDate.year && releaseDate.month > currentDate.month) || (releaseDate.year === currentDate.year && releaseDate.month === currentDate.month && releaseDate.day > currentDate.day);

    // Return formatted date or 'Providers'
    if (isMovieReleased) return `${releaseDate.month}/${releaseDate.day}/${releaseDate.year}`;
    return 'Now Available';
  }, [heroData]);

  return (
    <section className='fdDetails'>
      <article className='fdDetails__article'>
        <footer className='fdDetails__article__footer'>
          <Link to='https://www.themoviedb.org/?language=en-US'>
            <TheMovieDatabaseLogo />
          </Link>
        </footer>
        <header className='fdDetails__article__header'>
          <h2>{heroData.title}</h2>
        </header>
        <div className='fdDetails__article__details'>
          <div className='fdDetails__article__details__release'>
            <div>
              {renderStars.map((star) => (
                <span key={heroData.title}>{star}</span>
              ))}
            </div>
            <span data-status={renderDate === 'Now Available' ? 'green' : ''}>{renderDate}</span>
          </div>
          <nav className='fdDetails__article__details__cta'>
            <Link to={`/film-database/${heroData.id}`} aria-label={`More details about ${heroData.title}`}>
              View more details
            </Link>
          </nav>
        </div>
        <div className='fdDetails__article__description'>
          <p>{heroData.overview}</p>
        </div>
      </article>
    </section>
  );
};

export default FDDetails;
