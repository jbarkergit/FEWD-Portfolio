import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { DeviconGoogle } from '~/film-database/assets/svg/icons';

const FDGoogleBtn = () => {
  return (
    <button
      aria-label='Sign in with Google'
      onPointerUp={async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(firebaseAuth, provider);
        window.location.reload();
      }}>
      <DeviconGoogle /> Sign in with Google
    </button>
  );
};

export default FDGoogleBtn;
