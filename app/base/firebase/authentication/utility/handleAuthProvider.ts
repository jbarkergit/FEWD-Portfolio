import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

/**
 * @function handleAuthProvider
 * @description Handles Firebase authentication via provider
 */
export const handleAuthProvider = async (provider: 'github' | 'google'): Promise<void> => {
  let authProvider: GithubAuthProvider | GoogleAuthProvider;

  switch (provider) {
    case 'github':
      authProvider = new GithubAuthProvider();
      break;

    case 'google':
      authProvider = new GoogleAuthProvider();
      break;

    default:
      throw new Error('Authentication provider is unidentified.');
  }

  try {
    await signInWithPopup(firebaseAuth, authProvider);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
