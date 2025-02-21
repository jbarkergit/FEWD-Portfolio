import { forwardRef, useState } from 'react';
import type { ChangeEvent, FC, JSX, ReactNode } from 'react';
import { z } from 'zod';
import { authorizeUser } from '~/base/auth/hooks/authorizeUser';
import { resetUserPassword } from '~/base/auth/hooks/resetUserPassword';
import { zodSchema } from '~/base/schema/zodSchema';

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
        <LoginWithGroup />
      </div>
    </>
  );
});

export default FDAccountSignIn;
