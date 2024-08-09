import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ChangeEvent, FormEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { firebaseAuth } from '../../../config/firebaseConfig';

type Type_PropDrill = {
  toggleComponent: (modal: 'article' | 'registry' | 'signin') => void;
};

const FDAccountRegistry = forwardRef<HTMLFormElement, Type_PropDrill>(({ toggleComponent }, registryRefReceiver) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const [values, setValues] = useState({
    firstName: { value: '', valid: false },
    lastName: { value: '', valid: false },
    emailAddress: { value: '', valid: false },
    password: { value: '', valid: false },
    passwordConfirmation: { value: '', valid: false },
  });

  useEffect(() => console.log(values), [values]);

  type Type_ValuesKey = keyof typeof values;

  const regex = {
    /** First name, Last name
     * [a-zA-Z-']{1,}$: Followed by one or more letters, hyphens, or apostrophes.
     * Can include hyphens and apostrophes.
     */
    firstName: /[a-zA-Z-']{1,}$/,
    lastName: /[a-zA-Z-']{1,}$/,
    /** Email address
     * RFC 5322
     * (?i): Case-insensitive matching.
     * (?=.{1,256}): Ensure total length is up to 256 characters.
     * (?=.{1,64}@): Ensure the local part is up to 64 characters.
     * [a-z0-9._%+-]+: Local part of the email address.
     * @[a-z0-9.-]+: Domain part of the email address.
     * \.[a-z]{2,}$: Top-level domain with at least two letters.
     */
    emailAddress: /^(?=.{1,256}$)(?=.{1,64}@)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    /** Password, Password confirmation
     * (?=.*[A-Za-z]): At least one letter.
     * (?=.*\d): At least one digit.
     * (?=.*[@$!%*?&]): At least one special character.
     * [A-Za-z\d@$!%*?&]{8,}$: At least 8 characters long.
     */
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    passwordConfirmation: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const valueSetter = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name as Type_ValuesKey;

    setValues((prevValues) => {
      return { ...prevValues, [key]: { ...prevValues[key], value: e.target.value } };
    });

    validateField(key);
  };

  const validateField = (targetName: Type_ValuesKey): void => {
    setValues((prevValues) => {
      const isValueValid: boolean = regex[targetName].test(prevValues[targetName].value);
      const isMatchingPassword: boolean = prevValues['passwordConfirmation'].value === prevValues['password'].value;
      const propArg: boolean = targetName === 'passwordConfirmation' ? isMatchingPassword : isValueValid;
      return { ...prevValues, [targetName]: { ...prevValues[targetName], valid: propArg } };
    });
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    if (!Object.values(values).some((field) => field.valid === false)) {
      e.preventDefault();
    } else {
      await createUserWithEmailAndPassword(firebaseAuth, values.emailAddress.value, values.password.value);
    }
  };

  const handleLabels = (): void => {
    if (!ulRef.current) return;
    const ulChildren = Array.from(ulRef.current.children) as HTMLLIElement[];

    Object.entries(values).forEach(([name, { value }]) => {
      const element = ulChildren.find((child) => ((child.children[0] as HTMLDivElement).children[0] as HTMLLabelElement).id === name);

      if (value.length > 0) {
        if (element) ((element.children[0] as HTMLDivElement).children[0] as HTMLLabelElement).setAttribute('data-entry', 'true');
      } else {
        if (element) ((element.children[0] as HTMLDivElement).children[0] as HTMLLabelElement).setAttribute('data-entry', 'false');
      }
    });
  };

  useEffect(() => handleLabels(), [values]);

  return (
    <form
      className='fdAccountRegistry'
      id='fdRegistery'
      onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e)}
      data-activity='active'
      ref={registryRefReceiver}>
      <div className='fdAccountRegistry__container'>
        <fieldset className='fdAccountRegistry__container__fieldset'>
          <section className='fdAccountRegistry__container__col'>
            <div className='fdAccountRegistry__container__col__logo'>Film Database</div>
            <legend className='fdAccountRegistry__container__fieldset__legend'>
              <h2 className='fdAccountRegistry__container__fieldset__legend--h2'>Create an account</h2>
            </legend>
            <div className='fdAccountRegistry__container__col__hint'>Enter your name</div>
          </section>
          <ul className='fdAccountRegistry__container__fieldset__ul' ref={ulRef}>
            <li className='fdAccountRegistry__container__fieldset__ul__firstName'>
              <div className='fdAccountRegistry__container__field__ul__firstName__container'>
                <label id='firstName' htmlFor='fdUserAccountFirstName'>
                  First name
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountFirstName'
                  name='firstName'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.firstName.valid}
                  autoFocus
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__lastName'>
              <div className='fdAccountRegistry__container__field__ul__lastName__container'>
                <label id='lastName' htmlFor='fdUserAccountLastName'>
                  Last name (optional)
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountLastName'
                  name='lastName'
                  type='text'
                  inputMode='text'
                  size={12}
                  required={false}
                  aria-required='true'
                  aria-invalid={values.lastName.valid}
                  autoCapitalize='words'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__emailAddress'>
              <div className='fdAccountRegistry__container__field__ul__emailAddress__container'>
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
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__password'>
              <div className='fdAccountRegistry__container__field__ul__password__container'>
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
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__passwordConfirmation'>
              <div className='fdAccountRegistry__container__field__ul__passwordConfirmation__container'>
                <label id='passwordConfirmation' htmlFor='fdUserAccountPasswordConfirmation'>
                  Retype password
                </label>
                <input
                  form='fdRegistery'
                  id='fdUserAccountPasswordConfirmation'
                  name='passwordConfirmation'
                  type='password'
                  inputMode='text'
                  // RFC 5310, NIST Special Publication 800-63B
                  minLength={8}
                  // RFC XOS
                  maxLength={32}
                  size={12}
                  required={true}
                  aria-required='true'
                  aria-invalid={values.passwordConfirmation.valid}
                  autoCapitalize='off'
                  onClick={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
              </div>
            </li>

            <li className='fdAccountRegistry__container__fieldset__ul__container__submitRegistrationForm'>
              <input id='fdUserAccountSubmitForm' type='submit' aria-label='Submit registration form' value='Submit' />
            </li>
          </ul>
        </fieldset>
      </div>
    </form>
  );
});

export default FDAccountRegistry;
