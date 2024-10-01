import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountArticle = forwardRef<HTMLElement, Type_PropDrill>(({ toggleComponent }, articleRefReceiver) => {
  return (
    <main className='fdAccountArticle' ref={articleRefReceiver} data-activity='disabled'>
      <div className='fdAccountArticle__cta'>
        <button className='fdAccountArticle__cta__registry' aria-label='Register a new account' onClick={() => toggleComponent('registry')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z'></path>
          </svg>
        </button>
        <button className='fdAccountArticle__cta__signin' aria-label='Sign in to your account' onClick={() => toggleComponent('signin')}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M20 11q-.425 0-.712-.288T19 10t.288-.712T20 9t.713.288T21 10t-.288.713T20 11m-1-3V3h2v5zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z'></path>
          </svg>
        </button>
      </div>
      <article className='fdAccountArticle__article'>
        <blockquote className='fdAccountArticle__article--blockquote' cite='https://www.themoviedb.org/?language=en-US'>
          Powered by{' '}
          <Link
            to='https://www.themoviedb.org/?language=en-US'
            className='fdAccountArticle__article--blockquote--tmdb'
            aria-label='Visit The Movie Database'
            target='_blank'>
            TMDB API
          </Link>
        </blockquote>
        <hgroup className='fdAccountArticle__article__hgroup'>
          <h1 className='fdAccountArticle__article__hgroup--h1'>Fresh flicks and retro hits</h1>
          <h2 className='fdAccountArticle__article__hgroup--h2'>
            Watch trailers, get cast details, save movies, create a watch queue, receive ticket alerts via sms & more. Free of charge now, free forever.
          </h2>
        </hgroup>
      </article>
    </main>
  );
});

export default FDAccountArticle;
