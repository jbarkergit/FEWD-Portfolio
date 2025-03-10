import { forwardRef, useState } from 'react';
import type { ChangeEvent, FC, JSX, ReactNode } from 'react';
import { z } from 'zod';
import { useAuthorizeUser } from '~/base/firebase/authentication/hooks/useAuthorizeUser';
import { useResetUserPassword } from '~/base/firebase/authentication/hooks/useResetUserPassword';
import { zodSchema } from '~/base/validation/schema/zodSchema';

type Type_PropDrill = {
  ModalParent: FC<{ children: ReactNode }>;
  LoginWithGroup: () => JSX.Element;
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const schema = z.object({ emailAddress: zodSchema.contact.shape.emailAddress, password: zodSchema.account.shape.password });

const FDAccountSignIn = forwardRef<HTMLUListElement, Type_PropDrill>(({ ModalParent, LoginWithGroup, setModal }, signInRefReceiver) => {
  const [values, setValues] = useState({
    emailAddress: '',
    password: '',
  });

  const [submitted, setSubmitted] = useState(false); // Track whether the form has been submitted

  const parse = schema.safeParse(values);

  const valueSetter = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name as keyof typeof values;

    setValues((prevValues) => {
      return { ...prevValues, [key]: e.target.value };
    });
  };

  const handleSubmit = (e: React.PointerEvent) => {
    e.preventDefault();
    setSubmitted(true); // Mark the form as submitted
    if (schema.safeParse(values).success) {
      useAuthorizeUser().emailAndPassword(values);
    }
  };

  return (
    <>
      <ModalParent>
        <ul className='fdAccountModal__modals__form__fieldset__ul' ref={signInRefReceiver} data-visible='true'>
          <li className='fdAccountModal__modals__form__fieldset__ul__li'>
            <label id='emailAddress' htmlFor='fdUserAccountSignInEmailAddress'>
              Email address
            </label>
            <input
              form='fdRegistery'
              id='fdUserAccountSignInEmailAddress'
              name='emailAddress'
              type='email'
              inputMode='email'
              minLength={3}
              maxLength={76}
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={schema.safeParse(values.emailAddress).success}
              autoCapitalize='off'
              placeholder='johndoe@gmail.com'
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
            {submitted && parse.error?.errors.some((err) => err.path.includes('emailAddress')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('emailAddress'))[0].message}</span>
            )}
          </li>
          <button className='fdAccountModal__modals__form__fieldset__ul__btn' aria-label='Forgot email'>
            I forgot my email.
          </button>

          <li className='fdAccountModal__modals__form__fieldset__ul__li'>
            <label id='password' htmlFor='fdUserAccountSignInPassword'>
              Password
            </label>
            <input
              form='fdRegistery'
              id='fdUserAccountSignInPassword'
              name='password'
              type='password'
              inputMode='text'
              minLength={8}
              maxLength={32}
              size={12}
              required={true}
              aria-required='true'
              aria-invalid={schema.safeParse(values.password).success}
              autoCapitalize='off'
              placeholder='••••••••'
              onPointerUp={() => focus()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => valueSetter(e)}
            />
            {submitted && parse.error?.errors.some((err) => err.path.includes('password')) && (
              <span className='error-message'>{parse.error.errors.filter((err) => err.path.includes('password'))[0].message}</span>
            )}
          </li>
          <button
            className='fdAccountModal__modals__form__fieldset__ul__btn'
            aria-label='Forgot password'
            onPointerUp={(e) => {
              e.preventDefault();
              if (schema.safeParse(values).success) useResetUserPassword(values.emailAddress);
            }}>
            I forgot my password.
          </button>
        </ul>
      </ModalParent>

      <div className='fdAccountModal__modals__btns'>
        <button aria-label='Sign in with your credentials' onPointerUp={handleSubmit}>
          Sign in
        </button>
        <button aria-label='Create a new account' onPointerUp={() => setModal('registry')}>
          Create a new account
        </button>
        <LoginWithGroup />
      </div>
    </>
  );
});

export default FDAccountSignIn;
