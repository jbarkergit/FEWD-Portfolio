import type { User } from 'firebase/auth';
import isUserAuthorized from '../../authentication/utility/isUserAuthorized';
import { firebaseAuth } from '../../config/firebaseConfig';

export const getFirestoreUser = async (): Promise<User | undefined> => {
  try {
    // If user is authenticated
    if (!(await isUserAuthorized())) throw new Error('User is not authorized.');
    // Get and return user
    const user: User | null = firebaseAuth.currentUser;
    if (!user) throw new Error('User missing.');
    return user;
  } catch (error) {
    console.error('Failure to identify user: ' + error);
  }
};
