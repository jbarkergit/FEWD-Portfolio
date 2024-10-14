import { Link } from 'react-router-dom';

const CheckSvg = () => (
  <div>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8'
      />
    </svg>
  </div>
);

type Type_PropDrill = {
  modal: 'signin' | 'registry';
};
const FDAccountGuide = ({ modal }: Type_PropDrill) => {
  return (
    <>
      <div className='fdAccount__container__guide__section'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4t2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675zM4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z'></path>
        </svg>{' '}
        Film Database
      </div>
      <nav className='fdAccount__container__guide__section'>
        <ul className='fdAccount__container__guide__section__ul'>
          {modal === 'registry' ? (
            <>
              <li className='fdAccount__container__guide__section__ul__li' data-status='active'>
                <button aria-label=''>
                  <CheckSvg />
                  <div>
                    <span>Your details</span>
                    <span>Please provide your name and dob</span>
                  </div>
                </button>
              </li>
              <li className='fdAccount__container__guide__section__ul__li' data-status='none'>
                <button aria-label=''>
                  <CheckSvg />
                  <div>
                    <span>Address</span>
                    <span>Assign an email to your new account</span>
                  </div>
                </button>
              </li>
              <li className='fdAccount__container__guide__section__ul__li' data-status='none'>
                <button aria-label=''>
                  <CheckSvg />
                  <div>
                    <span>Choose a password</span>
                    <span>Must be at least 8 characters; containing one capital letter and special character.</span>
                  </div>
                </button>
              </li>
              <li className='fdAccount__container__guide__section__ul__li' data-status='none'>
                <button aria-label=''>
                  <CheckSvg />
                  <div>
                    <span>Authentication</span>
                    <span>Sign in to your account</span>
                  </div>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className='fdAccount__container__guide__section__ul__li' data-status='active'>
                <button aria-label=''>
                  <CheckSvg />
                  <div>
                    <span>Your details</span>
                    <span>Please enter your email and password</span>
                  </div>
                </button>
              </li>
              <li className='fdAccount__container__guide__section__ul__li' data-status='none'>
                <button aria-label=''>
                  <CheckSvg />
                  <div>
                    <span>Authentication</span>
                    <span>Request access to Film Database</span>
                  </div>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className='fdAccount__container__guide__section'>
        <blockquote className='fdAccountArticle__article--blockquote' cite='https://www.themoviedb.org/?language=en-US'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-4q2.5 0 4.25-1.75T18 12q0-1.275-.475-2.363T16.25 7.75l-1.425 1.425q.55.55.863 1.275T16 12q0 1.65-1.175 2.825T12 16t-2.825-1.175T8 12q0-.825.313-1.55t.862-1.275L7.75 7.75q-.8.8-1.275 1.888T6 12q0 2.5 1.75 4.25T12 18m-1-6h2V6h-2z'></path>
          </svg>
          &nbsp;&nbsp;Powered by&nbsp;
          <Link
            to='https://www.themoviedb.org/?language=en-US'
            className='fdAccountArticle__article--blockquote--tmdb'
            aria-label='Visit The Movie Database'
            target='_blank'>
            The Movie Database
          </Link>
        </blockquote>
      </div>
    </>
  );
};

export default FDAccountGuide;

{
  /* <div className='fdAccountArticle__cta'>
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
      </div> */
}
