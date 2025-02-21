import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '~/base/config/firebaseConfig';

export async function resetUserPassword(email: string) {
  try {
    sendPasswordResetEmail(firebaseAuth, email);
  } catch (error) {
    console.error(error);
  }
}
