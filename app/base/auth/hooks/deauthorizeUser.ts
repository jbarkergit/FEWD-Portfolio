import { firebaseAuth } from '~/base/config/firebaseConfig';
import { signOut } from 'firebase/auth';

export async function deauthorizeUser() {
  try {
    await signOut(firebaseAuth);
    window.location.reload();
  } catch (err) {
    console.error('Error thrown during deauthorization: ', err);
  }
}
