import { forwardRef, useState } from 'react';
import type { ChangeEvent, FC, JSX, ReactNode } from 'react';
import { z } from 'zod';
import { authorizeUser } from '~/base/auth/hooks/authorizeUser';
import { createUser } from '~/base/auth/hooks/createUser';
import { zodSchema } from '~/base/schema/zodSchema';

type Type_PropDrill = {
  ModalParent: FC<{ children: ReactNode }>;
  LoginWithGroup: () => JSX.Element;
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const schema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  // dateOfBirth: zodSchema.user.shape.dateOfBirth,
  emailAddress: zodSchema.contact.shape.emailAddress,
  password: zodSchema.account.shape.password,
});

const FDAccountRegistry = forwardRef<HTMLUListElement, Type_PropDrill>(({ ModalParent, LoginWithGroup, setModal }, registryRefReceiver) => {
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
    <>
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
          <li className='fdAccountModal__modals__form__fieldset__ul__li'>
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
          <li className='fdAccountModal__modals__form__fieldset__ul__li'>
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
          <li className='fdAccountModal__modals__form__fieldset__ul__li'>
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
        </ul>
      </ModalParent>
      <div className='fdAccountModal__modals__btns'>
        <button id='fdUserAccountSubmitForm' aria-label='Submit registration form' onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => submitForm(e)}>
          Complete registration
        </button>
        <button aria-label='Sign in' onPointerUp={() => setModal('signin')}>
          Sign into an existing account
        </button>
        <LoginWithGroup />
      </div>
    </>
  );
});

export default FDAccountRegistry;
