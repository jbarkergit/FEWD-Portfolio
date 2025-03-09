import { useState, useRef, useEffect, type FC, type ReactNode } from 'react';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountReset from './fieldsets/FDAccountReset';

import { useLoaderData } from 'react-router';
import { authorizeUser } from '~/base/firebase/authentication/hooks/authorizeUser';

const FDAccountModal = () => {
  const { accountData } = useLoaderData();

  // Primary state forcing rerenders
  const [modal, setModal] = useState<'signin' | 'registry' | 'reset'>('signin');

  // References to modal's children components
  const accountRef = useRef<HTMLDivElement>(null),
    registryRefReceiver = useRef<HTMLUListElement>(null),
    signInRefReceiver = useRef<HTMLUListElement>(null),
    resetRefReceiver = useRef<HTMLUListElement>(null);

  // Delay modal visibility on mount
  setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);

  // Handle visibility of modal's components (sign in && registry)
  function toggleModalVisibility() {
    const attribute: string = 'data-visible';

    for (const ref of [registryRefReceiver, signInRefReceiver, resetRefReceiver]) {
      if (ref.current) {
        const visibility: string | null = ref.current.getAttribute(attribute);
        const isVisible: boolean = visibility === 'true' || visibility === 'mount';
        ref.current.setAttribute(attribute, isVisible ? 'false' : 'true');
      }
    }

    let compRef: React.RefObject<HTMLUListElement | null>;
    const isModalSignin: boolean = modal === 'signin';

    compRef = isModalSignin ? signInRefReceiver : registryRefReceiver;
    setModal(isModalSignin ? 'signin' : 'registry');

    if (compRef.current) compRef.current.setAttribute(attribute, 'true');
  }

  useEffect(() => toggleModalVisibility(), [modal]);

  // Modal components shared parents
  const ModalParent: FC<{ children: ReactNode }> = ({ children }) => {
    return (
      <form className='fdAccountModal__modals__form'>
        <fieldset className='fdAccountModal__modals__form__fieldset'>{children}</fieldset>
      </form>
    );
  };

  // Modal components shared 'login with'
  const LoginWithGroup = () => {
    return (
      <div className='fdAccountModal__modals__btns__grouped'>
        <button
          aria-label='Sign in with Google'
          onPointerUp={(e) => {
            e.preventDefault();
            authorizeUser().google();
          }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 262'>
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
          aria-label='Sign in with Github'
          onPointerUp={(e) => {
            e.preventDefault();
            authorizeUser().github();
          }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
              <path
                stroke-dasharray='32'
                stroke-dashoffset='32'
                d='M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3'>
                <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.7s' values='32;0'></animate>
              </path>
              <path stroke-dasharray='10' stroke-dashoffset='10' d='M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31'>
                <animate fill='freeze' attributeName='stroke-dashoffset' begin='0.8s' dur='0.2s' values='10;0'></animate>
              </path>
            </g>
          </svg>
        </button>
      </div>
    );
  };

  // JSX
  return (
    <main className='fdAccountModal' ref={accountRef} data-visible='false'>
      <article className='fdAccountModal__article'>
        <img
          className='fdAccountBackground__backdrop__set__li__container--img'
          src={`https://image.tmdb.org/t/p/${`original`}/${accountData[0][0].backdrop_path}`}
          alt={`${accountData[0][0]?.title}`}
        />
        <h2>Film Database</h2>
        <p>Watch trailers, get cast details, save movies, create a watch queue and more. Free of charge now, free forever.</p>
      </article>
      <div className='fdAccountModal__modals'>
        {modal === 'signin' && <FDAccountSignIn ModalParent={ModalParent} LoginWithGroup={LoginWithGroup} setModal={setModal} ref={signInRefReceiver} />}
        {modal === 'registry' && <FDAccountRegistry ModalParent={ModalParent} LoginWithGroup={LoginWithGroup} setModal={setModal} ref={registryRefReceiver} />}
        {modal === 'reset' && <FDAccountReset ModalParent={ModalParent} setModal={setModal} ref={resetRefReceiver} />}
      </div>
    </main>
  );
};

export default FDAccountModal;
