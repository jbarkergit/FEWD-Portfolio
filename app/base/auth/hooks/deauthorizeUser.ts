import { firebaseAuth } from '~/base/config/firebaseConfig';
import { signOut } from 'firebase/auth';

export async function signOutUser() {
  try {
    await signOut(firebaseAuth);
  } catch (err) {
    console.error('Error thrown during deauthorization: ', err);
  }
}
