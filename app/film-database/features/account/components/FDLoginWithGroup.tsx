import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { DeviconGoogle, TablerBrandGithubFilled } from '~/film-database/assets/svg/icons';

const FDLoginWithGroup = () => {
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

export default FDLoginWithGroup;
