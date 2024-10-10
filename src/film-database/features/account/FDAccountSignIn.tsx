import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../../app/config/firebaseConfig';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountSignIn = forwardRef<HTMLDivElement, Type_PropDrill>(({ toggleComponent }, signInRefReceiver) => {
  /** Value setter */
  const ulRef = useRef<HTMLUListElement>(null);

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
    <div className='fdAccountSignIn' ref={signInRefReceiver} data-activity='disabled'>
      <fieldset className='fdAccountSignIn__container'>
        <section className='fdAccountSignIn__container__col'>
          <div className='fdAccountSignIn__container__col__logo'>Film Database</div>
          <legend className='fdAccountSignIn__container__legend'>
            <h2 className='fdAccountSignIn__container__legend--h2'>Sign in</h2>
          </legend>
          <div className='fdAccountSignIn__container__col__hint'>to continue</div>
        </section>

        <ul className='fdAccountSignIn__container__ul' ref={ulRef}>
          <li className='fdAccountSignIn__container__ul__emailAddress' ref={liRef} data-status='enabled'>
            <div className='fdAccountSignIn__container__field__ul__emailAddress__container'>
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
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </div>
            <button className='fdAccountSignIn__container__field__ul__emailAddress__forgot' aria-label='Forgot email'>
              Forgot email?
            </button>
          </li>

          <li className='fdAccountSignIn__container__ul__password' ref={liRef} data-status='disabled'>
            <div className='fdAccountSignIn__container__field__ul__password__container'>
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
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </div>
            <button className='fdAccountSignIn__container__field__ul__password__forgot' aria-label='Forgot password'>
              Forgot password?
            </button>
          </li>

          <li className='fdAccountSignIn__container__ul__container__submitRegistrationForm' ref={liRef} data-status='disabled'>
            <button id='fdUserAccountSubmitForm' aria-label='Sign in' onClick={() => authorizeSignIn()}>
              Sign in
            </button>
          </li>
        </ul>
      </fieldset>
    </div>
  );
});

export default FDAccountSignIn;
