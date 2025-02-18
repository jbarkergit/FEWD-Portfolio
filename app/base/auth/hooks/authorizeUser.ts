import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/config/firebaseConfig';

type emailAndPassword = {
  emailAddress: {
    value: string;
    valid: boolean;
  };
  password: {
    value: string;
    valid: boolean;
  };
};

export function authorizeUser() {
  async function emailAndPassword(fields: emailAndPassword) {
    const isFieldsValid: boolean = !Object.values(fields).some((field) => field.valid === false);

    if (isFieldsValid) {
      try {
        await signInWithEmailAndPassword(firebaseAuth, fields.emailAddress.value, fields.password.value);
      } catch (err) {
        console.error('Error thrown during Email and Password authorization: ', err);
      }
    }
  }

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

  return { emailAndPassword, google, github };
}
