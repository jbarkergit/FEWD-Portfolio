import { Link } from 'react-router-dom';

const FDUserAccountArticle = () => {
  return (
    <article className='fdUserAccount__article'>
      <section className='fdUserAccount__article__about'>
        <blockquote className='fdUserAccount__article__about--blockquote' cite='https://www.themoviedb.org/?language=en-US'>
          Powered by{' '}
          <Link
            to='https://www.themoviedb.org/?language=en-US'
            className='fdUserAccount__article__about--blockquote--tmdb'
            aria-label='Visit The Movie Database'
            target='_blank'>
            TMDB
          </Link>
        </blockquote>
        <hgroup className='fdUserAccount__article__about__hgroup'>
          <h1 className='fdUserAccount__article__about__hgroup--h1'>Stay in the know with the latest releases</h1>
          <h2 className='fdUserAccount__article__about__hgroup--h2'>Never miss a new release with sms alerts.</h2>
        </hgroup>
      </section>
      <section className='fdUserAccount__article__cta'>
        <button className='fdUserAccount__article__cta--accBtn fdUserAccount__article--signin' aria-label='Sign in'>
          Sign in
        </button>
        <button className='fdUserAccount__article__cta--accBtn fdUserAccount__article--guest' aria-label='Browse as a guest with limited functionality'>
          Guest (limited) access
        </button>
        <button className='fdUserAccount__article__cta--accBtn fdUserAccount__article--signup' aria-label='Sign up'>
          New member
        </button>
      </section>
    </article>
  );
};

export default FDUserAccountArticle;
