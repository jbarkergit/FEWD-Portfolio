import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import type z from 'zod';
import { firebaseAuth } from '../../config/firebaseConfig';

export const createFirestoreUser = async <Input, Output>(parse: z.SafeParseReturnType<Input, Output>, values: Record<string, string>) => {
  try {
    if (!parse.success) {
      const errorMessage = parse.error.errors.map((err) => `${err.path.join('.')} - ${err.message}`).join(', ');
      throw new Error(`One or more form fields are not valid: ${errorMessage}`);
    }

    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);

    if (!userCredential?.user) throw new Error('Failed to create user account.');

    await signInWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);

    setTimeout(() => window.location.reload(), 0);
  } catch (error) {
    console.error(error);
  }
};
