import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export async function deauthorizeUser() {
  try {
    await signOut(firebaseAuth);
    window.location.reload();
  } catch (err) {
    console.error('Error thrown during deauthorization: ', err);
  }
}
