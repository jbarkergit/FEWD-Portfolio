import { useRef, useCallback, type RefObject } from 'react';
import { useLoaderData } from 'react-router';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import FDAccountSignIn from './fieldsets/FDAccountSignIn';
import FDAccountRegistry from './fieldsets/FDAccountRegistry';
import { DeviconGoogle, TablerBrandGithubFilled } from '~/film-database/assets/svg/icons';

const FDAccountModal = () => {
  /** @loaderData */
  const { accountData } = useLoaderData();

  /**
   * @function setTimeout
   * @description Sets timeout to delay modal visibility
   */
  const accountRef = useRef<HTMLDivElement>(null);
  setTimeout(() => accountRef.current?.setAttribute('data-visible', 'true'), 3200);

  /**
   * @function toggleModalVisibility
   * @description Toggles visibility of modal's components
   */

  let previousRef: RefObject<HTMLDivElement> | null = null;

  const toggleSectionVisibility = useCallback((ref: RefObject<HTMLDivElement>) => {
    if (!ref.current) return;

    const attribute: string = 'data-visible';
    const getVisibility = (reference: typeof ref) => reference.current.getAttribute(attribute);

    if (previousRef && previousRef.current) {
      previousRef.current.setAttribute(attribute, 'false');
    }

    const isVisible = getVisibility(ref) === 'true' || getVisibility(ref) === 'mount';
    ref.current.setAttribute(attribute, isVisible ? 'false' : 'true');
    previousRef = ref;
  }, []);

  /** @JSX */
  return (
    <main className='fdAccount' data-layout-carousel>
      <form className='fdAccountModal__form'>
        <fieldset className='fdAccountModal__form__fieldset'>
          <FDAccountSignIn toggleSectionVisibility={toggleSectionVisibility} />
          <FDAccountRegistry toggleSectionVisibility={toggleSectionVisibility} />
        </fieldset>
        <div className='fdAccount__cta'>
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
        {/* <button type='submit' className='fdAccountModal__form__fieldset__button'>
            Submit Form
          </button> */}
      </form>
    </main>
  );
};

export default FDAccountModal;
