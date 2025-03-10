import { getDocs, collection } from 'firebase/firestore';
import { database, firebaseAuth } from '../../config/firebaseConfig';
import isUserAuthorized from '../../authentication/hooks/isUserAuthorized';

export async function getFirestoreCollection(docs: string) {
  if (!isUserAuthorized) return undefined;

  try {
    const querySnapshot = await getDocs(collection(database, docs));
    if (!querySnapshot) throw new Error('Failure to retrieve collection from Firestore.');
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data }));
    return users;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default getFirestoreCollection;
