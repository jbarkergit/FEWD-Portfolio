import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';
import { createFirestoreCollectionUser } from '../../firestore/utility/createFirestoreCollectionUser';

export async function useCreateUser(emailAddress: string, password: string) {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, emailAddress, password);
    createFirestoreCollectionUser();
  } catch (error) {
    console.error(error);
  }
}
