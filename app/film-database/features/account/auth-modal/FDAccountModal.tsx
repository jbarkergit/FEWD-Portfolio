import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { loginSchema, registrationSchema } from '~/base/validation/zodSchema';
import { createFirestoreUser } from '~/base/firebase/firestore/utility/createFirestoreUser';
import { useFirestoreLogin } from '~/base/firebase/firestore/utility/useFirestoreLogin';
import { handleAuthProvider } from '~/base/firebase/authentication/utility/handleAuthProvider';
import { TablerBrandGithubFilled, DeviconGoogle } from '~/film-database/assets/svg/icons';
import FDAccountModalPoster from '~/film-database/features/account/auth-modal/FDAccountModalPoster';
import { type ZodIssue } from 'zod';
import { FirebaseError } from 'firebase/app';

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
};

const schemas = {
  registration: registrationSchema,
  login: loginSchema,
};

const FDAccountModal = forwardRef<HTMLDivElement, {}>(({}, accountRef) => {
  const [activeForm, setActiveForm] = useState<'registration' | 'login'>('registration');
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const submittingRef = useRef<boolean>(false);
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  useEffect(() => console.log(errors), [errors]);

  const getFieldError = (name: string) => errors.find((err) => err.path[0] === name)?.message;

  /** On form submission, parse form data, handle errors, invoke corresponding active form's Firestore utility */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries()) as Record<string, any>;
    formObject.tos = formData.has('tos');

    const result = schemas[activeForm].safeParse(formObject);

    if (!result.success) {
      setErrors(result.error.issues.filter((issue) => typeof issue.path[0] === 'string'));
    } else {
      setErrors([]);

      try {
        if (activeForm === 'registration') {
          await createFirestoreUser(result.data);
        } else {
          await useFirestoreLogin(result.data);
        }
        e.currentTarget.reset();
      } catch (error) {
        let firebaseErrorMsg = 'An unexpected error occurred. Please try again later.';

        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              firebaseErrorMsg = 'This email is already in use.';
              break;

            case 'auth/invalid-credential':
              firebaseErrorMsg = 'Invalid credentials. Consider a password reset.';
              break;

            case 'auth/too-many-requests':
              firebaseErrorMsg = 'Too many requests. Please try again later.';
              break;

            default:
              firebaseErrorMsg = 'An unexpected error occurred. Please try again later.';
              break;
          }
        }

        setErrors((p) => [
          ...p,
          { code: 'firebase' as any, path: ['__global'], message: firebaseErrorMsg, source: 'firebase' },
        ]);
      }
    }

    submittingRef.current = false;
    return;
  };

  /** Animates fieldsets on form state change */
  const handleState = () => setActiveForm((f) => (f === 'registration' ? 'login' : 'registration'));

  const onFormChange = () => {
    if (!fieldsetRef.current) {
      handleState();
    } else {
      fieldsetRef.current.setAttribute('data-animate', 'unmount');
      setTimeout(() => handleState(), 600);
    }
  };

  // There's no reliable way to ensure the fieldsets elements have mounted, so we're utilizing MutationObserver to handle the 'data-animate' MOUNT
  useEffect(() => {
    const node = fieldsetRef.current;
    if (!node) return;

    const observer = new MutationObserver(() => {
      node.setAttribute('data-animate', 'mount');
      observer.disconnect();
    });

    observer.observe(node, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [activeForm]);

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
                  onPointerUp={() => handleAuthProvider('github')}>
                  <TablerBrandGithubFilled /> <span>Log in with GitHub</span>
                </button>
                <button
                  type='button'
                  aria-label='Log in with Google'
                  onPointerUp={() => handleAuthProvider('google')}>
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
                <button
                  type='submit'
                  aria-label={
                    activeForm === 'registration' ? 'Submit registration form' : 'Sign in with your credentials'
                  }>
                  <span>{activeForm === 'registration' ? 'Complete Registration' : 'Log in'}</span>
                </button>
                <button
                  type='button'
                  aria-label={activeForm === 'registration' ? 'Log into an existing account' : 'Create a new account'}
                  onPointerUp={onFormChange}>
                  {activeForm === 'registration' ? 'Log into an existing account' : 'Create a new account'}
                </button>
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
