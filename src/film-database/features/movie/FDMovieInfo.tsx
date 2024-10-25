import { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDMovieInfo = ({ details }: { details: Namespace_Tmdb.Details_Obj['details'] }) => {
  return (
    <main className='fdMovie__container__info'>
      <article className='fdMovie__container__info__article'>
        <header className='fdMovie__container__info__article__header'>
          <hgroup className='fdMovie__container__info__article__header__hgroup'>
            <h1 className='fdMovie__container__info__article__header__hgroup--title'>{details.title}</h1>
            <h2 className='fdMovie__container__info__article__header__hgroup--releaseDate'>{details.release_date}</h2>
          </hgroup>
        </header>
        <p className='fdMovie__container__info__article__header--overview'>{details.overview}</p>
      </article>
      <nav className='fdMovie__container__info__cta'>
        <button aria-label=''>Continue Browsing</button>
        <button aria-label=''>Watch the Trailer</button>
      </nav>
    </main>
  );
};

export default FDMovieInfo;
