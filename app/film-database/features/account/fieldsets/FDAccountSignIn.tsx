import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, type PointerEvent } from 'react';
import type { ChangeEvent, RefObject } from 'react';
import { z } from 'zod';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { zodSchema } from '~/base/validation/schema/zodSchema';
import { useFormValues } from '~/film-database/hooks/useFormValues';

const FDAccountSignIn = ({ toggleSectionVisibility }: { toggleSectionVisibility: (ref: RefObject<HTMLDivElement>) => void }) => {
  /** @state Input values store */
  const { values, handleValues } = useFormValues({ emailAddress: '', password: '' });

  /** @schema ZOD */
  const schema = z.object({ emailAddress: zodSchema.contact.shape.emailAddress, password: zodSchema.account.shape.password });

  /** @state Validation Errors */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * @function handleSubmit
   * @description Handles form submission
   * @param e: Pointer Event
   */
  const handleSubmit = async (e: PointerEvent): Promise<void> => {
    e.preventDefault();
    const parse = schema.safeParse(values);

    if (parse.success) {
      setErrors({});
      await signInWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);
      window.location.reload();
    } else {
      const errorMessages: Record<string, string> = {};

      for (const error of parse.error.errors) {
        if (error.path[0]) {
          errorMessages[error.path[0]] = error.message;
        }
      }

      setErrors(errorMessages);
    }
  };

  return (
    <>
      <legend className='fdAccountModal__form__fieldset__legend'>Sign in</legend>
      <ul className='fdAccountModal__modals__form__fieldset__ul' data-visible='true'>
        <li className='fdAccountModal__modals__form__fieldset__ul__li'>
          <label id='emailAddress' htmlFor='fdUserAccountSignInEmailAddress'>
            Email address
          </label>
          <input
            form='fdRegistery'
            id='fdUserAccountSignInEmailAddress'
            name='emailAddress'
            type='email'
            inputMode='email'
            minLength={3}
            maxLength={76}
            size={12}
            required={true}
            aria-required='true'
            aria-invalid={schema.safeParse(values.emailAddress).success}
            autoCapitalize='off'
            placeholder='johndoe@gmail.com'
            onPointerUp={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleValues(e)}
          />
          {errors.emailAddress && <span className='error-message'>{errors.emailAddress}</span>}
        </li>
        <button className='fdAccountModal__modals__form__fieldset__ul__btn' aria-label='Forgot email'>
          I forgot my email.
        </button>

        <li className='fdAccountModal__modals__form__fieldset__ul__li'>
          <label id='password' htmlFor='fdUserAccountSignInPassword'>
            Password
          </label>
          <input
            form='fdRegistery'
            id='fdUserAccountSignInPassword'
            name='password'
            type='password'
            inputMode='text'
            minLength={8}
            maxLength={32}
            size={12}
            required={true}
            aria-required='true'
            aria-invalid={schema.safeParse(values.password).success}
            autoCapitalize='off'
            placeholder='••••••••'
            onPointerUp={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleValues(e)}
          />
          {errors.password && <span className='error-message'>{errors.password}</span>}
        </li>
        <button
          className='fdAccountModal__modals__form__fieldset__ul__btn'
          aria-label='Forgot password'
          onPointerUp={(e) => {
            e.preventDefault();
            if (schema.safeParse(values).success) sendPasswordResetEmail(firebaseAuth, values.emailAddress);
          }}>
          I forgot my password.
        </button>
      </ul>

      <div className='fdAccountModal__modals__btns'>
        <button aria-label='Sign in with your credentials' onPointerUp={handleSubmit}>
          Sign in
        </button>
        <button
          aria-label='Create a new account'
          // onPointerUp={() => setModal('registry')}
        >
          Create a new account
        </button>
      </div>
    </>
  );
};

export default FDAccountSignIn;
