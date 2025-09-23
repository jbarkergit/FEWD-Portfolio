import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';

export const createFirestoreUser = async (data: { emailAddress: string; password: string }) => {
  const { emailAddress, password } = data;

  try {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, emailAddress, password);
    if (!userCredential?.user) throw new Error('Failed to create user account.');

    await signInWithEmailAndPassword(firebaseAuth, emailAddress, password);
    setTimeout(() => window.location.reload(), 0);
  } catch (error) {
    console.error(error);
  }
};
