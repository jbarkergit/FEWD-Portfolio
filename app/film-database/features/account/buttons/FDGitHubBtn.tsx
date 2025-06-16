import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { TablerBrandGithubFilled } from '~/film-database/assets/svg/icons';

const FDGitHubBtn = () => {
  return (
    <button
      type='button'
      aria-label='Sign in with Github'
      onPointerUp={async (e) => {
        e.preventDefault();
        const provider = new GithubAuthProvider();
        await signInWithPopup(firebaseAuth, provider);
        window.location.reload();
      }}>
      <TablerBrandGithubFilled /> Sign in with GitHub
    </button>
  );
};

export default FDGitHubBtn;
