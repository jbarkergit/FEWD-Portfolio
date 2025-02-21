import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/config/firebaseConfig';

export function authorizeUser() {
  async function emailAndPassword(fields: { emailAddress: string; password: string }) {
    try {
      await signInWithEmailAndPassword(firebaseAuth, fields.emailAddress, fields.password);
      window.location.reload();
    } catch (err) {
      console.error('Error thrown during Email and Password authorization: ', err);
    }
  }

  async function google() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      window.location.reload();
    } catch (err) {
      console.error('Error thrown during Google authorization: ', err);
    }
  }

  async function github() {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      window.location.reload();
    } catch (err) {
      console.error('Error thrown during Github authorization: ', err);
    }
  }

  return { emailAndPassword, google, github };
}
