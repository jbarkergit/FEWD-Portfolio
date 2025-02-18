import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Navigate } from 'react-router';
import { firebaseAuth } from '~/base/config/firebaseConfig';

export async function authorizeUser() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
    Navigate({ to: '/film-database' });
  } catch (err) {
    console.error('Login error:', err);
  }
}
