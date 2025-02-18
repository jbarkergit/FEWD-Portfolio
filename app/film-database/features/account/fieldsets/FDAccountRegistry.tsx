import { forwardRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '~/base/config/firebaseConfig';
import { authorizeUser } from '~/base/auth/hooks/authorizeUser';

type Type_PropDrill = {
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry'>>;
};

const FDAccountRegistry = forwardRef<HTMLUListElement, Type_PropDrill>(({ setModal }, registryRefReceiver) => {
  const [values, setValues] = useState({
    firstName: { value: '', valid: false },
    lastName: { value: '', valid: false },
    dobMonth: { value: 'January', valid: false },
    dobDay: { value: '01', valid: false },
    dobYear: { value: `${new Date().getFullYear() - 18}`, valid: false },
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

  const valueSetter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const key = e.target.name as Type_ValuesKey;
    const value: string = e.target.value;

    setValues((prevValues) => {
      return { ...prevValues, [key]: { ...prevValues[key], value: value } };
    });

    validateField(key);
  };

  const validateField = (targetName: Type_ValuesKey): void => {
    const pattern: [string, RegExp] | undefined = Object.entries(regex).find(([name]) => name === targetName);
    if (pattern) {
      setValues((prevValues) => {
        const isValueValid: boolean = pattern[1].test(prevValues[targetName].value);
        const isMatchingPassword: boolean = prevValues['passwordConfirmation'].value === prevValues['password'].value;
        const propArg: boolean = targetName === 'passwordConfirmation' ? isMatchingPassword : isValueValid;
        return { ...prevValues, [targetName]: { ...prevValues[targetName], valid: propArg } };
      });
    }
  };

  const submitForm = async (e: React.PointerEvent<HTMLButtonElement>): Promise<void> => {
    if (Object.values(values).some((field) => field.valid === false)) {
      e.preventDefault();
    } else {
      try {
        await createUserWithEmailAndPassword(firebaseAuth, values.emailAddress.value, values.password.value);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getOptionalYears = (): number[] => {
    const currentYear: number = new Date().getFullYear();
    const initYear: number = currentYear - 110;
    const ofAgeYear: number = currentYear - 18;
    const optionalYears: number[] = Array.from({ length: 111 }, (_, index: number) => initYear + index);
    const filteredYears: number[] = optionalYears.filter((year: number) => year <= ofAgeYear).reverse();
    return filteredYears;
  };

  return (
    <ul className='fdAccountModal__form__fieldset__ul' ref={registryRefReceiver} data-visible='false'>
      <div className='fdAccountModal__form__fieldset__ul__name'>
        {[
          { labelId: 'firstName', id: 'fdUserAccountFirstName', name: 'firstName', label: 'First name', isRequired: true, placeholder: 'John' },
          { labelId: 'lastName', id: 'fdUserAccountLastName', name: 'lastName', label: 'Last name', isRequired: false, placeholder: 'Doe' },
        ].map((field) => (
          <li key={field.id}>
            <label id={field.labelId} htmlFor={field.id}>
              {field.label}
            </label>
            <input
              form='fdRegistery'
              id={field.id}
              name={field.name}
              type='text'
              inputMode='text'
              size={12}
              required={field.isRequired}
              aria-required={field.isRequired ? 'true' : 'false'}
              aria-invalid={values.firstName.valid}
              autoCapitalize='words'
              placeholder={field.placeholder}
              onClick={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
        ))}
      </div>
      <div className='fdAccountModal__form__fieldset__ul__dob'>
        <li>
          <label id='dobMonth' htmlFor='fdUserAccountDobMonth'>
            Month
          </label>
          <select
            id='fdUserAccountDobMonth'
            name='dobMonth'
            form='fdRegistery'
            required={true}
            aria-required='true'
            aria-invalid={values.dobMonth.valid}
            value={values.dobMonth.value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month: string) => (
              <option key={`dobMonth${month}`} value={month} aria-label={month}>
                {month}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label id='dobDay' htmlFor='fdUserAccountDobDay'>
            Day
          </label>
          <select
            id='fdUserAccountDobDay'
            name='dobDay'
            form='fdRegistery'
            required={true}
            aria-required='true'
            aria-invalid={values.dobDay.valid}
            value={values.dobDay.value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {Array.from({ length: 31 }).map((_, index: number) => (
              <option key={`dobDay${index + 1}`} value={`${index + 1}`} aria-label={`${index + 1}`}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label id='dobYear' htmlFor='fdUserAccountDobYear'>
            Year
          </label>
          <select
            id='fdUserAccountDobYear'
            name='dobYear'
            form='fdRegistery'
            required={true}
            aria-required='true'
            aria-invalid={values.dobYear.valid}
            value={values.dobYear.value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {getOptionalYears().map((year: number) => (
              <option key={`dobYear${year}`} value={year} aria-label={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </li>
      </div>
      <li className='fdAccountModal__form__fieldset__ul__emailAddress'>
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
          placeholder='johndoe@gmail.com'
          onClick={() => focus()}
          onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
        />
      </li>
      <div className='fdAccountModal__form__fieldset__ul__password'>
        <li>
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
            placeholder='••••••••'
            onClick={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
          />
        </li>
        <li>
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
            placeholder='••••••••'
            onClick={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
          />
        </li>
      </div>
      <li className='fdAccountModal__form__fieldset__ul__cta'>
        <button id='fdUserAccountSubmitForm' aria-label='Submit registration form' onClick={(e: React.PointerEvent<HTMLButtonElement>) => submitForm(e)}>
          Complete sign up
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
        <button aria-label='Sign in' onClick={() => setModal('signin')}>
          Already a member? Sign in.
        </button>
      </li>
    </ul>
  );
});

export default FDAccountRegistry;
