import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/config/firebaseConfig';

export function authorizeUser() {
  async function google() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      console.error('Error thrown during Google authorization: ', err);
    }
  }

  async function github() {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
    } catch (err) {
      console.error('Error thrown during Github authorization: ', err);
    }
  }

  return { google, github };
}
