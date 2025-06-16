import { type ChangeEvent, type HTMLAttributes, type RefObject, useRef, type PointerEvent, useState } from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { z } from 'zod';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { zodSchema } from '~/base/validation/schema/zodSchema';
import { useFormValues } from '~/film-database/hooks/useFormValues';
import FDGitHubBtn from '../buttons/FDGitHubBtn';
import FDGoogleBtn from '../buttons/FDGoogleBtn';

const FDAccountSignIn = ({ toggleSectionVisibility }: { toggleSectionVisibility: (ref: RefObject<HTMLFieldSetElement | null>) => void }) => {
  /** @reference */
  const signInRef = useRef<HTMLFieldSetElement>(null);

  /** @state Input values store */
  const { values, handleValues } = useFormValues({ emailAddress: '', password: '' });

  /** @state Form submission tracker */
  const [submit, setSubmit] = useState<boolean>(false);

  /** @schema ZOD */
  const schema = z.object({ emailAddress: zodSchema.contact.shape.emailAddress, password: zodSchema.account.shape.password });
  const parse = schema.safeParse(values);

  /**
   * @function handleSubmit
   * @description Handles form submission
   * @param e: Pointer Event
   */
  const handleSubmit = async (e: PointerEvent): Promise<void> => {
    e.preventDefault();
    setSubmit(true);

    if (parse.success) {
      await signInWithEmailAndPassword(firebaseAuth, values.emailAddress, values.password);
      window.location.reload();
    } else {
      const errorMessages: Record<string, string> = {};

      for (const error of parse.error.errors) {
        if (error.path[0]) {
          errorMessages[error.path[0]] = error.message;
        }
      }
    }
  };

  return (
    <fieldset className='fdAccount__container__wrapper__form__fieldset' data-visible='false' ref={signInRef}>
      <div>
        <legend>Get Started Now</legend>
        <p>Welcome back to Film Database, let's get you signed in.</p>
      </div>
      <div>
        <FDGitHubBtn />
        <FDGoogleBtn />
      </div>
      <ul className='fdAccount__container__wrapper__form__fieldset__ul' data-visible='true' data-signin>
        {[
          {
            labelId: 'Email address',
            id: 'fdUserAccountSignInEmailAddress',
            name: 'emailAddress',
            type: 'email',
            inputMode: 'email',
            minLength: 3,
            maxLength: 76,
            placeholder: 'johndoe@gmail.com',
          },
          {
            labelId: 'Password',
            id: 'fdUserAccountSignInPassword',
            name: 'password',
            type: 'password',
            inputMode: 'text',
            minLength: 8,
            maxLength: 32,
            placeholder: '••••••••',
          },
        ].map((field, index) => (
          <li key={field.id} className='fdAccount__container__wrapper__form__fieldset__ul__li'>
            <label id={field.id} htmlFor={field.id}>
              {field.labelId}
            </label>
            <input
              form='fdRegistery'
              id={field.id}
              name={field.name}
              type={field.type}
              inputMode={field.inputMode as HTMLAttributes<HTMLInputElement>['inputMode']}
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={parse.success}
              autoCapitalize={field.type === 'text' ? 'words' : 'off'}
              placeholder={field.placeholder}
              minLength={field.minLength}
              maxLength={field.maxLength}
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleValues(e)}
            />
            {index === 1 && (
              <button
                aria-label='Reset your password'
                onPointerUp={() => (schema.safeParse(values).success ? sendPasswordResetEmail(firebaseAuth, values.emailAddress) : null)}>
                I forgot my password.
              </button>
            )}
            {submit && parse.error?.errors.some((err) => err.path.includes(field.name)) && (values[field.name as keyof typeof values] as string).length > 0 ? (
              <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                {parse.error.errors.find((err) => err.path.includes(field.name))?.message}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <div>
        <button type='button' aria-label='Sign in with your credentials' onPointerUp={handleSubmit}>
          Sign in
        </button>
        <div>
          <button type='button' aria-label='Create a new account' onPointerUp={() => toggleSectionVisibility(signInRef)}>
            Create a new account
          </button>
        </div>
      </div>
    </fieldset>
  );
};

export default FDAccountSignIn;
