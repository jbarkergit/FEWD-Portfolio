import type { User } from 'firebase/auth';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';

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
  movies: Record<string, { data: TmdbMovieProvider[]; header: string }>;
};
