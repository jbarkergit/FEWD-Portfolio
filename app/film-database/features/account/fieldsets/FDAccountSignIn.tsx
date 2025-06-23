import { type ChangeEvent, type HTMLAttributes, forwardRef } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { z } from 'zod';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import { zodSchema } from '~/base/validation/schema/zodSchema';
import { useFormValues } from '~/film-database/hooks/useFormValues';
import FDGitHubBtn from '../buttons/FDGitHubBtn';
import FDGoogleBtn from '../buttons/FDGoogleBtn';
import { useFirestore } from '~/base/firebase/firestore/hooks/useFirestore';

type FDAccountSignInProps = {
  toggleSectionVisibility: () => void;
};

const FDAccountSignIn = forwardRef<HTMLFieldSetElement, FDAccountSignInProps>(({ toggleSectionVisibility }, signInRef) => {
  /** @state Input values store */
  const { values, handleValues } = useFormValues({ emailAddress: '', password: '' });

  /** @schema ZOD */
  const schema = z.object({ emailAddress: zodSchema.contact.shape.emailAddress, password: zodSchema.account.shape.password });
  const parse = schema.safeParse(values);

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
            {parse.error?.errors.some((err) => err.path.includes(field.name)) && (values[field.name as keyof typeof values] as string).length > 0 ? (
              <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                {parse.error.errors.find((err) => err.path.includes(field.name))?.message}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <div>
        <button type='button' aria-label='Sign in with your credentials' onPointerUp={() => useFirestore.signIn(parse, values)}>
          Sign in
        </button>
        <button type='button' aria-label='Create a new account' onPointerUp={() => toggleSectionVisibility()}>
          Create a new account
        </button>
      </div>
    </fieldset>
  );
});

export default FDAccountSignIn;
