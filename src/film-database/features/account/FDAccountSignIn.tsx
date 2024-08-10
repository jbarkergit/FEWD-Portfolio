import { ChangeEvent, useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../../config/firebaseConfig';

const FDAccountSignIn = () => {
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
    <section className='fdAccountSignIn'>
      <fieldset>
        <section className='fdAccountSignIn__container__col'>
          <div className='fdAccountSignIn__container__col__logo'>Film Database</div>
          <legend className='fdAccountSignIn__container__fieldset__legend'>
            <h2 className='fdAccountSignIn__container__fieldset__legend--h2'>Sign in</h2>
          </legend>
          <div className='fdAccountSignIn__container__col__hint'>to continue</div>
        </section>

        <ul className='fdAccountSignIn__container__fieldset__ul' ref={ulRef}>
          <li className='fdAccountSignIn__container__fieldset__ul__emailAddress'>
            <div className='fdAccountSignIn__container__field__ul__emailAddress__container'>
              <label id='emailAddress' htmlFor='fdUserAccountEmailAddress'>
                Email address
              </label>
              <input
                form='fdRegistery'
                id='fdUserAccountEmailAddress'
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

          <li className='fdAccountSignIn__container__fieldset__ul__password'>
            <div className='fdAccountSignIn__container__field__ul__password__container'>
              <label id='password' htmlFor='fdUserAccountPassword'>
                Password
              </label>
              <input
                form='fdRegistery'
                id='fdUserAccountPassword'
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

          <li className='fdAccountSignIn__container__fieldset__ul__container__submitRegistrationForm'>
            <button id='fdUserAccountSubmitForm' aria-label='Sign in' onClick={() => authorizeSignIn()}>
              Sign in
            </button>
          </li>
        </ul>
      </fieldset>
    </section>
  );
};

export default FDAccountSignIn;
