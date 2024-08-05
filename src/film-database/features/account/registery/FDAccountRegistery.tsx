import { ChangeEvent, FormEvent, FocusEvent, useState, useEffect } from 'react';

const FDAccountRegistery = () => {
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
  };

  const validateField = (targetName: Type_ValuesKey): void => {
    const regexPattern: RegExp = regex[targetName];

    setValues((prevValues) => {
      return { ...prevValues, [targetName]: { ...prevValues[targetName], valid: !regexPattern.test(values[targetName].value) ? false : true } };
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>): void => {
    if (!Object.values(values).some((field) => field.valid === false)) {
      e.preventDefault();
      // Firebase logic
    }
  };

  return (
    <form className='fdUserAccount__form' id='fdRegistery' onSubmit={(e: FormEvent<HTMLFormElement>) => submitForm(e)}>
      <fieldset className='fdUserAccount__form__fieldset'>
        <legend className='fdUserAccount__form__fieldset__legend'>
          <h2 className='fdUserAccount__form__fieldset__legend--h2'>Create an account</h2>
        </legend>
        <ul className='fdUserAccount__form__ul'>
          <li className='fdUserAccount__form__ul__firstName'>
            <label htmlFor='fdUserAccountFirstName'>First name</label>
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
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => validateField(e.target.name as Type_ValuesKey)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
          <li className='fdUserAccount__form__ul__lastName'>
            <label htmlFor='fdUserAccountLastName'>Last name</label>
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
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => validateField(e.target.name as Type_ValuesKey)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
          <li className='fdUserAccount__form__ul__emailAddress'>
            <label htmlFor='fdUserAccountEmailAddress'>Email address</label>
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
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => validateField(e.target.name as Type_ValuesKey)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
          <li className='fdUserAccount__form__ul__password'>
            <label htmlFor='fdUserAccountPassword'>Password</label>
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
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => validateField(e.target.name as Type_ValuesKey)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
          <li className='fdUserAccount__form__ul__passwordConfirmation'>
            <label htmlFor='fdUserAccountPasswordConfirmation'>Retype your password</label>
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
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => validateField(e.target.name as Type_ValuesKey)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
          <li className='fdUserAccount__form__ul__submitRegistrationForm'>
            <input id='fdUserAccountSubmitForm' type='submit' aria-label='Submit registration form' value='Submit' />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default FDAccountRegistery;
