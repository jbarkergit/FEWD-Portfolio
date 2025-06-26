import type { User } from 'firebase/auth';

export type FirestoreCollectionNames = 'users';
export type FirestoreMovieListUpdate = { movieId: number; concat: boolean };

export type FirestoreUserDocument = {
  credentials: {
    isAnonymous: User['isAnonymous'];
    email: User['email'];
    emailVerified: User['emailVerified'];
    displayName: User['displayName'];
  };
  metadata: {
    uid: User['uid'];
    creationTime: User['metadata']['creationTime'];
    lastSignInTime: User['metadata']['lastSignInTime'];
  };
  movies: Array<number> | [];
};
