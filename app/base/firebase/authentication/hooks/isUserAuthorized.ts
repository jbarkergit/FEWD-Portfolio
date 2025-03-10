import { firebaseAuth } from '../../config/firebaseConfig';

export default function isUserAuthorized(): Promise<boolean> {
  return new Promise((resolve) => {
    const checkAuthState = firebaseAuth.onAuthStateChanged((user) => {
      checkAuthState();
      resolve(!!user);
    });
  });
}
