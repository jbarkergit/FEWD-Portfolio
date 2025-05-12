import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { forwardRef, useState, type PointerEvent } from 'react';
import type { ChangeEvent, FC, JSX, ReactNode } from 'react';
import { z } from 'zod';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { zodSchema } from '~/base/validation/schema/zodSchema';
import FDLoginWithGroup from '../components/FDLoginWithGroup';
import FDModalParent from '../components/FDModalParent';

type Props = {
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const FDAccountSignIn = forwardRef<HTMLUListElement, Props>(({ setModal }, signInRefReceiver) => {
  // Input values store
  const [values, setValues] = useState<Record<string, string>>({
    emailAddress: '',
    password: '',
  });

  // Submitted flag
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Zod
  const schema = z.object({ emailAddress: zodSchema.contact.shape.emailAddress, password: zodSchema.account.shape.password });
  const parse = schema.safeParse(values);

  /**
   * @function handleValues
   * @description Sets values store with input values
   */
  const handleValues = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name as keyof typeof values;

    setValues((prevValues) => {
      return { ...prevValues, [key]: e.target.value };
    });
  };

  /**
   * @function handleSubmit
   * @description Handles form submission
   * @param e: Pointer Event
   */
  const handleSubmit = async (e: PointerEvent): Promise<void> => {
    e.preventDefault();
    setSubmitted(true);

    if (schema.safeParse(values).success) {
      await signInWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);
      window.location.reload();
    }
  };

  return (
    <>
      <FDModalParent>
        <ul className='fdAccountModal__modals__form__fieldset__ul' ref={signInRefReceiver} data-visible='true'>
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
            {submitted && parse.error?.errors.some((err) => err.path.includes('emailAddress')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('emailAddress'))[0].message}</span>
            )}
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
            {submitted && parse.error?.errors.some((err) => err.path.includes('password')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('password'))[0].message}</span>
            )}
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
      </FDModalParent>

      <div className='fdAccountModal__modals__btns'>
        <button aria-label='Sign in with your credentials' onPointerUp={handleSubmit}>
          Sign in
        </button>
        <button aria-label='Create a new account' onPointerUp={() => setModal('registry')}>
          Create a new account
        </button>
        <FDLoginWithGroup />
      </div>
    </>
  );
});

export default FDAccountSignIn;
