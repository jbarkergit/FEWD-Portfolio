import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type HTMLAttributes } from 'react';
import { loginSchema, registrationSchema } from '~/base/validation/zodSchema';
import { createFirestoreUser } from '~/base/firebase/firestore/utility/createFirestoreUser';
import { useFirestoreLogin } from '~/base/firebase/firestore/utility/useFirestoreLogin';
import { handleAuthProvider } from '~/base/firebase/authentication/utility/handleAuthProvider';
import { TablerBrandGithubFilled, DeviconGoogle } from '~/film-database/assets/svg/icons';
import FDAccountModalPoster from '~/film-database/features/account/auth-modal/FDAccountModalPoster';
import type { ZodIssue } from 'zod';

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

  const getError = (name: string) =>
    errors.find((err) => typeof err.path[0] === 'string' && err.path[0] === name)?.message;

  /** On form submission, parse form data, handle errors, invoke corresponding active form's Firestore utility */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    const result = schemas[activeForm].safeParse(formObject);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        if (typeof issue.path[0] === 'string') {
          fieldErrors[issue.path[0]] = issue.message;
        }
      }

      setErrors(result.error.errors);
      submittingRef.current = false;
      return;
    }

    try {
      if (activeForm === 'registration') await createFirestoreUser(result);
      else await useFirestoreLogin(result);
    } catch (error) {
      console.error('Submission error:', error);
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
            onSubmit={handleSubmit}>
            <fieldset
              className='fdAccount__container__wrapper__form__fieldset'
              ref={fieldsetRef}
              data-animate='mount'
              aria-labelledby='legend-id'>
              <div id='legend-id'>
                <legend>{activeForm === 'registration' ? `Get Started Now` : `Start a new session`}</legend>
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
                      {getError(name) && (
                        <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                          {getError(name)}
                        </div>
                      )}
                    </li>
                  )
                )}
                {activeForm === 'registration' && (
                  <li className='fdAccount__container__wrapper__form__fieldset__ul__li'>
                    <input
                      type='checkbox'
                      name='agree'
                      id='agree'
                    />
                    <label htmlFor='agree'>
                      <span>I have read and agree to the</span>&nbsp;
                      <button aria-label='Read terms and conditions'>terms and conditions</button>
                    </label>
                  </li>
                )}
              </ul>
            </fieldset>
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
          </form>
        </main>
        <FDAccountModalPoster />
      </div>
    </div>
  );
});

export default FDAccountModal;
