import { getDocs, collection } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';

const getFirestoreCollection = async (docs: string) => {
  try {
    const querySnapshot = await getDocs(collection(database, docs));
    if (!querySnapshot) throw new Error();
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data }));
    return users;
  } catch (error) {
    console.error(error);
  }
};

export default getFirestoreCollection;
