import { forwardRef, useState } from 'react';
import type { ChangeEvent, FC, JSX, ReactNode } from 'react';
import { z } from 'zod';
import { createUser } from '~/base/firebase/authentication/hooks/createUser';

import { zodSchema } from '~/base/validation/schema/zodSchema';

type Type_PropDrill = {
  ModalParent: FC<{ children: ReactNode }>;
  LoginWithGroup: () => JSX.Element;
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const schema = z.object({
  firstName: zodSchema.user.shape.firstName,
  lastName: zodSchema.user.shape.lastName,
  emailAddress: zodSchema.contact.shape.emailAddress,
  password: zodSchema.account.shape.password,
});

const FDAccountRegistry = forwardRef<HTMLUListElement, Type_PropDrill>(({ ModalParent, LoginWithGroup, setModal }, registryRefReceiver) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
  });

  const [showErrors, setShowErrors] = useState(false); // State to manage error visibility

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
    setShowErrors(true); // Show errors when form is submitted

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
                  aria-invalid={showErrors && !parse.success} // Only show invalid state after submission
                  autoCapitalize='words'
                  placeholder={field.placeholder}
                  onPointerUp={() => focus()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
                />
                {showErrors && parse.error?.errors.some((err) => err.path.includes(field.name)) && (
                  <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes(field.name))[0].message}</span>
                )}
              </li>
            ))}
          </div>
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
              minLength={3}
              maxLength={76}
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={showErrors && !parse.success}
              autoCapitalize='off'
              placeholder='johndoe@gmail.com'
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
            {showErrors && parse.error?.errors.some((err) => err.path.includes('emailAddress')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('emailAddress'))[0].message}</span>
            )}
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
              minLength={8}
              maxLength={32}
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={showErrors && !parse.success}
              autoCapitalize='off'
              placeholder='••••••••'
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
            {showErrors && parse.error?.errors.some((err) => err.path.includes('password')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('password'))[0].message}</span>
            )}
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
              minLength={8}
              maxLength={32}
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={showErrors && !parse.success}
              autoCapitalize='off'
              placeholder='••••••••'
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
            {showErrors && parse.error?.errors.some((err) => err.path.includes('passwordConfirmation')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('passwordConfirmation'))[0].message}</span>
            )}
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
