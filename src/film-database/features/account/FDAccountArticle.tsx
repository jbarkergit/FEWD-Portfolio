import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountArticle = forwardRef<HTMLElement, Type_PropDrill>(({ toggleComponent }, articleRefReceiver) => {
  return (
    <main className='fdAccountArticle' ref={articleRefReceiver} data-activity='active'>
      <article className='fdAccountArticle__article'>
        <section className='fdAccountArticle__article__about'>
          <blockquote className='fdAccountArticle__article__about--blockquote' cite='https://www.themoviedb.org/?language=en-US'>
            Powered by{' '}
            <Link
              to='https://www.themoviedb.org/?language=en-US'
              className='fdAccountArticle__article__about--blockquote--tmdb'
              aria-label='Visit The Movie Database'
              target='_blank'>
              TMDB
            </Link>
          </blockquote>
          <hgroup className='fdAccountArticle__article__about__hgroup'>
            <h1 className='fdAccountArticle__article__about__hgroup--h1'>Stay in the know with the latest releases</h1>
            <h2 className='fdAccountArticle__article__about__hgroup--h2'>Free now, free forever</h2>
          </hgroup>
        </section>
        <section className='fdAccountArticle__article__cta'>
          <h2>Account options</h2>
          <button
            className='fdAccountArticle__article__cta--accBtn fdAccountArticle__article--signin'
            aria-label='Sign in'
            onClick={() => toggleComponent('signin')}>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='m17.5 11l-2.09 9H10.5l2.09-9zM20 9h-9L8 22h9zM4 6l4-4v3h8v2H8v3z'></path>
            </svg>{' '}
            Sign in
          </button>
          <button
            className='fdAccountArticle__article__cta--accBtn fdAccountArticle__article--signup'
            aria-label='Sign up'
            onClick={() => toggleComponent('registry')}>
            Sign up{' '}
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path fill='currentColor' d='m12.5 11l-2.09 9H5.5l2.09-9zM15 9H6L3 22h9zm6-3l-4-4v3H9v2h8v3z'></path>
            </svg>
          </button>
        </section>
      </article>
    </main>
  );
});

export default FDAccountArticle;
