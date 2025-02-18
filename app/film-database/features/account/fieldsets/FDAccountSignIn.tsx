import { forwardRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, googleProvider } from '~/base/config/firebaseConfig';
import { authorizeUser } from '~/base/auth/hooks/authorizeUser';

type Type_PropDrill = {
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry'>>;
};

const FDAccountSignIn = forwardRef<HTMLUListElement, Type_PropDrill>(({ setModal }, signInRefReceiver) => {
  /** Value setter */
  const [values, setValues] = useState({
    emailAddress: { value: '', valid: false },
    password: { value: '', valid: false },
  });

  type Type_ValuesKey = keyof typeof values;

  const valueSetter = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name as Type_ValuesKey;

    setValues((prevValues) => {
      return { ...prevValues, [key]: { ...prevValues[key], value: e.target.value } };
    });
  };

  /** Auth */
  const authorizeSignIn = async (): Promise<void> => {
    const isValuesValid: boolean = !Object.values(values).some((value) => value.valid === false);

    if (isValuesValid) {
      try {
        await signInWithEmailAndPassword(firebaseAuth, values.emailAddress.value, values.password.value);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ul className='fdAccountModal__form__fieldset__ul' ref={signInRefReceiver} data-visible='true'>
      <li className='fdAccountModal__form__fieldset__ul__li'>
        <label id='emailAddress' htmlFor='fdUserAccountSignInEmailAddress'>
          Email address
        </label>
        <input
          form='fdRegistery'
          id='fdUserAccountSignInEmailAddress'
          name='emailAddress'
          type='email'
          inputMode='email'
          // name, @, domain
          minLength={3}
          // RFC 2045
          maxLength={76}
          size={12}
          required={true}
          aria-required='true'
          aria-invalid={values.emailAddress.valid}
          autoCapitalize='off'
          placeholder='johndoe@gmail.com'
          onClick={() => focus()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
        />
        <button className='fdAccountModal__form__fieldset__ul__li__forgot' aria-label='Forgot email'>
          I forgot my email.
        </button>
      </li>

      <li className='fdAccountModal__form__fieldset__ul__li'>
        <label id='password' htmlFor='fdUserAccountSignInPassword'>
          Password
        </label>
        <input
          form='fdRegistery'
          id='fdUserAccountSignInPassword'
          name='password'
          type='password'
          inputMode='text'
          // RFC 5310, NIST Special Publication 800-63B
          minLength={8}
          // RFC XOS
          maxLength={32}
          size={12}
          required={true}
          aria-required='true'
          aria-invalid={values.password.valid}
          autoCapitalize='off'
          placeholder='••••••••'
          onClick={() => focus()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
        />
        <button className='fdAccountModal__form__fieldset__ul__li__forgot' aria-label='Forgot password'>
          I forgot my password.
        </button>
      </li>
      <li className='fdAccountModal__form__fieldset__ul__cta'>
        <button id='fdUserAccountSubmitForm' aria-label='Sign in with your credentials' onClick={() => authorizeSignIn()}>
          Sign in
        </button>
        <button aria-label='Sign in with Google' onClick={() => authorizeUser()}>
          <svg xmlns='http://www.w3.org/2000/svg' width='0.98em' height='1em' viewBox='0 0 256 262'>
            <path
              fill='#4285F4'
              d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path>
            <path
              fill='#34A853'
              d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path>
            <path
              fill='#FBBC05'
              d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'></path>
            <path
              fill='#EB4335'
              d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path>
          </svg>
        </button>
      </li>
      <li className='fdAccountModal__form__fieldset__ul__signup'>
        <button aria-label='Create a new account' onClick={() => setModal('registry')}>
          Not a member? Create a new account.
        </button>
      </li>
    </ul>
  );
});

export default FDAccountSignIn;
