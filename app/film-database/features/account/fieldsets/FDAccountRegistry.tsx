import { forwardRef, useState } from 'react';
import type { ChangeEvent, FC, ReactNode } from 'react';
import { z } from 'zod';
import { authorizeUser } from '~/base/auth/hooks/authorizeUser';
import { createUser } from '~/base/auth/hooks/createUser';
import { zodSchema } from '~/base/schema/zodSchema';

type Type_PropDrill = {
  ModalParent: FC<{ children: ReactNode }>;
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const schema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  // dateOfBirth: zodSchema.user.shape.dateOfBirth,
  emailAddress: zodSchema.contact.shape.emailAddress,
  password: zodSchema.account.shape.password,
});

const FDAccountRegistry = forwardRef<HTMLUListElement, Type_PropDrill>(({ ModalParent, setModal }, registryRefReceiver) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    // dobMonth: 'January',
    // dobDay: '01',
    // dobYear: `${new Date().getFullYear() - 18}`,
    emailAddress: '',
    password: '',
  });

  const parse = schema.safeParse(values);

  const valueSetter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const key = e.target.name as keyof typeof values;
    const value: string = e.target.value;

    setValues((prevValues) => {
      return { ...prevValues, [key]: value };
    });
  };

  const submitForm = async (e: React.PointerEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    try {
      if (parse.success) {
        createUser(values.emailAddress, values.password);
      } else {
        const errorMessage = parse.error.errors.map((err) => `${err.path.join('.')} - ${err.message}`).join(', ');
        throw new Error(`One or more form fields are not valid: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const getOptionalYears = (): number[] => {
  //   const currentYear: number = new Date().getFullYear();
  //   const initYear: number = currentYear - 110;
  //   const ofAgeYear: number = currentYear - 18;
  //   const optionalYears: number[] = Array.from({ length: 111 }, (_, index: number) => initYear + index);
  //   const filteredYears: number[] = optionalYears.filter((year: number) => year <= ofAgeYear).reverse();
  //   return filteredYears;
  // };

  return (
    <ModalParent>
      <ul className='fdAccountModal__modals__form__fieldset__ul' ref={registryRefReceiver} data-visible='false'>
        <div className='fdAccountModal__modals__form__fieldset__ul__name'>
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
                aria-invalid={schema.safeParse(values.firstName).success}
                autoCapitalize='words'
                placeholder={field.placeholder}
                onPointerUp={() => focus()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
              />
            </li>
          ))}
        </div>
        {/* <div className='fdAccountModal__modals__form__fieldset__ul__dob'>
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
            aria-invalid={schema.safeParse(values.dobMonth).success}
            value={values.dobMonth}
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
            aria-invalid={schema.safeParse(values.dobDay).success}
            value={values.dobDay}
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
            aria-invalid={schema.safeParse(values.dobYear).success}
            value={values.dobYear}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => valueSetter(e)}>
            {getOptionalYears().map((year: number) => (
              <option key={`dobYear${year}`} value={year} aria-label={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </li>
      </div> */}
        <li className='fdAccountModal__modals__form__fieldset__ul__emailAddress'>
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
            aria-invalid={schema.safeParse(values.emailAddress).success}
            autoCapitalize='off'
            placeholder='johndoe@gmail.com'
            onPointerUp={() => focus()}
            onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
          />
        </li>
        <div className='fdAccountModal__modals__form__fieldset__ul__password'>
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
              aria-invalid={schema.safeParse(values.password).success}
              autoCapitalize='off'
              placeholder='••••••••'
              onPointerUp={() => focus()}
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
              aria-invalid={schema.safeParse(values.password).success}
              autoCapitalize='off'
              placeholder='••••••••'
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
          </li>
        </div>
        <li className='fdAccountModal__modals__form__fieldset__ul__cta'>
          <button id='fdUserAccountSubmitForm' aria-label='Submit registration form' onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => submitForm(e)}>
            Complete sign up
          </button>
          <button
            aria-label='Sign in with Google'
            onPointerUp={(e) => {
              e.preventDefault();
              authorizeUser().google();
            }}>
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
        <li className='fdAccountModal__modals__form__fieldset__ul__signup'>
          <button aria-label='Sign in' onPointerUp={() => setModal('signin')}>
            Already a member? Sign in.
          </button>
        </li>
      </ul>
    </ModalParent>
  );
});

export default FDAccountRegistry;
