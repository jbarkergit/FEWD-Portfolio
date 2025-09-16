import { forwardRef, useEffect, useRef, useState, type ChangeEvent, type HTMLAttributes } from 'react';
import z from 'zod';
import { zodSchema } from '~/base/validation/zodSchema';
import { createFirestoreUser } from '~/base/firebase/firestore/utility/createFirestoreUser';
import { useFirestoreLogin } from '~/base/firebase/firestore/utility/useFirestoreLogin';
import { handleAuthProvider } from '~/base/firebase/authentication/utility/handleAuthProvider';
import { TablerBrandGithubFilled, DeviconGoogle } from '~/film-database/assets/svg/icons';
import FDAccountModalPoster from '~/film-database/features/account/auth-modal/FDAccountModalPoster';

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
  registration: z.object({
    firstName: zodSchema.user.shape.firstName,
    lastName: zodSchema.user.shape.lastName,
    emailAddress: zodSchema.contact.shape.emailAddress,
    password: zodSchema.account.shape.password,
  }),
  login: z.object({
    emailAddress: zodSchema.contact.shape.emailAddress,
    password: zodSchema.account.shape.password,
  }),
};

const useFormValues = <T extends Record<string, string>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleValues = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { values, setValues, handleValues };
};

const FDAccountModal = forwardRef<HTMLDivElement, {}>(({}, accountRef) => {
  const [form, setForm] = useState<'registration' | 'login'>('registration');

  const formValues = {
    registration: useFormValues({
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
    }),
    login: useFormValues({ emailAddress: '', password: '' }),
  };
  const { values, handleValues } = form === 'registration' ? formValues.registration : formValues.login;

  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  const fields = fieldStore[form];

  // Schema, parsing and errors
  const schema = schemas[form];
  const parse = schema.safeParse(values);
  const getFieldError = (name: string) => parse.error?.errors.find((err) => err.path.includes(name))?.message;

  /** Invokes useFirestore hook corresponding to current form */
  const handleSubmit = () => {
    if (!parse.success) return;
    if (form === 'registration') createFirestoreUser(parse, values);
    else useFirestoreLogin(parse, values);
  };

  /** Animates fieldsets on form state change */
  const handleState = () => setForm((f) => (f === 'registration' ? 'login' : 'registration'));

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
  }, [form]);

  return (
    <div
      className='fdAccount'
      data-layout-carousel>
      <div
        className='fdAccount__container'
        ref={accountRef}
        data-visible='false'>
        <main className='fdAccount__container__wrapper'>
          <form className='fdAccount__container__wrapper__form'>
            <fieldset
              className='fdAccount__container__wrapper__form__fieldset'
              ref={fieldsetRef}
              data-animate='mount'>
              <div>
                <legend>{form === 'registration' ? `Get Started Now` : `Start a new session`}</legend>
                <p>
                  {form === 'registration'
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
                data-form={form}>
                {fields.map(
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
                        form='fdRegistery'
                        id={id}
                        name={name}
                        type={type}
                        inputMode={inputMode as HTMLAttributes<HTMLInputElement>['inputMode']}
                        size={12}
                        required={required}
                        aria-required={required ? 'true' : 'false'}
                        aria-invalid={!!parse.error?.errors.some((err) => err.path.includes(name))}
                        autoCapitalize={type === 'text' ? 'words' : 'off'}
                        placeholder={placeholder}
                        minLength={minLength}
                        maxLength={maxLength}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleValues(e)}
                      />
                      {getFieldError(name) && values[name as keyof typeof values]?.length > 0 && (
                        <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>
                          {getFieldError(name)}
                        </div>
                      )}
                    </li>
                  )
                )}
                {form === 'registration' && (
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
              <div>
                <button
                  type='button'
                  aria-label={form === 'registration' ? 'Submit registration form' : 'Sign in with your credentials'}
                  onPointerUp={handleSubmit}>
                  <span>{form === 'registration' ? 'Complete Registration' : 'Log in'}</span>
                </button>
                <button
                  type='button'
                  aria-label={form === 'registration' ? 'Log into an existing account' : 'Create a new account'}
                  onPointerUp={onFormChange}>
                  {form === 'registration' ? 'Log into an existing account' : 'Create a new account'}
                </button>
              </div>
            </fieldset>
          </form>
        </main>
        <FDAccountModalPoster />
      </div>
    </div>
  );
});

export default FDAccountModal;
