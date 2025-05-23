import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import type { ChangeEvent, HTMLAttributes, RefObject } from 'react';
import { z } from 'zod';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { zodSchema } from '~/base/validation/schema/zodSchema';
import { useFormValues } from '~/film-database/hooks/useFormValues';
import FDGitHubBtn from '../buttons/FDGitHubBtn';
import FDGoogleBtn from '../buttons/FDGoogleBtn';

const FDAccountRegistry = ({ toggleSectionVisibility }: { toggleSectionVisibility: (ref: RefObject<HTMLFieldSetElement | null>) => void }) => {
  /** @reference */
  const registryRef = useRef<HTMLFieldSetElement>(null);

  /** @state Input values store */
  const { values, handleValues } = useFormValues({ firstName: '', lastName: '', emailAddress: '', password: '' });

  /** @schema ZOD */
  const schema = z.object({
    firstName: zodSchema.user.shape.firstName,
    lastName: zodSchema.user.shape.lastName,
    emailAddress: zodSchema.contact.shape.emailAddress,
    password: zodSchema.account.shape.password,
  });
  const parse = schema.safeParse(values);

  const submitForm = async (e: React.PointerEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    try {
      if (parse.success) {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);

        if (userCredential && userCredential.user) {
          await signInWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);
          setTimeout(() => window.location.reload(), 0);
        } else {
          throw new Error('Failed to create user account.');
        }
      } else {
        const errorMessage = parse.error.errors.map((err) => `${err.path.join('.')} - ${err.message}`).join(', ');
        throw new Error(`One or more form fields are not valid: ${errorMessage}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <fieldset className='fdAccount__container__wrapper__form__fieldset' ref={registryRef} data-visible='true'>
      <div>
        <legend>Get Started Now</legend>
        <p>Welcome to Film Database, create an account to start your experience.</p>
      </div>
      <div>
        <FDGitHubBtn />
        <FDGoogleBtn />
      </div>
      <ul className='fdAccount__container__wrapper__form__fieldset__ul' data-registry>
        {[
          {
            labelId: 'firstName',
            id: 'fdUserAccountFirstName',
            name: 'firstName',
            label: 'First name',
            type: 'text',
            inputMode: 'text',
            required: true,
            placeholder: 'John',
          },
          {
            labelId: 'lastName',
            id: 'fdUserAccountLastName',
            name: 'lastName',
            label: 'Last name',
            type: 'text',
            inputMode: 'text',
            required: false,
            placeholder: 'Doe',
          },
          {
            labelId: 'emailAddress',
            id: 'fdUserAccountEmailAddress',
            name: 'emailAddress',
            label: 'Email address',
            type: 'email',
            inputMode: 'email',
            required: true,
            placeholder: 'johndoe@gmail.com',
            minLength: 3,
            maxLength: 76,
          },
          {
            labelId: 'password',
            id: 'fdUserAccountPassword',
            name: 'password',
            label: 'Password',
            type: 'password',
            inputMode: 'text',
            required: true,
            placeholder: '••••••••',
            minLength: 8,
            maxLength: 32,
          },
          {
            labelId: 'passwordConfirmation',
            id: 'fdUserAccountPasswordConfirmation',
            name: 'passwordConfirmation',
            label: 'Retype password',
            type: 'password',
            inputMode: 'text',
            required: true,
            placeholder: '••••••••',
            minLength: 8,
            maxLength: 32,
          },
        ].map((field) => (
          <li key={field.id} className='fdAccount__container__wrapper__form__fieldset__ul__li'>
            <label id={field.labelId} htmlFor={field.id}>
              {field.label}
            </label>
            <input
              form='fdRegistery'
              id={field.id}
              name={field.name}
              type={field.type}
              inputMode={field.inputMode as HTMLAttributes<HTMLInputElement>['inputMode']}
              size={12}
              required={field.required}
              aria-required={field.required ? 'true' : 'false'}
              aria-invalid={parse.success}
              autoCapitalize={field.type === 'text' ? 'words' : 'off'}
              placeholder={field.placeholder}
              minLength={field.minLength}
              maxLength={field.maxLength}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleValues(e)}
            />
            {parse.error?.errors.some((err) => err.path.includes(field.name)) && (
              <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                {parse.error.errors.find((err) => err.path.includes(field.name))?.message}
              </div>
            )}
          </li>
        ))}
        <li className='fdAccount__container__wrapper__form__fieldset__ul__li'>
          <input type='checkbox' name='agree' id='agree' />
          <label htmlFor='agree'>
            <span>I have read and agree to the</span>&nbsp;
            <button aria-label='Read terms and conditions'>terms and conditions</button>
          </label>
        </li>
      </ul>
      <div>
        <button id='fdUserAccountSubmitForm' aria-label='Submit registration form' onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => submitForm(e)}>
          Complete Registration
        </button>
        <button aria-label='Sign into an existing account' onPointerUp={() => toggleSectionVisibility(registryRef)}>
          Sign into an existing account
        </button>
      </div>
    </fieldset>
  );
};

export default FDAccountRegistry;
