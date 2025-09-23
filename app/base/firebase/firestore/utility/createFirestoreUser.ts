import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export const createFirestoreUser = async (data: { emailAddress: string; password: string }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.emailAddress, data.password);
    await signInWithEmailAndPassword(firebaseAuth, data.emailAddress, data.password);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
