import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export async function useCreateUser(emailAddress: string, password: string) {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, emailAddress, password);
  } catch (error) {
    console.error(error);
  }
}
