import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { loginSchema, registrationSchema } from '~/base/validation/zodSchema';
import { TablerBrandGithubFilled, DeviconGoogle } from '~/film-database/assets/svg/icons';
import FDAccountModalPoster from '~/film-database/features/account/auth-modal/FDAccountModalPoster';
import { type ZodIssue } from 'zod';
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { normalizeFirebaseAuthError } from '~/base/firebase/firestore/helpers/normalizeFirebaseAuthError';
import { GithubAuthProvider } from 'firebase/auth/web-extension';

const registration = [
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
];

const login = [
  {
    labelId: 'Email address',
    id: 'fdUserAccountSignInEmailAddress',
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
    labelId: 'Password',
    id: 'fdUserAccountSignInPassword',
    name: 'password',
    label: 'Password',
    type: 'password',
    inputMode: 'text',
    required: true,
    placeholder: '••••••••',
    minLength: 8,
    maxLength: 32,
  },
];

const fieldStore = {
  registration: registration,
  login: login,
} as const;

const schemas = {
  registration: registrationSchema,
  login: loginSchema,
} as const;

const providerMap = {
  github: GithubAuthProvider,
  google: GoogleAuthProvider,
} as const;

const FDAccountModal = forwardRef<HTMLDivElement, {}>(({}, accountRef) => {
  const [activeForm, setActiveForm] = useState<'registration' | 'login'>('registration');
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const submittingRef = useRef<boolean>(false);
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  /** Retrieves field errors for JSX */
  const getFieldError = (name: string) => errors.find((err) => err.path[0] === name)?.message;

  /** Create FormData, validate with zod, return result */
  const getParsedForm = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries()) as Record<string, any>;
    formObject.tos = formData.has('tos');
    const result = schemas[activeForm].safeParse(formObject);
    return result;
  };

  /** Firebase auth error helper */
  const handleError = (error: unknown) => {
    const firebaseError = normalizeFirebaseAuthError(error);
    console.error(firebaseError);
    setErrors((p) => [
      ...p,
      { code: 'firebase' as any, path: ['__global'], message: firebaseError.message, source: 'firebase' },
    ]);
  };

  /** On form submission, parse form data, handle errors, invoke corresponding active form's Firestore utility */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    const result = getParsedForm(e);

    if (!result.success) {
      setErrors(result.error.issues.filter((issue) => typeof issue.path[0] === 'string'));
    } else {
      setErrors([]);

      try {
        const { emailAddress, password } = result.data;

        if (activeForm === 'registration') {
          await createUserWithEmailAndPassword(firebaseAuth, emailAddress, password);
          await signInWithEmailAndPassword(firebaseAuth, emailAddress, password);
        } else {
          await signInWithEmailAndPassword(firebaseAuth, emailAddress, password);
        }

        e.currentTarget.reset();
      } catch (error) {
        handleError(error);
      }
    }

    submittingRef.current = false;
    return;
  };

  const handleAuthProviderLogin = async (provider: keyof typeof providerMap) => {
    const ProviderClass = providerMap[provider];
    const authProvider = new ProviderClass();

    try {
      await signInWithPopup(firebaseAuth, authProvider);
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  /** Handle user request to reset password */
  const handlePasswordReset = async (emailInputElement: HTMLInputElement) => {
    const emailAddress = emailInputElement.value;

    if (!emailAddress) {
      alert('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(firebaseAuth, emailAddress);
      alert('Check your email for password reset instructions.');
    } catch (error) {
      handleError(error);
    }
  };

  /** Animates fieldsets on form state change */
  const onActiveFormChange = () => {
    fieldsetRef.current?.setAttribute('data-animate', 'unmount');
    setTimeout(() => {
      setActiveForm((f) => (f === 'registration' ? 'login' : 'registration'));
      requestAnimationFrame(() => fieldsetRef.current?.setAttribute('data-animate', 'mount'));
    }, 600);
  };

  return (
    <div
      className='fdAccount'
      data-layout-carousel>
      <div
        className='fdAccount__container'
        ref={accountRef}
        data-visible='false'>
        <main className='fdAccount__container__wrapper'>
          <form
            className='fdAccount__container__wrapper__form'
            onSubmit={handleSubmit}
            noValidate>
            <fieldset
              className='fdAccount__container__wrapper__form__fieldset'
              ref={fieldsetRef}
              data-animate='mount'
              aria-labelledby='legend-id'>
              <div>
                <legend id='legend-id'>
                  {activeForm === 'registration' ? `Get Started Now` : `Start a new session`}
                </legend>
                <p>
                  {activeForm === 'registration'
                    ? `Welcome to Film Database, create an account to start a session.`
                    : `Welcome back to Film Database, let's get you logged in.`}
                </p>
              </div>
              <div>
                <button
                  type='button'
                  aria-label='Log in with Github'
                  onPointerUp={() => handleAuthProviderLogin('github')}>
                  <TablerBrandGithubFilled /> <span>Log in with GitHub</span>
                </button>
                <button
                  type='button'
                  aria-label='Log in with Google'
                  onPointerUp={() => handleAuthProviderLogin('google')}>
                  <DeviconGoogle /> <span>Log in with Google</span>
                </button>
              </div>
              <ul
                className='fdAccount__container__wrapper__form__fieldset__ul'
                data-form={activeForm}>
                {fieldStore[activeForm].map(
                  ({ labelId, id, name, label, type, inputMode, required, placeholder, minLength, maxLength }) => (
                    <li
                      key={id}
                      className='fdAccount__container__wrapper__form__fieldset__ul__li'>
                      <label
                        id={labelId}
                        htmlFor={id}>
                        {label}
                      </label>
                      <input
                        id={id}
                        name={name}
                        type={type}
                        inputMode={inputMode as HTMLAttributes<HTMLInputElement>['inputMode']}
                        size={12}
                        required={required}
                        aria-invalid={!!errors.some((err) => err.path.includes(name))}
                        autoCapitalize={type === 'text' ? 'words' : 'off'}
                        placeholder={placeholder}
                        minLength={minLength}
                        maxLength={maxLength}
                      />
                      {getFieldError(name) && (
                        <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                          {getFieldError(name)}
                        </div>
                      )}
                    </li>
                  )
                )}
                {activeForm === 'registration' && (
                  <li className='fdAccount__container__wrapper__form__fieldset__ul__li'>
                    <input
                      type='checkbox'
                      name='tos'
                      id='tos'
                    />
                    <label htmlFor='tos'>
                      <span>I have read and agree to the</span>&nbsp;
                      <button aria-label='Read terms and conditions'>terms and conditions</button>
                    </label>
                  </li>
                )}

                {errors.length > 0 && (
                  <div
                    key='error-tos'
                    className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                    {errors.find((error) => error.code === ('firebase' as any))?.message}
                  </div>
                )}
              </ul>
              <nav>
                <div>
                  <button
                    type='submit'
                    aria-label={
                      activeForm === 'registration' ? 'Submit registration form' : 'Sign in with your credentials'
                    }>
                    <span>{activeForm === 'registration' ? 'Complete Registration' : 'Log in with credentials'}</span>
                  </button>
                </div>
                <div>
                  <button
                    type='button'
                    aria-label={activeForm === 'registration' ? 'Log into an existing account' : 'Create a new account'}
                    onPointerUp={onActiveFormChange}>
                    {activeForm === 'registration' ? 'Log into an existing account' : 'Create a new account'}
                  </button>
                  {activeForm === 'login' && (
                    <>
                      {'• '}
                      <button
                        type='button'
                        aria-label='Request a password reset'
                        onPointerUp={() => {
                          const emailInput = document.getElementById(
                            'fdUserAccountSignInEmailAddress'
                          ) as HTMLInputElement;
                          handlePasswordReset(emailInput);
                        }}>
                        Reset password
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </fieldset>
          </form>
        </main>
        <FDAccountModalPoster />
      </div>
    </div>
  );
});

export default FDAccountModal;
