import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export const useFirestoreLogin = async (data: { emailAddress: string; password: string }) => {
  const { emailAddress, password } = data;

  try {
    await signInWithEmailAndPassword(firebaseAuth, emailAddress, password);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
