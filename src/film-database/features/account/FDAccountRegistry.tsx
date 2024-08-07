import { ChangeEvent, Dispatch, FormEvent, forwardRef, SetStateAction, useEffect, useRef, useState } from 'react';

type Type_PropDrill = {
  setModal: Dispatch<SetStateAction<'article' | 'registry' | 'signin'>>;
};

const FDAccountRegistry = forwardRef<HTMLFormElement, Type_PropDrill>(({ setModal }, registryRefReceiver) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const [values, setValues] = useState({
    firstName: { value: '', valid: false },
    lastName: { value: '', valid: false },
    emailAddress: { value: '', valid: false },
    password: { value: '', valid: false },
    passwordConfirmation: { value: '', valid: false },
  });

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
    const regexPattern: RegExp = regex[targetName];

    if (targetName === 'passwordConfirmation') {
      const isMatchingPassword: boolean = values[targetName].value === values['password'].value;
      setValues((prevValues) => {
        return { ...prevValues, [targetName]: { ...prevValues[targetName], valid: isMatchingPassword ? true : false } };
      });
    } else {
      setValues((prevValues) => {
        const isValueValid: boolean = regexPattern.test(values[targetName].value);
        return { ...prevValues, [targetName]: { ...prevValues[targetName], valid: isValueValid ? true : false } };
      });
    }
  };

  const submitForm = (e: FormEvent<HTMLFormElement>): void => {
    if (!Object.values(values).some((field) => field.valid === false)) {
      e.preventDefault();
      // Firebase logic
    }
  };

  useEffect(() => {
    if (!ulRef.current) return;
    const ulChildren = Array.from(ulRef.current.children) as HTMLLIElement[];

    Object.entries(values).forEach(([name, { value }]) => {
      const element = ulChildren.find((child) => (child.children[0] as HTMLLabelElement).id === name);

      if (value.length > 0) {
        if (element) (element.children[0] as HTMLLabelElement).setAttribute('data-entry', 'true');
      } else {
        if (element) (element.children[0] as HTMLLabelElement).setAttribute('data-entry', 'false');
      }
    });
  }, [values]);

  return (
    <form
      className='fdAccountRegistry'
      id='fdRegistery'
      onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e)}
      data-activity='active'
      ref={registryRefReceiver}>
      <div className='fdAccountRegistry__container'>
        <fieldset className='fdAccountRegistry__container__fieldset'>
          <legend className='fdAccountRegistry__container__fieldset__legend'>
            <h2 className='fdAccountRegistry__container__fieldset__legend--h2'>Create an account</h2>
          </legend>
          <ul className='fdAccountRegistry__container__fieldset__ul' ref={ulRef}>
            <li className='fdAccountRegistry__container__fieldset__ul__firstName'>
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
                aria-invalid={values.firstName.valid ? true : false}
                autoFocus
                autoCapitalize='words'
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </li>
            <li className='fdAccountRegistry__container__fieldset__ul__lastName'>
              <label id='lastName' htmlFor='fdUserAccountLastName'>
                Last name
              </label>
              <input
                form='fdRegistery'
                id='fdUserAccountLastName'
                name='lastName'
                type='text'
                inputMode='text'
                size={12}
                required={true}
                aria-required='true'
                aria-invalid={values.lastName.valid ? true : false}
                autoCapitalize='words'
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </li>
            <li className='fdAccountRegistry__container__fieldset__ul__emailAddress'>
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
                aria-invalid={values.emailAddress.valid ? true : false}
                autoCapitalize='off'
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </li>
            <li className='fdAccountRegistry__container__fieldset__ul__password'>
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
                aria-invalid={values.password.valid ? true : false}
                autoCapitalize='off'
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </li>
            <li className='fdAccountRegistry__container__fieldset__ul__passwordConfirmation'>
              <label id='passwordConfirmation' htmlFor='fdUserAccountPasswordConfirmation'>
                Retype your password
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
                aria-invalid={values.passwordConfirmation.valid ? true : false}
                autoCapitalize='off'
                onClick={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </li>
            <li className='fdAccountRegistry__container__fieldset__ul__submitRegistrationForm'>
              <input id='fdUserAccountSubmitForm' type='submit' aria-label='Submit registration form' value='Submit' />
            </li>
          </ul>
        </fieldset>
        <section className='fdAccountRegistry__container__tooltips'>
          <h2 className='fdAccountRegistry__container__tooltips--h2'>Visual Guide for invalid form fields</h2>
          <div className='fdAccountRegistry__container__tooltips__tipper'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <g fill='currentColor'>
                <path d='M10.976 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0m2.995 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2'></path>
                <path
                  fillRule='evenodd'
                  d='M19 21V10a7 7 0 1 0-14 0v11h2.828l1.415-1.414L10.657 21h2.686l1.414-1.414L16.172 21zm-2-11a5 5 0 0 0-10 0v9l2.243-2.243L12 19.515l2.757-2.758L17 19z'
                  clipRule='evenodd'></path>
              </g>
            </svg>
          </div>
          <div className='fdAccountRegistry__container__tooltips__tip'>
            <p className='fdAccountRegistry__container__tooltips__tip--p'>test</p>
          </div>
        </section>
      </div>
    </form>
  );
});

export default FDAccountRegistry;
