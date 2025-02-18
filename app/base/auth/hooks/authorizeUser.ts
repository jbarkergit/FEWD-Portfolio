import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '~/base/config/firebaseConfig';

async function authorizeGoogleUser() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
  } catch (err) {
    console.error('Error thrown during Google authorization: ', err);
  }
}

async function authorizeGithubUser() {
  try {
    const provider = new GithubAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
  } catch (err) {
    console.error('Error thrown during Github authorization: ', err);
  }
}

export default async function authorizeUser() {
  const google = await authorizeGoogleUser();
  const github = await authorizeGithubUser();
  return { google, github };
}
