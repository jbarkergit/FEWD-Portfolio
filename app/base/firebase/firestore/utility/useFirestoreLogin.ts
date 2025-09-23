import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export const useFirestoreLogin = async (data: { emailAddress: string; password: string }) => {
  const { emailAddress, password } = data;

  try {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, emailAddress, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
