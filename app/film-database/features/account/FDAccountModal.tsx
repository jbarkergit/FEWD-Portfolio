import { useState, useRef, useEffect, type FC, type ReactNode } from 'react';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountReset from './fieldsets/FDAccountReset';
import { useLoaderData } from 'react-router';
import { DeviconGoogle, TablerBrandGithubFilled } from '~/film-database/assets/svg/icons';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';

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
          onPointerUp={async (e) => {
            e.preventDefault();
            const provider = new GoogleAuthProvider();
            await signInWithPopup(firebaseAuth, provider);
            window.location.reload();
          }}>
          <DeviconGoogle />
        </button>
        <button
          aria-label='Sign in with Github'
          onPointerUp={async (e) => {
            e.preventDefault();
            const provider = new GithubAuthProvider();
            await signInWithPopup(firebaseAuth, provider);
            window.location.reload();
          }}>
          <TablerBrandGithubFilled />
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
