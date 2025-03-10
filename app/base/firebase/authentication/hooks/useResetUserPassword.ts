import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export async function useResetUserPassword(email: string) {
  try {
    sendPasswordResetEmail(firebaseAuth, email);
  } catch (error) {
    console.error(error);
  }
}
