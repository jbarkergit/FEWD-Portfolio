import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../../../config/firebaseConfig';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountArticle = forwardRef<HTMLElement, Type_PropDrill>(({ toggleComponent }, articleRefReceiver) => {
  const authorizeWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

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
            <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m-3.29 13.59L14.29 18l-6-6l6-6l1.42 1.41L11.12 12z'></path>
            </svg>{' '}
            Sign in
          </button>
          <button
            className='fdAccountArticle__article__cta--accBtn fdAccountArticle__article--signup'
            aria-label='Sign in with Google'
            onClick={() => authorizeWithGoogle()}>
            <svg xmlns='http://www.w3.org/2000/svg' width='1.04em' height='1.3em' viewBox='0 0 256 262'>
              <path
                fill='#4285F4'
                d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path>
              <path
                fill='#34A853'
                d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path>
              <path
                fill='#FBBC05'
                d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'></path>
              <path
                fill='#EB4335'
                d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path>
            </svg>
          </button>
          <button
            className='fdAccountArticle__article__cta--accBtn fdAccountArticle__article--signup'
            aria-label='Register new account'
            onClick={() => toggleComponent('registry')}>
            Register{' '}
            <svg xmlns='http://www.w3.org/2000/svg' width='1.3em' height='1.3em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2M9.71 18l-1.42-1.41L12.88 12L8.29 7.41L9.71 6l6 6z'></path>
            </svg>
          </button>
        </section>
      </article>
    </main>
  );
});

export default FDAccountArticle;
