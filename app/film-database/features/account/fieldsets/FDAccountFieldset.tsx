import { useEffect, useRef, useState, type ChangeEvent, type DetailedHTMLProps, type HTMLAttributes, type JSX } from 'react';
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

  const isRegistrationForm: boolean = form === 'registration';

  const { values, handleValues } = isRegistrationForm ? formValues.registration : formValues.login;

  const [formHeight, setFormHeight] = useState<number | null>(null);

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
    if (isRegistrationForm) createUser(parse, values);
    else signIn(parse, values);
  };

  /**
   * @function animator
   * @description Handles animations for form transitions
   */
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  const animator = (): void => {
    if (!fieldsetRef.current) return;

    fieldsetRef.current.setAttribute('data-animate', 'unmount');
    setTimeout(() => setForm(isRegistrationForm ? 'login' : 'registration'), 500);
  };

  useEffect(() => {
    if (fieldsetRef.current) fieldsetRef.current.setAttribute('data-animate', 'mount');
  }, [form]);

  /**
   * @function useEffect
   * @description Observes height of the registration fieldset on mount to align the login forms height for visual consistency
   */
  useEffect(() => {
    if (!fieldsetRef.current) return;

    const updateHeight = () => {
      if (isRegistrationForm) setFormHeight(fieldsetRef.current!.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(fieldsetRef.current);

    return () => observer.disconnect();
  }, [isRegistrationForm]);

  /** @map */
  const fields = fieldStore[form];

  /** @JSX */
  return (
    <fieldset
      className='fdAccount__container__wrapper__form__fieldset'
      ref={fieldsetRef}
      data-form={form}
      data-animate='premount'
      style={{ height: formHeight ? formHeight : 0 }}>
      <div>
        <legend>{isRegistrationForm ? `Get Started Now` : `Start a new session`}</legend>
        <p>{isRegistrationForm ? `Welcome to Film Database, create an account to start a session.` : `Welcome back to Film Database, let's get you logged in.`}</p>
      </div>
      <div>
        <FDGitHubBtn />
        <FDGoogleBtn />
      </div>
      <ul className='fdAccount__container__wrapper__form__fieldset__ul'>
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
        <button type='button' aria-label={isRegistrationForm ? 'Log into an existing account' : 'Create a new account'} onPointerUp={animator}>
          {isRegistrationForm ? 'Log into an existing account' : 'Create a new account'}
        </button>
      </div>
    </fieldset>
  );
};

export default FDAccountFieldset;
