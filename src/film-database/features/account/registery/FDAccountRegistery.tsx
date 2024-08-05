import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

const FDAccountRegistery = () => {
  const [values, setValues] = useState<Record<string, string>>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    passwordConfirmation: '',
  });

  const regex: Record<string, RegExp> = {
    /** First name, Last name
     * ^[A-Z]: Starts with an uppercase letter.
     * [a-zA-Z-']{1,}$: Followed by one or more letters, hyphens, or apostrophes.
     * This pattern ensures names start with a capital letter and can include hyphens and apostrophes.
     */
    name: /^[A-Z][a-zA-Z-']{1,}$/,
    /** Email address
     * RFC 5322
     * (?i): Case-insensitive matching.
     * (?=.{1,256}): Ensure total length is up to 256 characters.
     * (?=.{1,64}@): Ensure the local part is up to 64 characters.
     * [a-z0-9._%+-]+: Local part of the email address.
     * @[a-z0-9.-]+: Domain part of the email address.
     * \.[a-z]{2,}$: Top-level domain with at least two letters.
     */
    email: /^(?=.{1,256}$)(?=.{1,64}@)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    /** Password, Password confirmation
     * (?=.*[A-Za-z]): At least one letter.
     * (?=.*\d): At least one digit.
     * (?=.*[@$!%*?&]): At least one special character.
     * [A-Za-z\d@$!%*?&]{8,}$: At least 8 characters long.
     */
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const valueSetter = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateField = (targetName: keyof typeof values): void => {
    const targetValue: string = values[targetName];

    switch (targetName) {
      case 'firstName':
      case 'lastName':
        if (!regex.name.test(targetValue)) setIsFormValid(false);
        break;

      case 'emailAddress':
        if (!regex.email.test(targetValue)) setIsFormValid(false);
        break;

      case 'password':
      case 'passwordConfirmation':
        if (!regex.password.test(targetValue)) setIsFormValid(false);
        break;

      default:
        break;
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): void => {
    [values.firstName, values.lastName].forEach((value) => {
      if (!regex.name.test(value)) {
        setIsFormValid(false);
        console.log(`Invalid ${value}`);
      }
    });

    if (!regex.email.test(values.emailAddress)) {
      setIsFormValid(false);
      console.log('Invalid email address');
    }

    [values.password, values.passwordConfirmation].forEach((value) => {
      if (!regex.password.test(value)) {
        setIsFormValid(false);
        console.log('Invalid password');
      }
    });

    // Invoke submitForm()
    if (isFormValid) (e: FormEvent<HTMLFormElement>) => submitForm(e);
  };

  const shakeForm = (): void => {
    formRef.current?.setAttribute('data-anim', 'invalid');
    setTimeout(() => formRef.current?.removeAttribute('data-anim'), 250);
  };

  const submitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isFormValid) {
      // firebase logic
    } else {
      shakeForm();
    }
  };

  return (
    <form className='fdUserAccount__form' id='fdRegistery' ref={formRef} onSubmit={() => validateForm()}>
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
              placeholder='First name'
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={'false'}
              aria-describedby=''
              autoFocus
              autoCapitalize='true'
              onClick={() => focus()}
              onBlur={(e) => validateField(e.target.name as keyof typeof values)}
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
              placeholder='Last name'
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={'false'}
              aria-describedby=''
              autoFocus
              autoCapitalize='true'
              onClick={() => focus()}
              onBlur={(e) => validateField(e.target.name as keyof typeof values)}
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
              placeholder='Email address'
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={'false'}
              aria-describedby=''
              autoFocus
              autoCapitalize='false'
              onClick={() => focus()}
              onBlur={(e) => validateField(e.target.name as keyof typeof values)}
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
              placeholder='Password'
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={'false'}
              aria-describedby=''
              autoFocus
              autoCapitalize='false'
              onClick={() => focus()}
              onBlur={(e) => validateField(e.target.name as keyof typeof values)}
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
              placeholder='Retype your password'
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={'false'}
              aria-describedby=''
              autoFocus
              autoCapitalize='false'
              onClick={() => focus()}
              onBlur={(e) => validateField(e.target.name as keyof typeof values)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
          <li className='fdUserAccount__form__ul__submitRegistrationForm'>
            <label htmlFor='fdUserAccountSubmitForm'>Submit registration form</label>
            <input id='fdUserAccountSubmitForm' type='submit' aria-label='Submit registration form' value='Submit' />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default FDAccountRegistery;
