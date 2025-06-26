import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';
import type z from 'zod';

export const useFirestoreLogin = async <Input, Output>(parse: z.SafeParseReturnType<Input, Output>, values: Record<string, string>) => {
  if (parse.success) {
    await signInWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);
    window.location.reload();
  } else {
    const errorMessages: Record<string, string> = {};

    for (const error of parse.error.errors) {
      if (error.path[0]) {
        errorMessages[error.path[0]] = error.message;
      }
    }
  }
};
