import { useState, type ChangeEvent, type HTMLAttributes } from 'react';
import { schemaRegistration, schemaLogin } from '~/base/validation/schema/zodSchema';
import { useFormValues } from '~/film-database/hooks/useFormValues';
import { useFirestore } from '~/base/firebase/firestore/hooks/useFirestore';
import { fieldsets } from '~/base/validation/fieldsets/fieldsets';
import FDGitHubBtn from '../buttons/FDGitHubBtn';
import FDGoogleBtn from '../buttons/FDGoogleBtn';

const fieldStore = {
  registration: fieldsets.registration,
  login: fieldsets.login,
};

const schemas = {
  registration: schemaRegistration,
  login: schemaLogin,
};

const FDAccountFieldset = () => {
  /** @state */
  const [form, setForm] = useState<'registration' | 'login'>('registration');

  const formValues = {
    registration: useFormValues({ firstName: '', lastName: '', emailAddress: '', password: '', passwordConfirmation: '' }),
    login: useFormValues({ emailAddress: '', password: '' }),
  };

  const { values, handleValues } = form === 'registration' ? formValues.registration : formValues.login;

  /** @zod schema and parsing */
  const schema = schemas[form];
  const parse = schema.safeParse(values);

  /**
   * @function getFieldError
   * @description Returns parse error if one is present for @param name
   */
  const getFieldError = (name: string) => parse.error?.errors.find((err) => err.path.includes(name))?.message;

  /**
   * @function handleSubmit
   * @description Invokes @function useFirestore hook corresponding to current form
   */
  const { createUser, signIn } = useFirestore;

  const handleSubmit = () => {
    if (!parse.success) return;
    if (form === 'registration') createUser(parse, values);
    else signIn(parse, values);
  };

  /** @global */
  const isRegistrationForm: boolean = form === 'registration';
  const fields = fieldStore[form];

  /** @JSX */
  return (
    <fieldset
      className='fdAccount__container__wrapper__form__fieldset'
      // ref={registryRef}
      // data-visible='true'
    >
      <div>
        <legend>{isRegistrationForm ? `Get Started Now` : `Start a new session`}</legend>
        <p>{isRegistrationForm ? `Welcome to Film Database, create an account to start a session.` : `Welcome back to Film Database, let's get you logged in.`}</p>
      </div>
      <div>
        <FDGitHubBtn />
        <FDGoogleBtn />
      </div>
      <ul className='fdAccount__container__wrapper__form__fieldset__ul' data-form={form}>
        {fields.map(({ labelId, id, name, label, type, inputMode, required, placeholder, minLength, maxLength }) => (
          <li key={id} className='fdAccount__container__wrapper__form__fieldset__ul__li'>
            <label id={labelId} htmlFor={id}>
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
              <div className='fdAccount__container__wrapper__form__fieldset__ul__li--error'>{getFieldError(name)}</div>
            )}
          </li>
        ))}
        {isRegistrationForm && (
          <li className='fdAccount__container__wrapper__form__fieldset__ul__li'>
            <input type='checkbox' name='agree' id='agree' />
            <label htmlFor='agree'>
              <span>I have read and agree to the</span>&nbsp;
              <button aria-label='Read terms and conditions'>terms and conditions</button>
            </label>
          </li>
        )}
      </ul>
      <div>
        <button type='button' aria-label={isRegistrationForm ? 'Submit registration form' : 'Sign in with your credentials'} onPointerUp={handleSubmit}>
          {isRegistrationForm ? 'Complete Registration' : 'Log in'}
        </button>
        <button
          type='button'
          aria-label={isRegistrationForm ? 'Sign into an existing account' : 'Create a new account'}
          onPointerUp={() => setForm(isRegistrationForm ? 'login' : 'registration')}>
          {isRegistrationForm ? 'Sign into an existing account' : 'Create a new account'}
        </button>
      </div>
    </fieldset>
  );
};

export default FDAccountFieldset;
