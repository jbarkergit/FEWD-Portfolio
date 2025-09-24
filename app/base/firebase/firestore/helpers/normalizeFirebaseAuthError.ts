import { FirebaseError } from 'firebase/app';

export function normalizeFirebaseAuthError(error: unknown): Error {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // https://firebase.google.com/docs/reference/node/firebase.auth.Error
      case 'auth/app-not-authorized':
        return new Error('This app is not authorized to use Firebase Authentication.');
      case 'auth/invalid-api-key':
        return new Error('The provided API key is invalid.');
      case 'auth/invalid-user-token':
        return new Error('The user’s credentials are no longer valid. Please sign in again.');
      case 'auth/network-request-failed':
        return new Error('A network error occurred (timeout, interrupted connection, or unreachable host).');
      case 'auth/operation-not-allowed':
        return new Error('This authentication provider is not enabled.');
      case 'auth/requires-recent-login':
        return new Error('Your credentials are too old. Please sign in again to proceed.');
      case 'auth/too-many-requests':
        return new Error(
          'Access from this device has been temporarily blocked due to unusual activity. Try again later.'
        );
      case 'auth/unauthorized-domain':
        return new Error('This app domain is not authorized for OAuth operations.');
      case 'auth/user-token-expired':
        return new Error('The user’s credential has expired or the account was deleted. Please sign in again.');
      case 'auth/web-storage-unsupported':
        return new Error(
          'This browser does not support web storage or it is disabled. Enable cookies/local storage and try again.'
        );

      // https://firebase.google.com/docs/auth/admin/errors
      case 'auth/email-already-in-use':
        return new Error('This email is already in use.');
      case 'auth/invalid-email':
        return new Error('Please enter a valid email address.');
      case 'auth/weak-password':
        return new Error('Password must be at least 6 characters.');
      case 'auth/user-disabled':
        return new Error('Your account has been disabled.');
      case 'auth/user-not-found':
        return new Error('No account found with this email.');
      case 'auth/wrong-password':
        return new Error('Incorrect password.');
      case 'auth/email-already-exists':
        return new Error('The email is already in use by another account.');
      case 'auth/internal-error':
        return new Error('An internal error occurred in Firebase Authentication.');
      case 'auth/invalid-password':
        return new Error('Password must be at least 6 characters.');
      case 'auth/invalid-phone-number':
        return new Error('Invalid phone number provided.');
      case 'auth/phone-number-already-exists':
        return new Error('This phone number is already in use.');
      case 'auth/session-cookie-expired':
        return new Error('Session cookie has expired.');
      case 'auth/session-cookie-revoked':
        return new Error('Session cookie has been revoked.');

      default:
        return new Error('An unexpected Firebase authentication error occurred.');
    }
  }
  return new Error('Unknown error occurred.');
}
