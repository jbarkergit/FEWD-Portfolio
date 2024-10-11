import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../../app/config/firebaseConfig';

type Type_PropDrill = {
  toggleComponent: (modal: 'guide' | 'registry' | 'signin') => void;
};

const FDAccountSignIn = forwardRef<HTMLUListElement, Type_PropDrill>(({ toggleComponent }, signInRefReceiver) => {
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

  /** Form sections */
  const [counter, setCounter] = useState<number>(0);

  const LIArr: HTMLLIElement[] = [];

  const liRef = (reference: HTMLLIElement): void => {
    if (reference && !LIArr.includes(reference)) LIArr.push(reference);
  };

  useEffect(() => LIArr.forEach((li, index) => li.setAttribute('data-status', index === counter ? 'enabled' : 'disabled')), [counter]);

  return (
    <ul className='fdAccount__container__form__fieldset__ul' ref={signInRefReceiver} data-activity='disabled'>
      <li className='fdAccount__container__form__fieldset__ul__li' ref={liRef} data-status='enabled'>
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
        <button className='fdAccount__container__form__fieldset__ul__li__forgot' aria-label='Forgot email'>
          I forgot my email.
        </button>
      </li>

      <li className='fdAccount__container__form__fieldset__ul__li' ref={liRef} data-status='disabled'>
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
        <button className='fdAccount__container__form__fieldset__ul__li__forgot' aria-label='Forgot password'>
          I forgot my password.
        </button>
      </li>
      <li className='fdAccount__container__form__fieldset__ul__cta'>
        <button id='fdUserAccountSubmitForm' aria-label='Sign in' onClick={() => authorizeSignIn()}>
          Sign in
        </button>
      </li>
    </ul>
  );
});

export default FDAccountSignIn;
