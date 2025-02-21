import { forwardRef, useState } from 'react';
import type { ChangeEvent, FC, ReactNode } from 'react';
import { z } from 'zod';
import { authorizeUser } from '~/base/auth/hooks/authorizeUser';
import { resetUserPassword } from '~/base/auth/hooks/resetUserPassword';
import { zodSchema } from '~/base/schema/zodSchema';

type Type_PropDrill = {
  ModalParent: FC<{ children: ReactNode }>;
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const schema = z.object({ emailAddress: zodSchema.contact.shape.emailAddress, password: zodSchema.account.shape.password });

const FDAccountSignIn = forwardRef<HTMLUListElement, Type_PropDrill>(({ ModalParent, setModal }, signInRefReceiver) => {
  const [values, setValues] = useState({
    emailAddress: '',
    password: '',
  });

  const valueSetter = (e: ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name as keyof typeof values;

    setValues((prevValues) => {
      return { ...prevValues, [key]: e.target.value };
    });
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
              // name, @, domain
              minLength={3}
              // RFC 2045
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
              // RFC 5310, NIST Special Publication 800-63B
              minLength={8}
              // RFC XOS
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
          </li>
          <button
            className='fdAccountModal__modals__form__fieldset__ul__btn'
            aria-label='Forgot password'
            onPointerUp={(e) => {
              e.preventDefault();
              if (schema.safeParse(values).success) resetUserPassword(values.emailAddress);
            }}>
            I forgot my password.
          </button>
        </ul>
      </ModalParent>

      <div className='fdAccountModal__modals__btns'>
        <button
          aria-label='Sign in with your credentials'
          onPointerUp={(e) => {
            e.preventDefault();
            authorizeUser().emailAndPassword(values);
          }}>
          Sign in
        </button>
        <button aria-label='Create a new account' onPointerUp={() => setModal('registry')}>
          Create a new account
        </button>
        <div className='fdAccountModal__modals__btns__grouped'>
          <button
            aria-label='Sign in with Google'
            onPointerUp={(e) => {
              e.preventDefault();
              authorizeUser().google();
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 262'>
              <path
                fill='#4285F4'
                d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path>
              <path
                fill='#34A853'
                d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path>
              <path
                fill='#FBBC05'
                d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'></path>
              <path
                fill='#EB4335'
                d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path>
            </svg>
          </button>
          <button
            aria-label='Sign in with Github'
            onPointerUp={(e) => {
              e.preventDefault();
              authorizeUser().github();
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'>
                <path
                  stroke-dasharray='32'
                  stroke-dashoffset='32'
                  d='M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3'>
                  <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.7s' values='32;0'></animate>
                </path>
                <path stroke-dasharray='10' stroke-dashoffset='10' d='M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31'>
                  <animate fill='freeze' attributeName='stroke-dashoffset' begin='0.8s' dur='0.2s' values='10;0'></animate>
                </path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
});

export default FDAccountSignIn;
