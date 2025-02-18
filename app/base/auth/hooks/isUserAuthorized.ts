import { firebaseAuth } from '~/base/config/firebaseConfig';

export default function isUserAuthorized(): Promise<boolean> {
  return new Promise((resolve) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
}
