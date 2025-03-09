import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { database } from '~/base/config/firebaseConfig';

const FDMovieList = () => {
  const [users, setUsers] = useState<unknown>();

  /**
   * @function getUser
   * @returns
   *
   */
  (async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'users'));
      if (!querySnapshot) throw new Error();
      const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data }));
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  })();

  /** JSX */
  return <></>;
};

export default FDMovieList;
